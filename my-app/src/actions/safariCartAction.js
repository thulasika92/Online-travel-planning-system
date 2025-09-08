import { addCartItemRequest, addCartItemSuccess, addCartItemFail } from '../slices/safariCartSlice';
import api from '../confiq/axiosConfig';
import { toast } from 'react-toastify';




export const addCartItems = (id, quantity, tourDate) => async (dispatch) => {
    try {
        dispatch(addCartItemRequest())
        // const { data } = await api.get(`/tour/${id}`)
        // const item = {
        //     tour: data.tour._id,
        //     name: data.tour.name,
        //     price: data.tour.price,
        //     image: data.tour.images[0].image,
        //     availableSpots: data.tour.availableSpots,
        //     quantity, 
        //     tourDate: tourDate.toISOString()
        // }

        // dispatch(addCartItemSuccess(item));

        const { data } = await api.get(`/safari/${id}`);
        const newItem = {
            safari: data.safari._id,
            name: data.safari.name,
            price: data.safari.price,
            image: data.safari.images[0]?.image,
            quantity,
            safariDate: tourDate.toISOString(),
        };

        // Get the current cart from localStorage
        const cartItems = localStorage.getItem('safariCartItems') 
            ? JSON.parse(localStorage.getItem('safariCartItems')) 
            : [];

        // Check if the item with the same ID and Date already exists
        const isItemExist = cartItems.some(item =>
            item.safari === newItem.safari && item.safariDate === newItem.safariDate
        );

        if (isItemExist) {
            // Dispatch failure action and show an error message
            dispatch(addCartItemFail('This safari on the selected date is already in your cart.'));
            toast.error('This safari on the selected date is already in your cart.', {
                position: 'top-center',
            });
            return; // Stop further execution
        }

        // If no duplicate, add to the cart
        dispatch(addCartItemSuccess(newItem));
        toast.success('Safari added to your cart successfully!', {
            position: 'top-center',
        });
    } catch (error) {

    }
}