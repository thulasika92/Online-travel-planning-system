import api from '../confiq/axiosConfig';
import { createReviewFail, createReviewRequest, createReviewSuccess, deleteReviewFail, deleteReviewRequest, deleteReviewSuccess, deleteTourFail, deleteTourRequest, deleteTourSuccess, newTourFail, newTourRequest, newTourSuccess, reviewsFail, reviewsRequest, reviewsSuccess, tourFail, tourRequest, tourSuccess, updateTourFail, updateTourRequest, updateTourSuccess } from '../slices/tourSlice';
import {adminToursFail, adminToursRequest, adminToursSuccess, toursFail, toursRequest, toursSuccess } from '../slices/toursSlice';

export const getTours = (keyword, price, category, rating, currentPage) => async (dispatch) => {

    try {
        dispatch(toursRequest());

        let link = `/tours?page=${currentPage}`;

        if (keyword) {
            link += `&keyword=${keyword}`
        }
        if (price) {
            link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`
        }
        if (category) {
            link += `&category=${category}`
        }
        if (rating) {
            link += `&ratings=${rating}`
        }

        const { data } = await api.get(link);

        dispatch(toursSuccess(data));

    } catch (error) {
        dispatch(toursFail({ error: error.response?.data?.message || 'An error occurred' }));
    }
}

export const getTour = id => async (dispatch) => {

    try {
        dispatch(tourRequest());
        const { data } = await api.get(`/tour/${id}`);
        dispatch(tourSuccess(data));

    } catch (error) {
        dispatch(tourFail({ error: error.response?.data?.message }));
    }
}

export const createReview = reviewData => async (dispatch) => {

    try {
        dispatch(createReviewRequest());
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        const { data } = await api.put(`/review`, reviewData, config);
        dispatch(createReviewSuccess(data));

    } catch (error) {
        dispatch(createReviewFail({ error: error.response?.data?.message }));
    }
}


export const getAdminTours = async (dispatch) => {

    try {
        dispatch(adminToursRequest());

        const { data } = await api.get(`/admin/tours`);

        dispatch(adminToursSuccess(data));

    } catch (error) {
        dispatch(adminToursFail({ error: error.response?.data?.message || 'An error occurred' }));
    }
}

export const createNewTour = TourData => async (dispatch) => {

    try {
        dispatch(newTourRequest())

        const { data } = await api.post(`/admin/tour/new`, TourData);

        dispatch(newTourSuccess(data))

    } catch (error) {

        dispatch(newTourFail(error.response.data.message))
    }

}

export const deleteTour = id => async (dispatch) => {

    try {
        dispatch(deleteTourRequest());

        await api.delete(`/admin/tour/${id}`);

        dispatch(deleteTourSuccess());

    } catch (error) {
        dispatch(deleteTourFail({ error: error.response?.data?.message || 'An error occurred' }));
    }
}

export const updateTour = (id, TourData) => async (dispatch) => {

    try {
        dispatch(updateTourRequest())

        const { data } = await api.put(`/admin/tour/${id}`, TourData);

        dispatch(updateTourSuccess(data))

    } catch (error) {

        dispatch(updateTourFail(error.response.data.message))
    }

}

export const getReviews = id => async (dispatch) => {

    try {
        dispatch(reviewsRequest());


        const { data } = await api.get(`/admin/reviews`, { params: { id } });

        dispatch(reviewsSuccess(data));

    } catch (error) {
        dispatch(reviewsFail({ error: error.response?.data?.message || 'An error occurred' }));
    }
}

export const deleteReviews = (tourId, id) => async (dispatch) => {

    try {
        dispatch(deleteReviewRequest());


        await api.delete(`/admin/reviews`, { params: { tourId,id } });

        dispatch(deleteReviewSuccess());

    } catch (error) {
        dispatch(deleteReviewFail({ error: error.response?.data?.message || 'An error occurred' }));
    }
}