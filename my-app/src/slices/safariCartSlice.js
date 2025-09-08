import { createSlice } from "@reduxjs/toolkit";


const safariCartSlice = createSlice({
    name: 'safariCart',
    initialState: {
        items: localStorage.getItem('safariCartItems') ? JSON.parse(localStorage.getItem('safariCartItems')) : [],
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
                (i) => i.safari === item.safari && i.safariDate === item.safariDate
            );

            if (!existingItem) {
                state.items.push(item);
                localStorage.setItem('safariCartItems', JSON.stringify(state.items));
            }

            // Set the loading state to false and save the items to localStorage
            state.loading = false;

        },
        addCartItemFail(state, action) {
            state.loading = false;
            state.error = action.payload; // Set error message
        },
        increaseCartItemQty(state, action) {
            const { safariId, safariDate } = action.payload;
            state.items = state.items.map(item => {
                if (item.safari === safariId && item.safariDate === safariDate) {
                    // Ensure the item exists and there are available spots to increase the quantity
                        if (item.quantity < 5) {
                            item.quantity += 1;
                        }
                }
                return item;
            });

            localStorage.setItem('safariCartItems', JSON.stringify(state.items));
        },
        decreaseCartItemQty(state, action) {
            const { safariId, safariDate } = action.payload;
            state.items = state.items.map(item => {
                if (item.safari === safariId && item.safariDate === safariDate) {
                    // Ensure the quantity doesn't go below 1
                    if (item.quantity > 1) {
                        item.quantity -= 1;
                    }
                }
                return item;
            });

            localStorage.setItem('safariCartItems', JSON.stringify(state.items));
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
                !(item.safari === action.payload.safariId && item.safariDate === action.payload.safariDate)
            );

            // Save the updated cart items in localStorage
            localStorage.setItem('safariCartItems', JSON.stringify(updatedItems));

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
            localStorage.removeItem('safariCartItems');
            return {
                items: [],
                loading: false,
            }
        }
    }
});

const { actions, reducer } = safariCartSlice;

export const { addCartItemRequest, addCartItemSuccess, addCartItemFail, increaseCartItemQty, decreaseCartItemQty, removeItemFromCart, orderCompleted } = actions;

export default reducer;