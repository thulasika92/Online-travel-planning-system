import { Fragment, useEffect, useState } from "react";
import Tour from "./tour/tour";
import { useDispatch, useSelector } from 'react-redux';
import { getTours } from "../actions/tourAction";
import { toast } from 'react-toastify';
import MetaData from "./layouts/MetaData";
import Pagination from 'react-js-pagination';
import Loader from './layouts/loader';
import { Link } from "react-router-dom";




export default function Home() {

    const dispatch = useDispatch();
    const { tours, toursCount, resPerPage, loading, error } = useSelector((state) => state.toursState)
    const [currentPage, setCurrentPage] = useState(1);

    const setCurrentPageNo = (pageNo) => {
        setCurrentPage(pageNo)
    }

    useEffect(() => {
        dispatch(getTours(null, null, null, null, currentPage))
    }, [dispatch, currentPage]);

    useEffect(() => {
        if (error) {
            return toast.error(error, {
                position: "bottom-center"
            });
        }
    }, [error])


    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title={'Trending Tours'} />
                    <h1 id="products_heading">Trending Tours</h1>

                    <section id="products" className="container mt-5">
                        <div className="row">
                            {tours && tours.map(tour => (
                                <Tour col={4} key={tour._id} tour={tour} />
                            ))}
                        </div>
                    </section>
                    {toursCount > 0 && toursCount > resPerPage ?
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                onChange={setCurrentPageNo}
                                totalItemsCount={toursCount}
                                itemsCountPerPage={resPerPage}
                                nextPageText={'next'}
                                firstPageText={'first'}
                                lastPageText={'last'}
                                itemClass={'page-item'}
                                linkClass={'page-link'}
                            />
                        </div>
                        : null}

                    <Link to="/safaris" className="btn btn-primary btn-block mt-3">
                        Trending Safari
                    </Link>

                </Fragment>
            }
        </Fragment>
    )
}