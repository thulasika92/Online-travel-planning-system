import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import Loader from "../layouts/loader"
import { MDBDataTable } from 'mdbreact'
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import { Button } from "react-bootstrap";
import { deleteReviews, getReviews } from "../../actions/tourAction";
import { clearError, clearReviewDeleted } from "../../slices/tourSlice";

export default function TourReviewList() {
    const { reviews = [], loading = true, error, isReviewDeleted } = useSelector(state => state.tourState);

    const [tourId, setTourId] = useState("");

    const dispatch = useDispatch();


    const setReviews = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Rating',
                    field: 'rating',
                    sort: 'asc'
                },
                {
                    label: 'User',
                    field: 'user',
                    sort: 'asc'
                },
                {
                    label: 'Comment',
                    field: 'comment',
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

        reviews.forEach(review => {
            data.rows.push({
                id: review._id,
                rating: review.rating,
                user: review.user?.name || <p style={{color:'red'}}>User name not available</p>,
                comment: review.comment,
                actions: (
                    <Fragment>
                        <Button onClick={e => deleteHandler(e, review._id)} className="btn btn-danger py-1 px-2 ml-2"><i className="fa fa-trash"></i></Button>
                    </Fragment>
                )
            })
        })

        return data;
    }

    const deleteHandler = (e, id) => {
        e.target.disabled = true;
        dispatch(deleteReviews(tourId, id))
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(getReviews(tourId))
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
        if (isReviewDeleted) {
            toast('Review deleted Successfully', {
                type: 'success',
                position: "top-center",
                onOpen: () => { dispatch(clearReviewDeleted()) }
            })
            dispatch(getReviews(tourId))
            return;
        }
    }, [dispatch, error, isReviewDeleted])

    return (
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>
            <div className="col-12 col-md-10">
                <h1 className="my-4">Tour Review List</h1>
                <div className="row justify-content-center mt-5">
                    <div className="col-5">
                        <form onSubmit={submitHandler}>
                            <div className="form-group">
                                <label><b>Tour Id</b></label>
                                <input
                                    type="text"
                                    onChange={e => setTourId(e.target.value)}
                                    value={tourId}
                                    className="form-control"
                                />
                            </div>
                            <button type="submit" disabled={loading} className="btn btn-primary btn-block py-2">Search</button>
                        </form>
                    </div>
                </div>
                <Fragment>
                    {loading ? <Loader /> :
                        <MDBDataTable
                            data={setReviews()}
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







