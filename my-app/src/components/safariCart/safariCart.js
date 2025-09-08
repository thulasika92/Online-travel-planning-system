import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { decreaseCartItemQty, increaseCartItemQty, removeItemFromCart } from '../../slices/safariCartSlice';


export default function SafariCart() {

    const { items } = useSelector(state => state.safariCartState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const increaseQty = (item) => {
        const count = item.quantity;
        if (item.quantity > 5) return;
        dispatch(increaseCartItemQty({safariId: item.safari, safariDate: item.safariDate }))
    }

    const decreaseQty = (item) => {
        const count = item.quantity;
        if (count === 1) return;
        dispatch(decreaseCartItemQty({ safariId: item.safari, safariDate: item.safariDate }))
    }

    const checkOutHandler = () => {
        navigate('/login?redirect=safariBooking/payment')
    }

    // Function to format the date
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }); // Outputs: 30-Mar-2025
    };


    return (
        <Fragment>
            {items.length == 0 ?
                <h2 className="mt-5" >Your Safari Cart is Empty</h2> :
                <Fragment>
                    <h2 className="mt-5">Your Safari Cart: <b>{items.length} items</b></h2>

                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8">
                            {items.map((item, index) => (
                                <Fragment key={item.safari + index}>
                                    <hr />
                                    <div className="cart-item" >
                                        <div className="row">
                                            <div className="col-4 col-lg-3">
                                                <img src={item.image} alt={item.name} height="90" width="115" style={{ borderRadius: '5px' }} />
                                            </div>

                                            <div className="col-5 col-lg-3">
                                                <Link to={`/safari/${item.safari}`}>{item.name}</Link>
                                                <p></p>
                                                {/* <h6><b>{formatDate(item.tourDate)}</b></h6> */}
                                                <h6 style={{ color: '#006400', fontStyle: 'italic' }} className="fw-bold mt-2">
                                                    🗓️ {formatDate(item.safariDate)}
                                                </h6>
                                            </div>


                                            {/* <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                <p id="card_item_price">Rs.{item.price}</p>
                                            </div> */}
                                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                <p id="card_item_price" style={{ color: '#5F9EA0', fontWeight: 'bold', fontStyle: 'italic' }}>Rs.{item.price}</p>
                                            </div>


                                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                <div className="stockCounter d-inline">
                                                    <span onClick={() => { decreaseQty(item) }} className="btn btn-danger minus">-</span>
                                                    <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />

                                                    <span onClick={() => { increaseQty(item) }} className="btn btn-success plus">+</span>
                                                </div>
                                            </div>

                                            <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                <i id="delete_cart_item" onClick={() => { dispatch(removeItemFromCart({safariId: item.safari, safariDate: item.safariDate })) }} className="fa fa-trash btn btn-danger"></i>
                                            </div>

                                        </div>
                                    </div>
                                </Fragment>
                            ))}

                            <hr />
                        </div>

                        <div className="col-12 col-lg-3 my-4">
                            <div id="order_summary">
                                <h4>Order Summary</h4>
                                <hr />
                                <p>Subtotal: <span className="order-summary-values">{items.length} (safaris)</span></p>
                                <p>Est. total: <span className="order-summary-values">Rs.{items.reduce((acc, item) => (acc + item.quantity * item.price), 0).toFixed(2)}</span></p>
                                <hr />
                                <button id="checkout_btn" onClick={checkOutHandler} className="btn btn-primary btn-block">Check out</button>
                            </div>
                        </div>
                    </div>
                </Fragment>
            }
        </Fragment>

    )
}