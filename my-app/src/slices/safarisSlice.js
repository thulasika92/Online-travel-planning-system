import { createSlice } from "@reduxjs/toolkit";


const safarisSlice = createSlice({
    name: 'safaris',
    initialState: {
        loading: false,
        safaris: [], 
        error: null,
    },
    reducers: {
        safarisRequest(state, action) {
            return {
                ...state,
                loading: true,
                error: null,
            }
        },
        safarisSuccess(state, action) {
            return {
                ...state,
                loading: false,
                safaris: action.payload.safari,
            }
        },
        safarisFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        },
        adminSafarisRequest(state, action) {
            return {
                loading: true,
            }
        },
        adminSafarisSuccess(state, action) {
            return {
                loading: false,
                safaris: action.payload.safaris,
            }
        },
        adminSafarisFail(state, action) {
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

const {actions, reducer} = safarisSlice;

export const {safarisRequest, safarisSuccess, safarisFail, clearError, adminSafarisRequest, adminSafarisSuccess, adminSafarisFail} = actions;

export default reducer;




