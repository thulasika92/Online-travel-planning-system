import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../../actions/orderAction';
import { orderCompleted } from "../../slices/cartSlice";
import { clearError, clearOrderPlaced } from "../../slices/orderSlice";
import { toast } from 'react-toastify';

export default function Payment() {

    const { user = {} } = useSelector(state => state.authState);
    const { items: cartItems } = useSelector(state => state.cartState);
    const { isOrderPlaced = false, error = null } = useSelector(state => state.orderState || {});

    const [name, setName] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [slip, setSlip] = useState("");
    const [slipPreview, setSlipPreview] = useState("");
    const [tours, setTours] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (cartItems.length > 0) {
            const calculatedTours = cartItems.map(item => ({
                tourId: item.tour,
                tourDate: item.tourDate,
                spotsBooked: item.quantity,
                price: item.price
            }));

            const calculatedTotal = cartItems.reduce(
                (sum, item) => sum + (item.price * item.quantity), 
                0
            );

            setTours(calculatedTours);
            setTotalAmount(calculatedTotal);
        }
    }, [cartItems]);

    useEffect(() => {
        if (user.name) {
            setName(user.name);
        }
    }, [user.name]);

    useEffect(() => {
        if (isOrderPlaced) {
            navigate('/order/success');
            toast.success('Order placed successfully', {
                position: "top-center",
                onClose: () => {
                    dispatch(orderCompleted());
                    dispatch(clearOrderPlaced());
                }
            });
        }

        if (error) {
            toast.error(error, {
                position: "bottom-center",
                onClose: () => dispatch(clearError())
            });
        }
    }, [isOrderPlaced, error, dispatch, navigate]);


    const onChangeSlip = (e) => {
        if (e.target.name === 'slip') {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setSlipPreview(reader.result);
                    setSlip(e.target.files[0]);
                }
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('user', user._id);
        formData.append('tours', JSON.stringify(tours));
        formData.append('totalAmount', totalAmount);
        formData.append('phoneNumber', phoneNo);
        formData.append('paymentSlip', slip);

        dispatch(createOrder(formData));
    }

    return (
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form onSubmit={submitHandler} className="shadow-lg" encType='multipart/form-data'>
                    <h1 className="mt-2 mb-5">Payment Details</h1>

                    <div className="form-group">
                        <label htmlFor="name_field">Name</label>
                        <input type="text" id="name_field" className="form-control" name='name' value={name} onChange={e => setName(e.target.value)} required readOnly/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone_field">Phone No</label>
                        <input type="tel" id="phone_field" className="form-control" value={phoneNo} onChange={(e) => { setPhoneNo(e.target.value) }} required />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='avatar_upload'>Payment slip</label>
                        <div className='d-flex align-items-center'>
                            <div>
                                <figure className='avatar mr-3 item-rtl'>
                                    <img src={slipPreview || '/images/noImage.jpeg'}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/images/noImage.jpeg';
                                        }}
                                        className='rounded-circle'
                                        alt='Slip Preview' />
                                </figure>
                            </div>
                            <div className='custom-file'>
                                <input type='file' name='slip' className='custom-file-input' id='customFile' onChange={onChangeSlip} />
                                <label className='custom-file-label' htmlFor='customFile'>
                                    Choose Payment Slip
                                </label>
                            </div>
                        </div>
                        <p className='mb-5 mt-3' style={{ color: "red", fontSize: "small", fontStyle: "italic", fontWeight: "450" }}>
                            Please submit the payment confirmation slip here!
                        </p>
                    </div>

                    <button type="submit" className="btn update-btn btn-block mt-4 mb-3" disabled={!slip}>Proceed</button>
                </form>
            </div>
        </div>
    );
}
