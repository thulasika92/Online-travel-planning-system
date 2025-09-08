import { useDispatch, useSelector } from 'react-redux';
import { getSafaris } from "../../actions/safariAction";
import { toast } from 'react-toastify';
import Loader from '../layouts/loader';
import MetaData from "../layouts/MetaData";
import { Fragment, useEffect, useState } from "react";
import Safari from '../safari/safari';




export default function SafariListing() {

    const dispatch = useDispatch();
    const { safaris=[], loading, error } = useSelector((state) => state.safarisState)

    useEffect(() => {
        dispatch(getSafaris())
    }, [dispatch]);

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
                    <MetaData title={'Trending Safaris'} />
                    <div>
                        
                        <section id="products" className="container mt-5">
                            <div className="row">
                                {safaris && safaris.map(safari => (
                                    <Safari col={3} key={safari?._id} safari={safari} />
                                ))}
                            </div>
                        </section>
                    </div>
                </Fragment>
            }
        </Fragment>
    )
}