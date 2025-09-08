import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: localStorage.getItem('tourCartItems') ? JSON.parse(localStorage.getItem('tourCartItems')) : [],
        loading: false,
        error: null,
    },
    reducers: {
        addCartItemRequest(state, action) {
            return {
                ...state,
                loading: true,
                error: null,
            }
        },
        addCartItemSuccess(state, action) {
            const item = action.payload

            // Check if the item already exists in the cart for the same tour and date
            const existingItem = state.items.find(
                (i) => i.tour === item.tour && i.tourDate === item.tourDate
            );

            if (!existingItem) {
                state.items.push(item);
                localStorage.setItem('tourCartItems', JSON.stringify(state.items));
            }

            // Set the loading state to false and save the items to localStorage
            state.loading = false;

        },
        addCartItemFail(state, action) {
            state.loading = false;
            state.error = action.payload; // Set error message
        },
        increaseCartItemQty(state, action) {
            const { tourId, tourDate } = action.payload;
            state.items = state.items.map(item => {
                if (item.tour === tourId && item.tourDate === tourDate) {
                    // Ensure the item exists and there are available spots to increase the quantity
                    if (item.quantity < item.availableSpots) {
                        item.quantity += 1;
                    }
                }
                return item;
            });

            localStorage.setItem('tourCartItems', JSON.stringify(state.items));
        },
        decreaseCartItemQty(state, action) {
            const { tourId, tourDate } = action.payload;
            state.items = state.items.map(item => {
                if (item.tour === tourId && item.tourDate === tourDate) {
                    // Ensure the quantity doesn't go below 1
                    if (item.quantity > 1) {
                        item.quantity -= 1;
                    }
                }
                return item;
            });

            localStorage.setItem('tourCartItems', JSON.stringify(state.items));
        },
        removeItemFromCart(state, action) {
            // const filterItems = state.items.filter(item => {
            //     return item.tour !== action.payload
            // })
            // localStorage.setItem('tourCartItems', JSON.stringify(filterItems))
            // return {
            //     ...state,
            //     items: filterItems
            // }
            // Check if the item with the same tourId and tourDate exists in the cart
            const updatedItems = state.items.filter(item =>
                !(item.tour === action.payload.tourId && item.tourDate === action.payload.tourDate)
            );

            // Save the updated cart items in localStorage
            localStorage.setItem('tourCartItems', JSON.stringify(updatedItems));

            // Return the updated state
            return {
                ...state,
                items: updatedItems
            };
            // },
            // saveShippingInfo(state, action) {
            //     localStorage.setItem('shippingInfo', JSON.stringify(action.payload))
            //     return {
            //         ...state,
            //         shippingInfo: action.payload
            //     }
        },
        orderCompleted(state, action) {
            localStorage.removeItem('tourCartItems');
            sessionStorage.removeItem('tourOrderInfo');
            return {
                items: [],
                loading: false,
            }
        }
    }
});

const { actions, reducer } = cartSlice;

export const { addCartItemRequest, addCartItemSuccess, addCartItemFail, increaseCartItemQty, decreaseCartItemQty, removeItemFromCart, orderCompleted } = actions;

export default reducer;