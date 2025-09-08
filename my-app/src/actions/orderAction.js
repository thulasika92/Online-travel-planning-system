import { adminOrderFail, adminOrderRequest, adminOrderSuccess, createOrderFail, createOrderRequest, createOrderSuccess, deleteOrderFail, deleteOrderRequest, deleteOrderSuccess, orderDetailFail, orderDetailRequest, orderDetailSuccess, updateOrderFail, updateOrderRequest, updateOrderSuccess, userOrderFail, userOrderRequest, userOrderSuccess } from "../slices/orderSlice";
import api from '../confiq/axiosConfig';


export const createOrder = (order) => async(dispatch) => {
    try{
        dispatch(createOrderRequest())

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        
        const {data} = await api.post('/book/new', order, config)
        dispatch(createOrderSuccess(data))
    }catch(error){
        dispatch(createOrderFail(error?.response?.data?.message))
    }
}

export const userOrders = async(dispatch) => {
    try{
        dispatch(userOrderRequest())
        const {data} = await api.get('/mybookings')
        dispatch(userOrderSuccess(data))
    }catch(error){
        dispatch(userOrderFail(error?.response?.data?.message))
    }
}

export const orderDetail = id => async(dispatch) => {
    try{
        dispatch(orderDetailRequest())
        const {data} = await api.get(`/book/${id}`)
        dispatch(orderDetailSuccess(data))
    }catch(error){
        dispatch(orderDetailFail(error?.response?.data?.message))
    }
}

export const adminBookings = async(dispatch) => {
    try{
        dispatch(adminOrderRequest())
        const {data} = await api.get(`/admin/bookings`)
        dispatch(adminOrderSuccess(data))
    }catch(error){
        dispatch(adminOrderFail(error?.response?.data?.message))
    }
}

export const deleteOrder = id => async(dispatch) => {
    try{
        dispatch(deleteOrderRequest())
        const {data} = await api.delete(`/admin/booking/${id}`)
        dispatch(deleteOrderSuccess(data))
    }catch(error){
        dispatch(deleteOrderFail(error?.response?.data?.message))
    }
}

export const updateOrders = (id, orderData) => async(dispatch) => {
    try{
        dispatch(updateOrderRequest())
        const {data} = await api.put(`/admin/booking/${id}`, orderData)
        dispatch(updateOrderSuccess(data))
    }catch(error){
        dispatch(updateOrderFail(error?.response?.data?.message))
    }
}