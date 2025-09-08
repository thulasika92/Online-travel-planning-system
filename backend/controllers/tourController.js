const catchAsyncError = require('../middlewares/catchAsyncError');
const Tour = require('../models/tourModel');
const ErrorHandler = require('../utils/errorHandler');
const APIFeatures = require('../utils/apiFeatures');
const mongoose = require('mongoose');

//Get Tours - /api/v1/tours
exports.getTours = catchAsyncError(async (req, res, next) => {
    const resPerPage = 3;

    let buildQuery = () => {
        return new APIFeatures(Tour.find(), req.query).search().filter()
    }

    const filteredToursCount = await buildQuery().query.countDocuments({});
    const totalToursCount = await Tour.countDocuments({});

    let toursCount = totalToursCount;

    if (filteredToursCount != totalToursCount) {
        toursCount = filteredToursCount;
    }

    const tours = await buildQuery().paginate(resPerPage).query;

    res.status(200).json({
        success: true,
        count: toursCount,
        resPerPage,
        tours
    })
})

//Create Tour - /api/v1/tour/new
exports.newTour = catchAsyncError(async (req, res, next) => {
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
            let url = `${process.env.BACKEND_URL}/uploads/tour/${file.originalname}`;
            images.push({ image: url });
        });
    }

    req.body.images = images;

    req.body.user = req.user.id;
    const tour = await Tour.create(req.body);
    res.status(201).json({
        success: true,
        tour
    })
});

//Get Single tour - /api/v1/tour/:id
exports.getSingleTour = catchAsyncError(async (req, res, next) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return next(new ErrorHandler("Invalid Tour ID", 400));
        }

        const tour = await Tour.findById(req.params.id).populate('reviews.user', 'name email');

        if (!tour) {
            return next(new ErrorHandler("Tour not found", 400));
        }

        res.status(200).json({
            success: true,
            tour
        })
    } catch (error) {
        return next(error.message);
    }
})

//Update Tours - /api/v1/tour/:id
exports.updateTours = catchAsyncError(async (req, res, next) => {
    try {
        let tour = await Tour.findById(req.params.id);

        //uploading images
        let images = []


        if (req.body.imagesCleared === "false") {
            images = tour.images
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
                let url = `${process.env.BACKEND_URL}/uploads/tour/${file.originalname}`;
                images.push({ image: url });
            });
        }

        req.body.images = images;

        if (!tour) {
            return res.status(404).json({
                success: false,
                message: "Tour not found"
            });
        }

        tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            success: true,
            tour
        })
    } catch (error) {
        return next(error);
    }

})

//Delete Tour - /api/v1/tour/:id
exports.deleteTour = catchAsyncError(async (req, res, next) => {
    try {
        let tour = await Tour.findById(req.params.id);

        if (!tour) {
            return res.status(404).json({
                success: false,
                message: "Tour not found"
            });
        }

        await Tour.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Tour deleted!"
        })
    } catch (error) {
        return next(error);
    }
})

//Create review -/api/v1/review
exports.createReview = catchAsyncError(async (req, res, next) => {
    const { tourId, rating, comment } = req.body;

    const review = {
        user: req.user.id,
        rating: rating,
        comment: comment
    }

    const tour = await Tour.findById(tourId);
    const isReviewed = tour.reviews.find(review => {
        return review.user.toString() == req.user.id.toString()
    })

    //finding user review exist
    if (isReviewed) {
        tour.reviews.forEach(review => {
            if (review.user.toString() == req.user.id.toString()) {
                review.comment = comment,
                    review.rating = rating
            }
        })
    } else {
        //creating the review
        tour.reviews.push(review);
        tour.numOfReviews = tour.reviews.length;
    }

    //finding the average of product ratings
    tour.ratings = tour.reviews.reduce((acc, review) => {
        return Number(review.rating) + acc;
    }, 0) / tour.reviews.length;

    tour.ratings = isNaN(tour.ratings) ? 0 : tour.ratings;

    await tour.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    })

})

//Get reviews -/api/v1/reviews?id={tourId}
exports.getReviews = catchAsyncError(async (req, res, next) => {
    const tour = await Tour.findById(req.query.id).populate('reviews.user', 'name email');

    res.status(200).json({
        success: true,
        reviews: tour.reviews
    })
})

//Delete reviews - /api/v1/review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
    const tour = await Tour.findById(req.query.tourId);

    //filetring deleted review
    const reviews = tour.reviews.filter(review => {
        return review._id.toString() !== req.query.id.toString()
    });
    //number of reviews update
    const numOfReviews = reviews.length;

    //ratings average 
    let ratings = reviews.reduce((acc, review) => {
        return Number(review.rating) + acc;
    }, 0) / reviews.length

    ratings = isNaN(ratings) ? 0 : ratings;

    await Tour.findByIdAndUpdate(req.query.tourId, {
        reviews,
        numOfReviews,
        ratings
    })

    res.status(200).json({
        success: true
    })
})




//getadmin tours - /api/v1/admin/tours
exports.getAdminTours = catchAsyncError(async (req, res, next) => {
    const tours = await Tour.find();
    res.status(200).send({
        success: true,
        tours
    })
});

