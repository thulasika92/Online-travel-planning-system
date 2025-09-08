// import { Link, useNavigate } from 'react-router-dom';
// import Search from './search';


// export default function Header(){
//     return(
//         <nav className="navbar row">
//                 <div className="col-12 col-md-3">
//                     <div className="navbar-brand">
//                     <Link to='/'>
//                         <img width="150px" alt='TourExperts Logo' src="/images/tourLogo.png" />
//                     </Link>
//                     </div>
//                 </div>

//                 <div className="col-12 col-md-6 mt-2 mt-md-0">
//                     <Search/>
//                 </div>

//                 <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
//                 <Link to="/login" className="btn" id="login_btn">Login</Link>

//                     <span id="cart" className="ml-3">Cart</span>
//                     <span className="ml-1" id="cart_count">2</span>
//                 </div>
//             </nav>
//     )
// }

import React from 'react';
import Search from './search';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DropdownButton, Dropdown, Image } from 'react-bootstrap';
import { logout } from '../../actions/userActions';
import { toast } from 'react-toastify';



export default function Header() {

    const { isAuthenticated, user } = useSelector(state => state.authState);
    const { items: cartItems } = useSelector(state => state.cartState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        await dispatch(logout);
        navigate('/login');
        toast("successfully Logged out!", {
            position: "top-center",
            type: 'success'
        });
    }


    return (
        <nav className="navbar row">
            <div className="col-12 col-md-3">
                <div className="navbar-brand">
                    <Link to='/'>
                    <img width="150px" alt='TourExperts Logo' src="/images/tourLogo.png" />
                    </Link>
                </div>
            </div>

            <div className="col-12 col-md-6 mt-2 mt-md-0">
                <Search />
            </div>

            <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
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
                                <span>{user.name}</span>
                            </div>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {user.role == 'admin' && <Dropdown.Item onClick={() => { navigate('/admin/dashboard') }} className='text-dark'>Dashboard</Dropdown.Item>}
                            <Dropdown.Item onClick={() => { navigate('/myprofile') }} className='text-dark'>Profile</Dropdown.Item>
                            <Dropdown.Item onClick={() => { navigate('/bookings') }} className='text-dark'>Tour Bookings</Dropdown.Item>
                            <Dropdown.Item onClick={() => { navigate('/safariBookings') }} className='text-dark'>Safari Bookings</Dropdown.Item>
                            <Dropdown.Item onClick={logoutHandler} className='text-danger'>Log out</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                ) :
                    <Link to="/login" className="btn" id="login_btn">Login</Link>
                }

                <Link to='/cart'><span id="cart" className="ml-3">Tours</span></Link>
                <span className="ml-1" id="cart_count">{cartItems.length}</span>
            </div>
        </nav>
    )
}
