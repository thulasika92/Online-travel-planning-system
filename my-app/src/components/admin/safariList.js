import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import Loader from "../layouts/loader"
import { MDBDataTable } from 'mdbreact'
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import { Button } from "react-bootstrap";
import { deleteSafari, getAdminSafaris } from "../../actions/safariAction";
import { clearError, clearSafariDeleted } from "../../slices/safariSlice";

export default function SafariList() {
    const { safaris = [], loading = true, error} = useSelector(state => state.safarisState);
    const { error: safariError, isSafariDeleted} = useSelector(state => state.safariState);

    const dispatch = useDispatch();


    const setSafaris = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'VehicleType',
                    field: 'vehicleType',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }

            ],
            rows: []
        }

        safaris.forEach(safari => {
            data.rows.push({
                id: safari._id,
                name: safari.name,
                price: `Rs.${safari.price}`,
                vehicleType: safari.vehicleType,
                actions: (
                    <Fragment>
                        <Link to={`/admin/safari/${safari._id}`} className="btn btn-primary"><i className="fa fa-pencil"></i></Link>
                        <Button onClick={e => deleteHandler(e, safari._id)} className="btn btn-danger py-1 px-2 ml-2"><i className="fa fa-trash"></i></Button>
                    </Fragment>
                )
            })
        })

        return data;
    }

    const deleteHandler = (e, id) => {
        e.target.disabled = true;
        dispatch(deleteSafari(id))
    }

    useEffect(() => {
        if (error || safariError) {
            toast(error || safariError, {
                position: "bottom-center",
                type: 'error',
                onOpen: () => { dispatch(clearError()) }
            });
            return
        }
        if (isSafariDeleted) {
                    toast('Safari deleted Successfully', {
                        type: 'success',
                        position: "top-center",
                        onOpen: () => { dispatch(clearSafariDeleted()) }
                    })
                    return;
                }
        dispatch(getAdminSafaris)
    }, [dispatch, error, isSafariDeleted])

    return (
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>
            <div className="col-12 col-md-10">
                <h1 className="my-4">Safari List</h1>
                <Fragment>
                    {loading ? <Loader /> :
                        <MDBDataTable
                            data={setSafaris()}
                            bordered
                            striped
                            hover
                            className="px-3"
                        />
                    }
                </Fragment>
            </div>
        </div>
    )
}







