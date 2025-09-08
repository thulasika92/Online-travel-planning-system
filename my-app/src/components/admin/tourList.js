import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { clearError } from "../../slices/toursSlice";
import Loader from "../layouts/loader"
import { MDBDataTable } from 'mdbreact'
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import { Button } from "react-bootstrap";
import { deleteTour, getAdminTours } from "../../actions/tourAction";
import { clearTourDeleted } from "../../slices/tourSlice";

export default function TourList() {
    const { tours = [], loading = true, error} = useSelector(state => state.toursState);
    const { error: tourError, isTourDeleted} = useSelector(state => state.tourState);

    const dispatch = useDispatch();


    const setTours = () => {
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
                    label: 'Category',
                    field: 'category',
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

        tours.forEach(tour => {
            data.rows.push({
                id: tour._id,
                name: tour.name,
                price: `Rs.${tour.price}`,
                category: tour.category,
                actions: (
                    <Fragment>
                        <Link to={`/admin/tour/${tour._id}`} className="btn btn-primary"><i className="fa fa-pencil"></i></Link>
                        <Button onClick={e => deleteHandler(e, tour._id)} className="btn btn-danger py-1 px-2 ml-2"><i className="fa fa-trash"></i></Button>
                    </Fragment>
                )
            })
        })

        return data;
    }

    const deleteHandler = (e, id) => {
        e.target.disabled = true;
        dispatch(deleteTour(id))
    }

    useEffect(() => {
        if (error || tourError) {
            toast(error || tourError, {
                position: "bottom-center",
                type: 'error',
                onOpen: () => { dispatch(clearError()) }
            });
            return
        }
        if (isTourDeleted) {
                    toast('Tour deleted Successfully', {
                        type: 'success',
                        position: "top-center",
                        onOpen: () => { dispatch(clearTourDeleted()) }
                    })
                    return;
                }
        dispatch(getAdminTours)
    }, [dispatch, error, isTourDeleted])

    return (
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>
            <div className="col-12 col-md-10">
                <h1 className="my-4">Tour List</h1>
                <Fragment>
                    {loading ? <Loader /> :
                        <MDBDataTable
                            data={setTours()}
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







