import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: true,
        isAuthenticated: false,
        error: null
    },
    reducers: {
        loginRequest(state, action) {
            return {
                ...state,
                loading: true,
                error: null,
            }
        },
        loginSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload.user,
            }
        },
        loginFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        },
        clearError(state, action) {
            return {
                ...state,
                error:null,
            }
        },
        registerRequest(state, action) {
            return {
                ...state,
                loading: true,
                error: null,
            }
        },
        registerSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload.user,
            }
        },
        registerFail(state, action) {
            return {
                loading: false,
                error: action.payload.error
            }
        },
        loadUserRequest(state, action) {
            return {
                ...state,
                loading: true,
                isAuthenticated: false,
                error: null,
            }
        },
        loadUserSuccess(state, action) {
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user,
            }
        },
        loadUserFail(state, action) {
            return {
                ...state,
                loading: false,
                // error: action.payload.error(Bcz, it is not important)
            }
        },
        logoutSuccess(state, action) {
            return {
                loading: false,
                isAuthenticated: false,
            }
        },
        logoutFail(state, action) {
            return {
                ...state,
                error: action.payload.error
            }
        },
        updateProfileRequest(state, action) {
            return {
                ...state,
                loading: true,
                error: null,
                isUpdated: false
            }
        },
        updateProfileSuccess(state, action) {
            return {
                ...state,
                loading: false,
                user: action.payload.user,
                isUpdated: true
            }
        },
        updateProfileFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        },
        clearUpdateProfile(state, action) {
            return {
                ...state,
                isUpdated: false,
            }
        },
        updatePasswordRequest(state, action) {
            return {
                ...state,
                loading: true,
                error: null,
                isUpdated: false
            }
        },
        updatePasswordSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isUpdated: true
            }
        },
        updatePasswordFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        },
        forgotPasswordRequest(state, action) {
            return {
                ...state,
                loading: true,
                error: null,
                message: null
            }
        },
        forgotPasswordSuccess(state, action) {
            return {
                ...state,
                loading: false,
                message: action.payload.message
            }
        },
        forgotPasswordFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        },
        resetPasswordRequest(state, action) {
            return {
                ...state,
                loading: true,
                error: null,
            }
        },
        resetPasswordSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload.user
            }
        },
        resetPasswordFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        },
    }
});

const {actions, reducer} = authSlice;

export const {
    loginRequest, 
    loginSuccess, 
    loginFail, 
    clearError,
    registerRequest,
    registerSuccess,
    registerFail,
    loadUserRequest,
    loadUserSuccess,
    loadUserFail,
    logoutSuccess,
    logoutFail,
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFail,
    clearUpdateProfile,
    updatePasswordRequest,
    updatePasswordSuccess,
    updatePasswordFail,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    forgotPasswordFail,
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFail
} = actions;

export default reducer;