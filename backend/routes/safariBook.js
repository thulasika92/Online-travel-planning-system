const express = require('express');
const multer =require('multer');
const path = require('path');
const router = express.Router();
const {newSafariBooking, getSingleSafariBooking, mySafariBookings, safariBookings, updateSafariBooking, deleteSafariBooking} = require('../controllers/safariBookController');
const {isAuthenticatedUser, authorizeRoles} = require('../middlewares/authenticate');


const upload = multer({storage: multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname,'..', 'uploads/payment'))
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})})

router.route('/safariBook/new').post(isAuthenticatedUser,upload.single('paymentSlip'), newSafariBooking);
router.route('/safariBook/:id').get(isAuthenticatedUser, getSingleSafariBooking);
router.route('/mySafariBookings').get(isAuthenticatedUser, mySafariBookings);

//Admin Routes
router.route('/admin/safariBookings').get(isAuthenticatedUser, authorizeRoles('admin')  , safariBookings);
router.route('/admin/safariBooking/:id').put(isAuthenticatedUser, authorizeRoles('admin')  , updateSafariBooking);
router.route('/admin/safariBooking/:id').delete(isAuthenticatedUser, authorizeRoles('admin')  , deleteSafariBooking);



module.exports = router;