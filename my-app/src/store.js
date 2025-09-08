import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import toursReducer from './slices/toursSlice';
import tourReducer from './slices/tourSlice';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';
import userReducer from './slices/userSlice';
import safariReducer from './slices/safariSlice';
import safarisReducer from './slices/safarisSlice';
import safariCartReducer from './slices/safariCartSlice';
import safariOrderReducer from './slices/safariOrderSlice';

const reducer = combineReducers({
    toursState: toursReducer,
    tourState: tourReducer,
    authState: authReducer,
    cartState: cartReducer,
    orderState: orderReducer,
    userState: userReducer,
    safariState: safariReducer,
    safarisState: safarisReducer,
    safariCartState: safariCartReducer,
    safariOrderState : safariOrderReducer
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;

