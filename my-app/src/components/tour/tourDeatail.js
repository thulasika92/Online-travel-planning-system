import { Fragment, useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import { createReview, getTour } from "../../actions/tourAction";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../layouts/loader";
import { Button, Carousel, Modal } from 'react-bootstrap';
import { clearError, clearTour, clearReviewSubmitted } from "../../slices/tourSlice";
import { toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addCartItems } from "../../actions/cartAction";
import TourReview from "../tour/tourReview";





export default function TourDetail() {
    const { tour = {}, loading, isReviewSubmitted, error } = useSelector((state) => state.tourState);
    const { user } = useSelector((state) => state.authState);
    const dispatch = useDispatch();
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [date, setDate] = useState(null);


    const increaseQty = () => {
        const count = document.querySelector('.count')
        if (tour?.availableSpots == 0 || count.valueAsNumber >= tour?.availableSpots) {
            return;
        }
        const qty = count.valueAsNumber + 1;
        setQuantity(qty);
    }
    const decreaseQty = () => {
        const count = document.querySelector('.count')
        if (count.valueAsNumber == 1) {
            return;
        }
        const qty = count.valueAsNumber - 1;
        setQuantity(qty);
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState("");

    const reviewHandler = () => {
        const formData = new FormData();
        formData.append('rating', rating);
        formData.append('comment', comment);
        formData.append('tourId', id);

        dispatch(createReview(formData));

    }

    useEffect(() => {
        if (isReviewSubmitted) {
            handleClose();
            toast('Review submitted successfully', {
                type: 'success',
                position: "top-center",
                onOpen: () => { dispatch(clearReviewSubmitted()) }
            })
        }

        if (error) {
            toast(error, {
                position: "bottom-center",
                type: 'error',
                onOpen: () => { dispatch(clearError()) }
            });
        }

        if (!tour._id || isReviewSubmitted) {
            dispatch(getTour(id))
        }

        return () => {
            dispatch(clearTour())
        }

    }, [dispatch, id, isReviewSubmitted, error]);


    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title={tour.name || "Tour"} />
                    <div className="row f-flex justify-content-around">
                        <div className="col-12 col-lg-5 img-fluid" id="product_image">
                            {tour.images && tour.images.length > 0 ?
                                <Carousel pause="hover">
                                    {tour.images && tour.images.map(image => <Carousel.Item key={image._id}>
                                        <img className="d-block w-100" src={image.image} alt={tour.name} height="500" width="500" style={{ borderRadius: '5px' }} />
                                    </Carousel.Item>)}
                                </Carousel>
                                :
                                <img className="d-block w-100" src={"/images/noImage.jpeg"} alt={"no image"} height="500" width="500" style={{ borderRadius: '5px' }} />
                            }
                        </div>

                        <div className="col-12 col-lg-5 mt-5">
                            <h3>{tour?.name}</h3>
                            <p id="product_id">Tour # {tour?._id}</p>

                            <hr />

                            <div className="rating-outer">
                                <div className="rating-inner" style={{ width: `${tour.ratings / 5 * 100}%` }}></div>
                            </div>
                            <span id="no_of_reviews">({tour?.numOfReviews} Reviews)</span>

                            <hr />

                            <h5>Package Amount:</h5>
                            <p id="product_price">Rs.{tour?.price}</p>
                            <hr />

                            <p>Status: <span id="stock_status" className={tour?.availableSpots > 0 ? 'greenColor' : 'redColor'}>{tour?.availableSpots > 0 ? 'Available' : 'All spots booked'}</span></p>

                            <hr />

                            <h5>Select Tour Date:</h5>
                            <DatePicker
                                selected={date}
                                onChange={(date) => setDate(date)}
                                minDate={new Date()}
                                dateFormat="yyyy/MM/dd"
                                placeholderText="Choose a date"
                                className="form-control"
                            />

                            <hr />

                            <h5>Number of Persons:</h5>
                            <div className="stockCounter d-inline">
                                <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

                                <input type="number" className="form-control count d-inline" value={quantity} readOnly />

                                <span className="btn btn-success plus" onClick={increaseQty}>+</span>
                            </div>

                            <button type="button" id="cart_btn" disabled={tour?.availableSpots == 0 ? true : false} onClick={() => {
                                dispatch(addCartItems(tour._id, quantity, date))
                            }} className="btn btn-primary d-inline ml-4">Add your tour</button>


                            <hr />

                            <h4 className="mt-2">Description:</h4>
                            <p>{tour?.description}</p>
                            <hr />

                            {user ?
                                <button onClick={handleShow} id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">
                                    Submit Your Review
                                </button>
                                : <div className="alert alert-danger mt-5"> Login to Post Review </div>}

                            <div className="row mt-2 mb-5">
                                <div className="rating w-50">

                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header >
                                            <Modal.Title>Submit Review</Modal.Title>
                                            <button
                                                type="button"
                                                onClick={handleClose}
                                                aria-label="Close"
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    fontSize: '1.5rem',
                                                    color: 'black',
                                                    position: 'absolute',
                                                    top: '10px',
                                                    right: '10px',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                &times;
                                            </button>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <label htmlFor="review" className="mt-2">Ratings:</label>
                                            <ul className="stars" >
                                                {
                                                    [1, 2, 3, 4, 5].map(star => (
                                                        <li className={`star ${star <= rating ? 'orange' : ''}`} onMouseOver={(e) => e.target.classList.add('yellow')} value={star} onClick={() => setRating(star)} onMouseOut={(e) => e.target.classList.remove('yellow')}><i className="fa fa-star"></i></li>

                                                    ))
                                                }

                                            </ul>
                                            <label htmlFor="review" className="mt-2">Comments:</label>
                                            <textarea onChange={(e) => setComment(e.target.value)} name="review" id="review" className="form-control mt-3">

                                            </textarea>
                                            <button disabled={loading} onClick={reviewHandler} aria-label="Close" className="btm my-3 float-right review-btn px-4 text-white">Submit</button>
                                        </Modal.Body>
                                    </Modal>

                                </div>

                            </div>

                        </div>

                    </div>
                    {tour?.reviews && tour?.reviews.length > 0 ? <TourReview reviews={tour?.reviews} /> : null}
                </Fragment>
            }
        </Fragment>

    )
}