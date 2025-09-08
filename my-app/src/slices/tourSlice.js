import { createSlice } from "@reduxjs/toolkit";


const tourSlice = createSlice({
    name: 'tour',
    initialState: {
        loading: false,
        isReviewSubmitted: false,
        isTourCreated: false,
        isTourDeleted: false,
        isTourUpdated: false,
        isReviewDeleted: false,
        reviews: [],
        tour: {},
        error: null
    },
    reducers: {
        tourRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        tourSuccess(state, action) {
            return {
                ...state,
                loading: false,
                tour: action.payload.tour,
                reviews: action.payload.tour.reviews || []
            }
        },
        tourFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        },
        createReviewRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        createReviewSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isReviewSubmitted: true,
            }
        },
        createReviewFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        },
        clearReviewSubmitted(state, action) {
            return {
                ...state,
                isReviewSubmitted: false
            }
        },
        clearError(state, action) {
            return {
                ...state,
                error: null
            }
        },
        clearTour(state, action) {
            return {
                ...state,
                tour : {}
            }
        },
        newTourRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        newTourSuccess(state, action) {
            return {
                ...state,
                loading: false,
                tour: action.payload.tour,
                isTourCreated: true,
            }
        },
        newTourFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                isTourCreated: false,
            }
        },
        clearTourCreated(state,action){
            return{
                ...state,
                isTourCreated:false
            }
        },
        deleteTourRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        deleteTourSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isTourDeleted: true,
            }
        },
        deleteTourFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        },
        clearTourDeleted(state,action){
            return{
                ...state,
                isTourDeleted:false
            }
        },
        updateTourRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        updateTourSuccess(state, action) {
            return {
                ...state,
                loading: false,
                tour: action.payload.tour,
                isTourUpdated: true,
            }
        },
        updateTourFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        },
        clearTourUpdated(state,action){
            return{
                ...state,
                isTourUpdated:false
            }
        },
        reviewsRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        reviewsSuccess(state, action) {
            return {
                ...state,
                loading: false,
                reviews: action.payload.reviews,
            }
        },
        reviewsFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        },
        deleteReviewRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        deleteReviewSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isReviewDeleted: true,
            }
        },
        deleteReviewFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        },
        clearReviewDeleted(state, action) {
            return {
                ...state,
                isReviewDeleted: false,
            }
        },
    }
});

const { actions, reducer } = tourSlice;

export const { tourRequest, tourSuccess, tourFail, createReviewRequest, createReviewSuccess, createReviewFail, clearError, clearReviewSubmitted, clearTour, newTourRequest, newTourSuccess, newTourFail, clearTourCreated, deleteTourRequest, deleteTourSuccess, deleteTourFail, clearTourDeleted, updateTourRequest, updateTourSuccess, updateTourFail, clearTourUpdated, reviewsRequest, reviewsSuccess, reviewsFail, deleteReviewRequest, deleteReviewSuccess, deleteReviewFail, clearReviewDeleted} = actions;

export default reducer;