import { Fragment, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { orderDetail as orderDetailAction } from '../../actions/safariOrderAction';
import Loader from '../layouts/loader';
import html2pdf from 'html2pdf.js';



export default function SafariOrderDetail() {

    const { orderDetail, loading } = useSelector(state => state.safariOrderState);
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(orderDetailAction(id))
    }, [dispatch, id])

    const { payment, orderStatus, color, statusColor } = useMemo(() => {
        let payment = 'Pending';
        let orderStatus = 'Pending';
        let color = 'orange';
        let statusColor = 'orange';

        if (orderDetail?.safariBooking?.paymentStatus === 'Denied') {
            payment = 'Denied';
            color = 'redColor';
        } else if (orderDetail?.safariBooking?.paymentStatus === 'Verified') {
            payment = 'Paid';
            color = 'greenColor';
        }

        if (orderDetail?.safariBooking?.status === 'Cancelled') {
            orderStatus = 'Cancelled';
            statusColor = 'redColor';
        } else if (orderDetail?.safariBooking?.status === 'Confirmed') {
            orderStatus = 'Confirmed';
            statusColor = 'greenColor';
        }

        return { payment, orderStatus, color, statusColor };
    }, [orderDetail]);

    // PDF hook and reference
    const pdfRef = useRef(null);

    const isPaid = orderDetail?.safariBooking?.paymentStatus === 'verified' ? true : false;


    // Function to format the date
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }); // Outputs: 30-Mar-2025
    };

    // Ensure the PDF button waits for content
    const handleDownloadPDF = () => {
        if (pdfRef.current) {
            html2pdf()
                .from(pdfRef.current)
                .set({
                    margin: 10,
                    filename: `order-${id}.pdf`,
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 2 },
                    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
                })
                .save();
        } else {
            console.error('Unable to get the target element.');
        }
    };




    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    {/* <div  style={{ padding: '20px', backgroundColor: 'white' }}> */}
                    <div ref={pdfRef} className="row d-flex justify-content-between" >
                        <div className="col-12 col-lg-8 mt-5 order-details">

                            <h1 className="my-5">Order # {orderDetail?.safariBooking?._id}</h1>

                            <h4 className="mb-4">safariBooking Info</h4>
                            <p><b>Name:</b> {orderDetail?.safariBooking?.user?.name}</p>
                            <p><b>Phone:</b> {orderDetail?.safariBooking?.contactDetails?.phoneNumber}</p>
                            <p><b>Amount:</b> <span style={{fontStyle:"italic", fontWeight:"bold", color:"red"}}>Rs.{orderDetail?.safariBooking?.totalAmount}</span></p>

                            <hr />

                            <h4 className="my-4">Payment</h4>
                            <p className={color}><b>{payment}</b></p>


                            <h4 className="my-4">Order Status:</h4>
                            <p className={statusColor}><b>{orderStatus}</b></p>


                            <h4 className="my-4">Tour details:</h4>

                            <hr />
                            {/* <div className="cart-item my-1">
                                {orderDetail.booking.tours && orderDetail.booking.tours.map(item => (
                                    <div className="row my-5">
                                        <div className="col-4 col-lg-2">
                                            <img src={item.tourId.images[0].image} alt={item.tourId.name} height="45" width="65" />
                                        </div>

                                        <div className="col-5 col-lg-5">
                                            <Link to={`/tour/${item.tourId._id}`}>{item.tourId.name}</Link>
                                        </div>

                                        <div className="col-5 col-lg-5">
                                            <h6 style={{ color: '#006400', fontStyle: 'italic' }} className="fw-bold mt-2">
                                                🗓️ {formatDate(item.tourDate)}
                                            </h6>
                                        </div>

                                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                            <p>${item.tourId.price}</p>
                                        </div>

                                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                            <p className="greenColor">{item.spotsBooked} Spots Reserved(s)</p>
                                        </div>
                                    </div>
                                ))}
                            </div> */}
                            <div className="cart-item" style={{ fontFamily: 'Arial, sans-serif' }}>
                                {orderDetail.safariBooking?.safaris?.map((item, index) => (
                                    <div
                                        key={index}
                                        className="row gx-2 align-items-center mb-3 p-2 border rounded"
                                        style={{
                                            backgroundColor: '#ffffff',
                                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                            pageBreakInside: 'avoid' // Prevent splitting across pages
                                        }}
                                    >
                                        {/* Tour Image */}
                                        <div className="col-2 d-flex justify-content-center pe-0">
                                            <img
                                                src={item?.safariId?.images[0]?.image}
                                                alt={item?.safariId?.name}
                                                className="img-fluid rounded"
                                                style={{
                                                    height: '50px',
                                                    width: '70px',
                                                    objectFit: 'cover',
                                                    border: '1px solid #dee2e6'
                                                }}
                                            />
                                        </div>

                                        {/* Tour Name */}
                                        <div className="col-3 pe-1">
                                            <Link
                                                to={`/tour/${item?.safariId?._id}`}
                                                className="text-decoration-none fw-semibold text-dark"
                                                style={{
                                                    fontSize: '0.85rem',
                                                    lineHeight: '1.2',
                                                    ':hover': { color: '#006400' }
                                                }}
                                            >
                                                {item?.safariId?.name}
                                            </Link>
                                        </div>

                                        {/* Tour Date */}
                                        <div className="col-2 pe-2">
                                            <div className="d-flex align-items-center h-100">
                                                <span className="me-1" style={{ fontSize: '0.8rem' }}>🗓️</span>
                                                <span
                                                    className="fst-italic "
                                                    style={{
                                                        fontSize: '0.8rem',
                                                        // whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis'
                                                    }}
                                                >
                                                    {formatDate(item?.safariDate)}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Price */}
                                        <div className="col-2 pe-1">
                                            <div className="d-flex align-items-center h-100">
                                                <span
                                                    className="fw-bold"
                                                    style={{ fontSize: '0.8rem' }}
                                                >
                                                   <b> Rs.{item.safariId?.price.toLocaleString()}</b>
                                                </span>
                                            </div>
                                        </div>

                                        {/* Spots Booked */}
                                        <div className="col-3">
                                            <div className="d-flex align-items-center justify-content-end h-100">
                                                <span
                                                    className="badge bg-success"
                                                    style={{
                                                        fontSize: '0.75rem',
                                                        padding: '0.25rem 0.5rem'
                                                    }}
                                                >
                                                    {item.safariTime} Hour{item.safariTime !== 1 ? 's' : ''}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <style jsx>{`
                                            @media print {
                                                .cart-item {
                                                width: 100% !important;
                                                padding: 0 !important;
                                                }
                                                .border {
                                                border-color: #ddd !important;
                                                }
                                                .badge {
                                                background-color: #28a745 !important;
                                                color: white !important;
                                                }
                                                a {
                                                color: #000 !important;
                                                text-decoration: none !important;
                                                }
                                            }
                                        `}</style>
                            <hr />
                        </div>
                    </div>
                    {/* </div> */}
                    <button className="btn btn-primary" onClick={handleDownloadPDF}>
                        Download Invoice
                    </button>
                </Fragment>
            }
        </Fragment>


    )
}