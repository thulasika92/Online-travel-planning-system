import {
    loginRequest, 
    loginFail, 
    loginSuccess, 
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
    updatePasswordRequest,
    updatePasswordSuccess,
    updatePasswordFail,
    forgotPasswordSuccess,
    forgotPasswordRequest,
    forgotPasswordFail,
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFail
} from '../slices/authSlice';
import { deleteUserFail, deleteUserRequest, deleteUserSuccess, updateUserFail, updateUserRequest, updateUserSuccess, userFail, userRequest, usersFail, usersRequest, usersSuccess, userSuccess } from '../slices/userSlice'
import api from '../confiq/axiosConfig';

export const login = (email, password) => async(dispatch) => {
    try {
        dispatch(loginRequest());
        const {data} = await api.post('/login', {email, password});
        dispatch(loginSuccess(data));
    } catch (error) {
        dispatch(loginFail({error: error.response?.data?.message || 'Failed to Login/server not responding'}))
    }
}

export const clearAuthError = (dispatch) => {
    dispatch(clearError())
}

export const register = (userData) => async(dispatch) => {
    try {
        dispatch(registerRequest());
        const config = {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        }
        const {data} = await api.post('/register', userData, config);
        dispatch(registerSuccess(data));
    } catch (error) {
        dispatch(registerFail({error: error.response?.data?.message || 'Failed to Register/server not responding'}))
    }
}

export const loadUser = async(dispatch) => {
    try {
        dispatch(loadUserRequest());
    
        const {data} = await api.get('/myprofile');
        dispatch(loadUserSuccess(data));
    } catch (error) {
        dispatch(loadUserFail({error: error.response?.data?.message} ))
    }
}

export const logout = async(dispatch) => {
    try {

        await api.get('/logout');
        dispatch(logoutSuccess());

    } catch (error) {
        dispatch(logoutFail({error: error.response?.data?.message} ))
    }
}

export const updateProfile = (userData) => async(dispatch) => {
    try {
        dispatch(updateProfileRequest());
        const config = {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        }
        const {data} = await api.put('/update', userData, config);
        dispatch(updateProfileSuccess(data));
    } catch (error) {
        dispatch(updateProfileFail({error: error.response?.data?.message || 'Failed to update/server not responding'}))
    }
}

export const updatePassword = (formData) => async(dispatch) => {
    try {
        dispatch(updatePasswordRequest());

        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }

        await api.put('/password/change', formData, config);
        dispatch(updatePasswordSuccess());
    } catch (error) {
        dispatch(updatePasswordFail({error: error.response?.data?.message || 'Failed to change password/server not responding'}))
    }
}

export const forgotPassword = (formData) => async(dispatch) => {
    try {
        dispatch(forgotPasswordRequest());

        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }

        const {data} =  await api.post('/password/forgot', formData, config);
        dispatch(forgotPasswordSuccess(data));
    } catch (error) {
        dispatch(forgotPasswordFail({error: error.response?.data?.message || 'Failed to change password /server not responding'}))
    }
}

export const resetPassword = (formData, token) => async(dispatch) => {
    try {
        dispatch(resetPasswordRequest());

        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }

        const {data} =  await api.post(`/password/reset/${token}`, formData, config);
        dispatch(resetPasswordSuccess(data));
    } catch (error) {
        dispatch(resetPasswordFail({error: error.response?.data?.message || 'Failed to change password/server not responding'}))
    }
}

export const getUsers = async(dispatch) => {
    try {
        dispatch(usersRequest());
    
        const {data} = await api.get('/admin/users');
        dispatch(usersSuccess(data));
    } catch (error) {
        dispatch(usersFail({error: error.response?.data?.message} ))
    }
}

export const getUser = (id) => async(dispatch) => {
    try {
        dispatch(userRequest());
    
        const {data} = await api.get(`/admin/user/${id}`);
        dispatch(userSuccess(data));
    } catch (error) {
        dispatch(userFail({error: error.response?.data?.message} ))
    }
}

export const deleteUser = (id) => async(dispatch) => {
    try {
        dispatch(deleteUserRequest());
    
        await api.delete(`/admin/user/${id}`);
        dispatch(deleteUserSuccess());
    } catch (error) {
        dispatch(deleteUserFail({error: error.response?.data?.message} ))
    }
}

export const updateUser = (id, formData) => async(dispatch) => {
    try {
        dispatch(updateUserRequest());

        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }

        await api.put(`/admin/user/${id}`, formData, config);
        dispatch(updateUserSuccess());
    } catch (error) {
        dispatch(updateUserFail({error: error.response?.data?.message || 'An error Occured'}))
    }
}