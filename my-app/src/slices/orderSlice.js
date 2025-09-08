import { createSlice } from "@reduxjs/toolkit";


const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orderDetail: {},
        userOrder: [],
        adminOrder: [],
        isOrderPlaced: false,
        isOrderDeleted: false,
        isOrderUpdated: false,
        loading: false
    },
    reducers: {
        createOrderRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        createOrderSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isOrderPlaced: true,
                orderDetail: action.payload.booking
            }
        },
        createOrderFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }, 
        clearError(state){
            return {
                ...state,
                error: null
            }
        },
        userOrderRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        userOrderSuccess(state, action) {
            return {
                ...state,
                loading: false,
                userOrder: action.payload.bookings
            }
        }, 
        userOrderFail(state, action){
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        orderDetailRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        orderDetailSuccess(state, action) {
            return {
                ...state,
                loading: false,
                orderDetail: action.payload
            }
        }, 
        orderDetailFail(state, action){
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        adminOrderRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        adminOrderSuccess(state, action) {
            return {
                ...state,
                loading: false,
                adminOrder: action.payload.bookings
            }
        }, 
        adminOrderFail(state, action){
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        deleteOrderRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        deleteOrderSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isOrderDeleted: true
            }
        }, 
        deleteOrderFail(state, action){
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        updateOrderRequest(state, action) {
            return {
                ...state,
                loading: true,
            }
        },
        updateOrderSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isOrderUpdated: true
            }
        }, 
        updateOrderFail(state, action){
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }, 
        clearOrderDeleted(state,action){
            return{
                ...state,
                isOrderDeleted: false
            }
        }, 
        clearOrderUpdated(state,action){
            return{
                ...state,
                isOrderUpdated: false
            }
        }, 
        clearOrderPlaced(state,action){
            return{
                ...state,
                isOrderPlaced: false
            }
        }
    }
});

const { actions, reducer } = orderSlice;

export const { createOrderRequest, createOrderSuccess, createOrderFail, clearError, userOrderRequest, userOrderSuccess, userOrderFail, orderDetailRequest, orderDetailSuccess, orderDetailFail, adminOrderRequest, adminOrderSuccess, adminOrderFail, deleteOrderRequest, deleteOrderSuccess, deleteOrderFail, updateOrderRequest, updateOrderSuccess, updateOrderFail, clearOrderDeleted, clearOrderUpdated, clearOrderPlaced} = actions;

export default reducer;