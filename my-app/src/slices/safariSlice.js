import { createSlice } from "@reduxjs/toolkit";


const safariSlice = createSlice({
    name: 'safari',
    initialState: {
        loading: false,
        safari: {},
        isReviewSubmitted: false,
        error: null
    },
    reducers: {
        safariRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        safariSuccess(state, action) {
            return {
                ...state,
                loading: false,
                safari: action.payload.safari,
                reviews: action.payload.safari.reviews || []
            }
        },
        safariFail(state, action) {
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
        clearSafari(state, action) {
            return {
                ...state,
                safari: {},
            }
        },
        newSafariRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        newSafariSuccess(state, action) {
            return {
                ...state,
                loading: false,
                safari: action.payload.safari,
                isSafariCreated: true,
            }
        },
        newSafariFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                isSafariCreated: false,
            }
        },
        clearSafariCreated(state,action){
            return{
                ...state,
                isSafariCreated:false
            }
        },
        deleteSafariRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        deleteSafariSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isSafariDeleted: true,
            }
        },
        deleteSafariFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        },
        clearSafariDeleted(state,action){
            return{
                ...state,
                isSafariDeleted:false
            }
        },
        updateSafariRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        updateSafariSuccess(state, action) {
            return {
                ...state,
                loading: false,
                safari: action.payload.safari,
                isSafariUpdated: true,
            }
        },
        updateSafariFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        },
        clearSafariUpdated(state,action){
            return{
                ...state,
                isSafariUpdated:false
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

const { actions, reducer } = safariSlice;

export const { safariRequest, safariSuccess, safariFail, clearError, clearSafari , createReviewRequest, createReviewSuccess, createReviewFail, clearReviewSubmitted, newSafariRequest, newSafariSuccess, newSafariFail, updateSafariRequest, updateSafariSuccess, updateSafariFail, deleteSafariRequest, deleteSafariSuccess, deleteSafariFail, clearReviewDeleted, clearSafariCreated, clearSafariUpdated, clearSafariDeleted, reviewsRequest, reviewsSuccess, reviewsFail, deleteReviewRequest, deleteReviewSuccess,deleteReviewFail } = actions;

export default reducer;