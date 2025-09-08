import api from '../confiq/axiosConfig';
import {safariRequest, safariSuccess, safariFail, createReviewRequest, createReviewSuccess, createReviewFail, deleteSafariRequest, deleteSafariSuccess, deleteSafariFail, newSafariRequest, newSafariSuccess, newSafariFail, updateSafariRequest, updateSafariSuccess, updateSafariFail, reviewsRequest, reviewsSuccess, reviewsFail, deleteReviewRequest, deleteReviewSuccess, deleteReviewFail } from '../slices/safariSlice'
import { adminSafarisFail, adminSafarisRequest, adminSafarisSuccess, safarisFail, safarisRequest, safarisSuccess } from '../slices/safarisSlice';


export const getSafaris = () => async (dispatch) => {

    try {
        dispatch(safarisRequest());

        const { data } = await api.get('/safaris');

        dispatch(safarisSuccess(data));

    } catch (error) {
        dispatch(safarisFail({ error: error.response?.data?.message || 'An error occurred' }));
    }
}

export const getSafari = id => async (dispatch) => {

    try {
        dispatch(safariRequest());
        const { data } = await api.get(`/safari/${id}`);
        dispatch(safariSuccess(data));

    } catch (error) {
        dispatch(safariFail({ error: error.response?.data?.message }));
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
        const { data } = await api.put(`/safari/review`, reviewData, config);
        dispatch(createReviewSuccess(data));

    } catch (error) {
        dispatch(createReviewFail({ error: error.response?.data?.message }));
    }
}

export const deleteSafari = id => async (dispatch) => {

    try {
        dispatch(deleteSafariRequest());

        await api.delete(`/admin/safari/${id}`);

        dispatch(deleteSafariSuccess());

    } catch (error) {
        dispatch(deleteSafariFail({ error: error.response?.data?.message || 'An error occurred' }));
    }
}

export const createNewSafari = productData => async (dispatch) => {

    try {
        dispatch(newSafariRequest())

        const { data } = await api.post(`/admin/safari/new`, productData);

        dispatch(newSafariSuccess(data))

    } catch (error) {

        dispatch(newSafariFail(error.response.data.message))
    }

}

export const updateSafari = (id, SafariData) => async (dispatch) => {

    try {
        dispatch(updateSafariRequest())

        const { data } = await api.put(`/admin/safari/${id}`, SafariData);

        dispatch(updateSafariSuccess(data))

    } catch (error) {

        dispatch(updateSafariFail(error.response.data.message))
    }

}


export const getReviews = id => async (dispatch) => {

    try {
        dispatch(reviewsRequest());


        const { data } = await api.get(`/admin/safariReviews`, { params: { id } });

        dispatch(reviewsSuccess(data));

    } catch (error) {
        dispatch(reviewsFail({ error: error.response?.data?.message || 'An error occurred' }));
    }
}

export const deleteReviews = (safariId, id) => async (dispatch) => {

    try {
        dispatch(deleteReviewRequest());


        await api.delete(`/admin/safariReviews`, { params: { safariId,id } });

        dispatch(deleteReviewSuccess());

    } catch (error) {
        dispatch(deleteReviewFail({ error: error.response?.data?.message || 'An error occurred' }));
    }
}


export const getAdminSafaris = async (dispatch) => {

    try {
        dispatch(adminSafarisRequest());

        const { data } = await api.get(`/admin/safaris`);

        dispatch(adminSafarisSuccess(data));

    } catch (error) {
        dispatch(adminSafarisFail({ error: error.response?.data?.message || 'An error occurred' }));
    }
}