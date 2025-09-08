import { useEffect } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import { getAdminTours } from "../../actions/tourAction";
import { getAdminSafaris } from "../../actions/safariAction";
import { getUsers } from '../../actions/userActions';
import { adminBookings as adminOrderAction } from '../../actions/orderAction';
import { adminBookings as adminSafariOrderAction } from '../../actions/safariOrderAction';
import { Link } from "react-router-dom";


export default function Dashboard() {

    const { tours = [] } = useSelector(state => state.toursState);
    const { safaris = [] } = useSelector(state => state.safarisState);
    const { adminOrder = [] } = useSelector(state => state.orderState);
    const { adminSafariOrder = [] } = useSelector(state => state.safariOrderState);
    const { users = [] } = useSelector(state => state.userState);
    const dispatch = useDispatch();
    // let outOFStock = 0;

    // if (products.length > 0){
    //     products.forEach(product => {
    //         if(product.stock === 0){
    //             outOFStock = outOFStock + 1
    //         }
    //     })
    // }

    let totalAmount = 0;
    if (adminOrder.length > 0) {
        adminOrder.forEach(order => {
            totalAmount += Number(order.totalAmount)
        })
    }

    let totalSafariAmount = 0;
    if (adminSafariOrder.length > 0) {
        adminSafariOrder.forEach(order => {
            totalSafariAmount += Number(order.totalAmount)
        })
    }

    let Amount = totalSafariAmount + totalAmount;

    useEffect(() => {
        dispatch(getAdminTours);
        dispatch(getAdminSafaris);
        dispatch(getUsers);
        dispatch(adminOrderAction);
        dispatch(adminSafariOrderAction);
    }, [])

    return (
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <h1 className="my-4">Dashboard</h1>
                    <div className="row pr-4">
                        <div className="col-xl-12 col-sm-12 mb-3">
                            <div className="card text-white bg-primary o-hidden h-100">
                                <div className="card-body">
                                    <div className="text-center card-font-size">Total Amount<br /> <b>Rs. {Amount.toFixed(2)}</b>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row pr-4">
                        <div className="col-xl-3 col-sm-6 mb-3">
                            <div className="card text-white bg-success o-hidden h-100">
                                <div className="card-body">
                                    <div className="text-center card-font-size">Tours<br /> <b>{tours.length}</b></div>
                                </div>
                                <Link className="card-footer text-white clearfix small z-1" to="/admin/tours">
                                    <span className="float-left">View Details</span>
                                    <span className="float-right">
                                        <i className="fa fa-angle-right"></i>
                                    </span>
                                </Link>
                            </div>
                        </div>

                        <div className="col-xl-3 col-sm-6 mb-3">
                            <div className="card text-white bg-dark o-hidden h-100">
                                <div className="card-body">
                                    <div className="text-center card-font-size">Safaris<br /> <b>{safaris.length}</b></div>
                                </div>
                                <Link className="card-footer text-white clearfix small z-1" to="/admin/safaris">
                                    <span className="float-left">View Details</span>
                                    <span className="float-right">
                                        <i className="fa fa-angle-right"></i>
                                    </span>
                                </Link>
                            </div>
                        </div>


                        <div className="col-xl-3 col-sm-6 mb-3">
                            <div className="card text-white bg-secondary o-hidden h-100">
                                <div className="card-body">
                                    <div className="text-center card-font-size">Tour Bookings<br /> <b>{adminOrder.length}</b></div>
                                </div>
                                <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                                    <span className="float-left">View Details</span>
                                    <span className="float-right">
                                        <i className="fa fa-angle-right"></i>
                                    </span>
                                </Link>
                            </div>
                        </div>


                        <div className="col-xl-3 col-sm-6 mb-3">
                            <div className="card text-white bg-danger o-hidden h-100">
                                <div className="card-body">
                                    <div className="text-center card-font-size">Safari Bookings<br /> <b>{adminSafariOrder.length}</b></div>
                                </div>
                                <Link className="card-footer text-white clearfix small z-1" to="/admin/safariOrders">
                                    <span className="float-left">View Details</span>
                                    <span className="float-right">
                                        <i className="fa fa-angle-right"></i>
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="row pr-4">
                        <div className="col-xl-12 col-sm-12 mb-3">
                            <div className="card text-white bg-warning o-hidden h-100">
                                <div className="card-body">
                                    <div className="text-center card-font-size">Users<br /> <b>{users.length}</b>
                                    </div>
                                </div>
                                <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                                    <span className="float-left">View Details</span>
                                    <span className="float-right">
                                        <i className="fa fa-angle-right"></i>
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}