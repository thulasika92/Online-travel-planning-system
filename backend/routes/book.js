const express = require('express');
const multer =require('multer');
const path = require('path');
const router = express.Router();
const {newBooking, getSingleBooking, myBookings, bookings, updateBooking, deleteBooking} = require('../controllers/bookController');
const {isAuthenticatedUser, authorizeRoles} = require('../middlewares/authenticate');


const upload = multer({storage: multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname,'..', 'uploads/payment'))
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})})

router.route('/book/new').post(isAuthenticatedUser,upload.single('paymentSlip'), newBooking);
router.route('/book/:id').get(isAuthenticatedUser, getSingleBooking);
router.route('/mybookings').get(isAuthenticatedUser, myBookings);

//Admin Routes
router.route('/admin/bookings').get(isAuthenticatedUser, authorizeRoles('admin')  , bookings);
router.route('/admin/booking/:id').put(isAuthenticatedUser, authorizeRoles('admin')  , updateBooking);
router.route('/admin/booking/:id').delete(isAuthenticatedUser, authorizeRoles('admin')  , deleteBooking);



module.exports = router;