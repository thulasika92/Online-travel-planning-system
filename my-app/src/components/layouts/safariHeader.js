import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DropdownButton, Dropdown, Image } from 'react-bootstrap';
import { logout } from '../../actions/userActions';
import { toast } from 'react-toastify';

export default function SafariHeader() {

    const { isAuthenticated, user } = useSelector(state => state.authState);
    const { items: cartItems } = useSelector(state => state.safariCartState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        await dispatch(logout);
        navigate('/login');
        toast("Successfully Logged out!", {
            position: "top-center",
            type: 'success'
        });
    }

    return (
        <nav className="navbar row d-flex align-items-center" style={{ padding: '8px 15px' }}>
            {/* Left side - Logo */}
            <div className="col-12 col-md-3">
                <div className="navbar-brand">
                    <Link to='/'>
                        <img width="150px" alt='TourExperts Logo' src="/images/tourLogo.png" />
                    </Link>
                </div>
            </div>

            {/* Center - Heading */}
            <div className="col-12 col-md-6 d-flex justify-content-center align-items-center mt-2 mt-md-0">
                <Link to="/safaris" style={{ textDecoration: 'none' }}>
                    <h1
                        id="products_heading"
                        style={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '36px',
                            fontFamily: 'Arial, sans-serif',
                            textAlign: 'center',
                            textTransform: 'uppercase',
                            margin: 0, // Ensure there's no margin around the heading
                        }}
                    >
                        Trending Safaris
                    </h1>
                </Link>
            </div>

            {/* Right side - User and Cart */}
            <div className="col-12 col-md-3 d-flex justify-content-end align-items-center mt-4 mt-md-0 text-center">
                {isAuthenticated ? (
                    <Dropdown className='d-inline'>
                        <Dropdown.Toggle variant='default text-white pr-5' id='dropdown-basic'>
                            <div className='avatar-container'>
                                <figure className='avatar avatar-nav avatar-circle'>
                                    <Image width="50px" src={user?.avatar || '/images/default_avatar.png'}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/images/default_avatar.png';
                                        }}
                                    />
                                </figure>
                                <span>{user?.name}</span>
                            </div>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {user?.role == 'admin' && <Dropdown.Item onClick={() => { navigate('/admin/dashboard') }} className='text-dark'>Dashboard</Dropdown.Item>}
                            <Dropdown.Item onClick={() => { navigate('/myprofile') }} className='text-dark'>Profile</Dropdown.Item>
                            <Dropdown.Item onClick={() => { navigate('/bookings') }} className='text-dark'>Tour Bookings</Dropdown.Item>
                            <Dropdown.Item onClick={() => { navigate('/safariBookings') }} className='text-dark'>Safari Bookings</Dropdown.Item>
                            <Dropdown.Item onClick={logoutHandler} className='text-danger'>Log out</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                ) :
                    <Link to="/login" className="btn" id="login_btn">Login</Link>
                }

                <Link to='/safariCart' className="ml-3">
                    <span id="cart">Safaris</span>
                </Link>
                <span className="ml-1" id="cart_count">{cartItems?.length}</span>
            </div>
        </nav>
    )
}

