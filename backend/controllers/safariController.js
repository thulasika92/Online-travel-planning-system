const catchAsyncError = require('../middlewares/catchAsyncError');
const Safari = require('../models/safariModel');
const ErrorHandler = require('../utils/errorHandler');
const APIFeatures = require('../utils/apiFeatures');
const mongoose = require('mongoose');

// Get all Safari Tours - /api/v1/safaris
exports.getSafari = catchAsyncError(async (req, res, next) => {
    // Fetch all Safari data from the database
    const safari = await Safari.find();

    res.status(200).json({
        success: true,
        count: safari.length, // Return the count of all safari tours
        safari
    });
});

exports.getSingleSafari = catchAsyncError(async (req, res, next) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next(new ErrorHandler("Invalid Safari ID", 400));
        }

        const safari = await Safari.findById(req.params.id).populate('reviews.user', 'name email');


        if (!safari) {
            return next(new ErrorHandler("Safari not found", 400));
        }

        res.status(200).json({
            success: true,
            safari
        })
    } catch (error) {
        return next(error.message);
    }
})

//Create review -/api/v1/review
exports.createReview = catchAsyncError(async (req, res, next) => {
    const { safariId, rating, comment } = req.body;

    const review = {
        user: req.user.id,
        rating: rating,
        comment: comment
    }

    const safari = await Safari.findById(safariId);
    const isReviewed = safari.reviews.find(review => {
        return review.user.toString() == req.user.id.toString()
    })

    //finding user review exist
    if (isReviewed) {
        safari.reviews.forEach(review => {
            if (review.user.toString() == req.user.id.toString()) {
                review.comment = comment,
                    review.rating = rating
            }
        })
    } else {
        //creating the review
        safari.reviews.push(review);
        safari.numOfReviews = safari.reviews.length;
    }

    //finding the average of product ratings
    safari.ratings = safari.reviews.reduce((acc, review) => {
        return Number(review.rating) + acc;
    }, 0) / safari.reviews.length;

    safari.ratings = isNaN(safari.ratings) ? 0 : safari.ratings;

    await safari.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    })

})

//Get reviews -/api/v1/reviews?id={tourId}
exports.getReviews = catchAsyncError(async (req, res, next) => {
    const safari = await Safari.findById(req.query.id).populate('reviews.user', 'name email');

    res.status(200).json({
        success: true,
        reviews: safari.reviews
    })
})

//Delete reviews - /api/v1/review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
    const safari = await Safari.findById(req.query.safariId);

    //filetring deleted review
    const reviews = safari.reviews.filter(review => {
        return review._id.toString() !== req.query.id.toString()
    });
    //number of reviews update
    const numOfReviews = reviews.length;

    //ratings average 
    let ratings = reviews.reduce((acc, review) => {
        return Number(review.rating) + acc;
    }, 0) / reviews.length

    ratings = isNaN(ratings) ? 0 : ratings;

    await Safari.findByIdAndUpdate(req.query.safariId, {
        reviews,
        numOfReviews,
        ratings
    })

    res.status(200).json({
        success: true,
        numOfReviews,
    })
})


//Create safari - /api/v1/safari/new
exports.newSafari = catchAsyncError(async (req, res, next) => {
    let images = []

    // if (req.files.length > 0) {
    //     req.files.forEach(file => {
    //         let url = `${process.env.BACKEND_URL}/uploads/tour/${file.originalname}`;
    //         images.push({ image: url })
    //     })
    // }

    //code from chatgpt
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
        req.files.forEach(file => {
            let url = `${process.env.BACKEND_URL}/uploads/safari/${file.originalname}`;
            images.push({ image: url });
        });
    }

    req.body.images = images;

    req.body.user = req.user.id;
    const safari = await Safari.create(req.body);
    res.status(201).json({
        success: true,
        safari
    })
});

//Update Safaris - /api/v1/safari/:id
exports.updateSafaris = catchAsyncError(async (req, res, next) => {
    try {
        let safari = await Safari.findById(req.params.id);

        //uploading images
        let images = []


        if (req.body.imagesCleared === "false") {
            images = safari.images
        }

        // if (req.files.length > 0) {
        //     req.files.forEach(file => {
        //         let url = `${process.env.BACKEND_URL}/uploads/tour/${file.originalname}`;
        //         images.push({ image: url })
        //     })
        // }

        //code from chatgpt
        if (req.files && Array.isArray(req.files) && req.files.length > 0) {
            req.files.forEach(file => {
                let url = `${process.env.BACKEND_URL}/uploads/safari/${file.originalname}`;
                images.push({ image: url });
            });
        }

        req.body.images = images;

        if (!safari) {
            return res.status(404).json({
                success: false,
                message: "Safari not found"
            });
        }

        safari = await Safari.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            success: true,
            safari
        })
    } catch (error) {
        return next(error);
    }

})

//Delete Safari - /api/v1/safari/:id
exports.deleteSafari = catchAsyncError(async (req, res, next) => {
    try {
        let safari = await Safari.findById(req.params.id);

        if (!safari) {
            return res.status(404).json({
                success: false,
                message: "Safari not found"
            });
        }

        await Safari.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Safari deleted!"
        })
    } catch (error) {
        return next(error);
    }
})







//getadmin safaris - /api/v1/admin/safaris
exports.getAdminSafaris = catchAsyncError(async (req, res, next) => {
    const safaris = await Safari.find();
    res.status(200).send({
        success: true,
        safaris
    })
});