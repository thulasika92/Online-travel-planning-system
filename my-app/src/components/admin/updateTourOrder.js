import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { updateOrders, orderDetail as orderDetailAction } from '../../actions/orderAction';
import { toast } from "react-toastify";
import { clearOrderUpdated, clearError } from "../../slices/orderSlice";
import { Link } from "react-router-dom";


export default function UpdateTourOrder() {

    const { loading, isOrderUpdated, error, orderDetail } = useSelector(state => state.orderState);
    const [orderStatus, setOrderStatus] = useState("Pending");
    const [paymentStatus, setPaymentStatus] = useState("Pending");
    const { id: orderId } = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        const orderData = {};

        orderData.status = orderStatus;
        orderData.paymentStatus = paymentStatus;

        dispatch(updateOrders(orderId, orderData))
    }

    // Function to format the date
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }); // Outputs: 30-Mar-2025
    };


    useEffect(() => {
        if (isOrderUpdated) {
            toast('Order Updated Successfully', {
                type: 'success',
                position: "top-center",
                onOpen: () => { dispatch(clearOrderUpdated()) }
            })
            navigate('/admin/orders')
            return;
        }
        if (error) {
            toast(error, {
                position: "bottom-center",
                type: 'error',
                onOpen: () => { dispatch(clearError()) }
            });
            return;
        }

        dispatch(orderDetailAction(orderId))

    }, [isOrderUpdated, error, dispatch])

    useEffect(() => {
        if (orderDetail?.booking?._id) {
            setOrderStatus(orderDetail?.booking?.status);
            setPaymentStatus(orderDetail?.booking?.paymentStatus);
        }

    }, [orderDetail])


    return (
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>
            <div className="col-12 col-md-10">
                <Fragment>
                    <div className="row d-flex justify-content-around">
                        <div className="col-12 col-lg-8 mt-5 order-details">

                            <h1 className="my-5">Order # {orderDetail?.booking?._id}</h1>

                            <h4 className="mb-4">Tour Booking Info</h4>
                            <p><b>Name:</b> {orderDetail?.booking?.user?.name}</p>
                            <p><b>Phone:</b> {orderDetail?.booking?.contactDetails?.phoneNumber}</p>
                            <p><b>Amount:</b> <span style={{ fontStyle: "italic", fontWeight: "bold", color: "Blue" }}>Rs.{orderDetail?.booking?.totalAmount}</span></p>

                            <hr />

                            <h4 className="my-4">Payment</h4>

                            <div className="mb-3">
                                <div className="mt-2">
                                    <p><b>Payment Status:</b></p>
                                    <p className={paymentStatus && paymentStatus.includes('Verified') ? 'greenColor' : paymentStatus.includes('Denied') ? 'redColor' : 'orange'} ><b>{paymentStatus}</b></p>
                                </div>
                                <p><b>Payment Slip:</b></p>
                                <div style={{
                                    width: "100%",
                                    maxWidth: "500px",
                                    aspectRatio: "10 / 7",
                                    border: "1px solid #ccc",
                                    borderRadius: "8px",
                                    overflow: "hidden",
                                    backgroundColor: "#f9f9f9",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <img
                                        src={`${orderDetail?.booking?.paymentSlip}`}
                                        alt="Payment Slip"
                                        style={{
                                            maxWidth: "100%",
                                            height: "auto",
                                            border: "1px solid #ccc",
                                            borderRadius: "8px"
                                        }}
                                    />

                                </div>
                            </div>

                            <hr />

                            <h4 className="my-4">Order Status:</h4>
                            <p className={orderStatus && orderStatus.includes('Confirmed') ? 'greenColor' : orderStatus.includes('Cancelled') ? 'redColor' : 'orange'}><b>{orderStatus}</b></p>

                            <hr />
                            <h4 className="my-4">Booked Tours:</h4>

                            <div className="cart-item my-1">
                                {orderDetail.booking?.tours && orderDetail.booking?.tours?.map(item => (
                                    <div className="row my-5">
                                        <div className="col-4 col-lg-2">
                                            <img src={item?.tourId?.images[0]?.image || "/images/noImage.jpeg"} alt={item?.tourId?.name} height="45" width="65" />
                                        </div>

                                        <div className="col-4 col-lg-3">
                                            <Link to={`/tour/${item?.tourId?._id}`}>{item?.tourId?.name}</Link>
                                        </div>

                                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                <span className="me-1" style={{ fontSize: '0.8rem' }}>🗓️</span>
                                                <span
                                                    className="fst-italic "
                                                    style={{
                                                        fontSize: '0.7rem',
                                                        // whiteSpace: 'nowrap',
                                                        fontWeight: "bold",
                                                        color:"blue",
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis'
                                                    }}
                                                >
                                                    {formatDate(item?.tourDate)}
                                                </span>
                                        </div>


                                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                            <p>Rs.{item?.tourId?.price}</p>
                                        </div>

                                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                            <p>{item?.spotsBooked} Spot(s)</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <hr />
                        </div>

                        <div className="col-12 col-lg-3 mt-5">
                            <h4 className="my-4">Payment Status</h4>
                            <div className="form-group">
                                <select className="form-control"
                                    onChange={e => setPaymentStatus(e.target.value)}
                                    value={paymentStatus}
                                    name="status"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Denied">Denied</option>
                                    <option value="Verified">Verified</option>
                                </select>
                            </div>
                            <h4 className="my-4">Order Status</h4>
                            <div className="form-group">
                                <select className="form-control"
                                    onChange={e => setOrderStatus(e.target.value)}
                                    value={orderStatus}
                                    name="status"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Cancelled">Cancelled</option>
                                    <option value="Confirmed">Confirmed</option>
                                </select>
                            </div>
                            <button disabled={loading} onClick={submitHandler} className="btn btn-primary btn-block">Update Status</button>
                        </div>
                    </div>
                </Fragment>
            </div>
        </div>

    )
}