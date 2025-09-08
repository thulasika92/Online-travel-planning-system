import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { deleteOrder, adminBookings as adminOrderActions } from "../../actions/orderAction"
import { clearError, clearOrderDeleted } from "../../slices/orderSlice";
import Loader from "../layouts/loader"
import { MDBDataTable } from 'mdbreact'
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import { Button } from "react-bootstrap";

export default function TourOrderList() {
    const { adminOrder = [], loading = true, error, isOrderDeleted } = useSelector(state => state.orderState);

    const dispatch = useDispatch();


    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Number Of Tours',
                    field: 'noOfTours',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'PaymentStatus',
                    field: 'paymentStatus',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
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

        adminOrder.forEach(order => {
            let statusColor;
            let paymentStatusColor;

            if (order.paymentStatus.includes('Pending')) {
                paymentStatusColor = 'orange';
            } else if (order.paymentStatus.includes('Verified')) {
                paymentStatusColor = 'green';
            } else if (order.paymentStatus.includes('Denied')) {
                paymentStatusColor = 'red';
            } else {
                paymentStatusColor = 'black';
            }

            if (order.status.includes('Pending')) {
                statusColor = 'orange';
            } else if (order.status.includes('Confirmed')) {
                statusColor = 'green';
            } else if (order.status.includes('Cancelled')) {
                statusColor = 'red';
            } else {
                statusColor = 'black';
            }

            data.rows.push({
                id: order._id,
                noOfTours: order.tours.length,
                amount: `$${order.totalAmount}`,
                paymentStatus: <p style={{ color: paymentStatusColor }}>{order.paymentStatus}</p>,
                status: <p style={{ color: statusColor }}>{order.status}</p>,
                actions: (
                    <Fragment>
                        <Link to={`/admin/order/${order._id}`} className="btn btn-primary"><i className="fa fa-pencil"></i></Link>
                        <Button onClick={e => deleteHandler(e, order._id)} className="btn btn-danger py-1 px-2 ml-2"><i className="fa fa-trash"></i></Button>
                    </Fragment>
                )
            })
        })

        return data;
    }

    const deleteHandler = (e, id) => {
        e.target.disabled = true;
        dispatch(deleteOrder(id))
    }

    useEffect(() => {
        if (error) {
            toast(error, {
                position: "bottom-center",
                type: 'error',
                onOpen: () => { dispatch(clearError()) }
            });
            return
        }
        if (isOrderDeleted) {
            toast('Order deleted Successfully', {
                type: 'success',
                position: "top-center",
                onOpen: () => { dispatch(clearOrderDeleted()) }
            })
            return;
        }
        dispatch(adminOrderActions)
    }, [dispatch, error, isOrderDeleted])

    return (
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>
            <div className="col-12 col-md-10">
                <h1 className="my-4">Tour Bookings List</h1>
                <Fragment>
                    {loading ? <Loader /> :
                        <MDBDataTable
                            data={setOrders()}
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







