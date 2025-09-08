const express = require('express');
const {getTours, newTour, getSingleTour, updateTours, deleteTour, createReview, getReviews, deleteReview, getAdminTours} = require('../controllers/tourController');
const router = express.Router();
const {isAuthenticatedUser, authorizeRoles} = require('../middlewares/authenticate');
const multer =require('multer');
const path = require('path');



const upload = multer({storage: multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname,'..', 'uploads/tour'))
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})})

router.route('/tours').get(getTours);
router.route('/tour/:id').get(getSingleTour);
router.route('/review').put(isAuthenticatedUser, createReview);

// //admin routes

router.route('/admin/tour/new').post(isAuthenticatedUser,authorizeRoles('admin'),upload.array('images'), newTour);
router.route('/admin/tours').get(isAuthenticatedUser,authorizeRoles('admin'), getAdminTours);
router.route('/admin/tour/:id').delete(isAuthenticatedUser,authorizeRoles('admin'), deleteTour);
router.route('/admin/tour/:id').put(isAuthenticatedUser,authorizeRoles('admin'),upload.array('images'), updateTours);
router.route('/admin/reviews').get(isAuthenticatedUser,authorizeRoles('admin'),getReviews);
router.route('/admin/reviews').delete(isAuthenticatedUser,authorizeRoles('admin'),deleteReview);

module.exports = router;