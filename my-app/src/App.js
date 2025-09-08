import './App.css';
import Home from './components/Home';
import Footer from './components/layouts/footer';
import Header from './components/layouts/header';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import TourSearch from './components/tour/tourSearch';
import TourDetail from './components/tour/tourDeatail';
import 'react-toastify/dist/ReactToastify.css';
import { loadUser } from './actions/userActions';
import Login from './components/user/login';
import { useEffect } from 'react';
import store from './store'
import Register from './components/user/register';
import ProtectedRoute from './components/route/protectedRoute';
import Profile from './components/user/profile';
import UpdatePassword from './components/user/updatePassword';
import UpdateProfile from './components/user/updateProfile';
import ForgotPassword from './components/user/forgotPAssword';
import ResetPassword from './components/user/resetPassword';
import Cart from './components/cart/cart';
import Payment from './components/cart/payment';
import OrderSuccess from './components/cart/orderSuccess';
import UserOrders from './components/order/userOrders';
import OrderDetail from './components/order/orderDetail';
import Dashboard from './components/admin/dashboard';
import SafariListing from './components/safari/safariListing';
import ShowHeader from './components/layouts/showHeader';
import SafariDetail from './components/safari/safariDetail';
import SafariCart from './components/safariCart/safariCart';
import SafariPayment from './components/safariCart/safariPayment';
import SafariOrderSuccess from './components/safariCart/safariOrderSuccess';
import SafariOrderDetail from './components/order/safariOrderDetail';
import UserSafariOrders from './components/order/userSafariOrders';
import UserLayout from './components/layouts/userLayout';
import AdminLayout from './components/layouts/adminLayout';
import TourList from './components/admin/tourList';
import NewTour from './components/admin/newTour';
import SafariList from './components/admin/safariList';
import NewSafari from './components/admin/newSafari';
import UpdateTour from './components/admin/updateTour';
import UpdateSafari from './components/admin/updateSafari';
import TourOrderList from './components/admin/tourOrderList';
import SafariOrderList from './components/admin/safariOrderList';
import UpdateTourOrder from './components/admin/updateTourOrder';
import UpdateSafariOrder from './components/admin/updateSafariOrder';
import UserList from './components/admin/userList';
import UpdateUser from './components/admin/updateUser';
import TourReviewList from './components/admin/tourReviewList';
import SafariReviewList from './components/admin/safariReviewList';






function App() {


  useEffect(() => {
    store.dispatch(loadUser)
  }, [])



  return (
    <Router>
      <div className="App">
        <HelmetProvider>
          <Routes>
            <Route element={<UserLayout />}>
              <Route path='/' element={<Home />} />
              <Route path='/search/:keyword' element={<TourSearch />} />
              <Route path='/tour/:id' element={<TourDetail />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/myprofile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path='/myprofile/update' element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
              <Route path='/myprofile/update/password' element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />
              <Route path='/password/forgot' element={<ForgotPassword />} />
              <Route path='/password/reset/:token' element={<ResetPassword />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/payment' element={<ProtectedRoute><Payment /></ProtectedRoute>} />
              <Route path='/order/success' element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
              <Route path='/bookings' element={<ProtectedRoute><UserOrders /></ProtectedRoute>} />
              <Route path='/booking/:id' element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />
              <Route path='/safaris' element={<SafariListing />} />
              <Route path='/safari/:id' element={<SafariDetail />} />
              <Route path='/safariCart' element={<SafariCart />} />
              <Route path='/safariBooking/payment' element={<SafariPayment />} />
              <Route path='/safariOrder/success' element={<ProtectedRoute><SafariOrderSuccess /></ProtectedRoute>} />
              <Route path='/safariBooking/:id' element={<ProtectedRoute><SafariOrderDetail /></ProtectedRoute>} />
              <Route path='/safariBookings' element={<ProtectedRoute><UserSafariOrders /></ProtectedRoute>} />
            </Route>
          </Routes>
          {/* Admin Routes */}
          <Routes>
            <Route element={<AdminLayout />}>
              <Route path='/admin/dashboard' element={<ProtectedRoute isAdmin={true}><Dashboard /></ProtectedRoute>} />
              <Route path='/admin/tours' element={<ProtectedRoute isAdmin={true}><TourList/></ProtectedRoute> } />
              <Route path='/admin/tours/create' element={<ProtectedRoute isAdmin={true}><NewTour/></ProtectedRoute> } />
              <Route path='/admin/tour/:id' element={<ProtectedRoute isAdmin={true}><UpdateTour/></ProtectedRoute> } />
              <Route path='/admin/safaris' element={<ProtectedRoute isAdmin={true}><SafariList/></ProtectedRoute> } />
              <Route path='/admin/safaris/create' element={<ProtectedRoute isAdmin={true}><NewSafari/></ProtectedRoute> } />
              <Route path='/admin/safari/:id' element={<ProtectedRoute isAdmin={true}><UpdateSafari/></ProtectedRoute> } />
              <Route path='/admin/orders' element={<ProtectedRoute isAdmin={true}><TourOrderList/></ProtectedRoute> } />
              <Route path='/admin/safariOrders' element={<ProtectedRoute isAdmin={true}><SafariOrderList/></ProtectedRoute> } />
              <Route path='/admin/order/:id' element={<ProtectedRoute isAdmin={true}><UpdateTourOrder/></ProtectedRoute> } />
              <Route path='/admin/safariOrder/:id' element={<ProtectedRoute isAdmin={true}><UpdateSafariOrder/></ProtectedRoute> } />
              <Route path='/admin/users' element={<ProtectedRoute isAdmin={true}><UserList/></ProtectedRoute> } />
              <Route path='/admin/user/:id' element={<ProtectedRoute isAdmin={true}><UpdateUser/></ProtectedRoute> } />
              <Route path='/admin/reviews' element={<ProtectedRoute isAdmin={true}><TourReviewList/></ProtectedRoute> } />
              <Route path='/admin/safariReviews' element={<ProtectedRoute isAdmin={true}><SafariReviewList/></ProtectedRoute> } />
            </Route>
          </Routes>
        </HelmetProvider>
      </div>
    </Router>
  );
}

export default App;
