const express = require('express');
const {getSafari, getSingleSafari, getAdminSafaris, createReview, getReviews, deleteReview, newSafari, updateSafaris, deleteSafari} = require('../controllers/safariController');
const router = express.Router();
const {isAuthenticatedUser, authorizeRoles} = require('../middlewares/authenticate');
const multer =require('multer');
const path = require('path');



const upload = multer({storage: multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname,'..', 'uploads/safari'))
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})})

router.route('/safaris').get(getSafari);
router.route('/safari/:id').get(getSingleSafari);
router.route('/safari/review').put(isAuthenticatedUser, createReview);


// //admin routes

router.route('/admin/safari/new').post(isAuthenticatedUser,authorizeRoles('admin'),upload.array('images'), newSafari);
router.route('/admin/safaris').get(isAuthenticatedUser,authorizeRoles('admin'), getAdminSafaris);
router.route('/admin/safari/:id').delete(isAuthenticatedUser,authorizeRoles('admin'), deleteSafari);
router.route('/admin/safari/:id').put(isAuthenticatedUser,authorizeRoles('admin'),upload.array('images'), updateSafaris);
router.route('/admin/safariReviews').get(isAuthenticatedUser,authorizeRoles('admin'),getReviews);
router.route('/admin/safariReviews').delete(isAuthenticatedUser,authorizeRoles('admin'),deleteReview);

module.exports = router;