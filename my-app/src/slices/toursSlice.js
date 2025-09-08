import { createSlice } from "@reduxjs/toolkit";


const toursSlice = createSlice({
    name: 'tours',
    initialState: {
        loading: false,
        tours: [], 
        error: null,
    },
    reducers: {
        toursRequest(state, action) {
            return {
                loading: true,
                error: null,
            }
        },
        toursSuccess(state, action) {
            return {
                loading: false,
                tours: action.payload.tours,
                toursCount: action.payload.count,
                resPerPage: action.payload.resPerPage
            }
        },
        toursFail(state, action) {
            return {
                loading: false,
                error: action.payload.error
            }
        },
        adminToursRequest(state, action) {
            return {
                loading: true,
            }
        },
        adminToursSuccess(state, action) {
            return {
                loading: false,
                tours: action.payload.tours,
            }
        },
        adminToursFail(state, action) {
            return {
                loading: false,
                error: action.payload.error
            }
        },
        clearError(state, action){
            return{
                ...state,
                error: null,
            }
        }
    }
});

const {actions, reducer} = toursSlice;

export const {toursRequest, toursSuccess, toursFail,adminToursRequest, adminToursSuccess, adminToursFail, clearError} = actions;

export default reducer;




