const { json } = require('express');
const catchAsyncError = require('../middlewares/catchAsyncError')
const Booking = require('../models/bookingModel');
const Tour = require('../models/tourModel');
const ErrorHandler = require('../utils/errorHandler');

// Create new booking - /api/v1/booking/new
exports.newBooking = catchAsyncError(async (req, res, next) => {
    const { user, tours, totalAmount, phoneNumber, tourDate } = req.body;

    // Validate user
    if (!user) {
        return next(new ErrorHandler('User ID is required', 400));
    }

    if (isNaN(totalAmount) || totalAmount < 0) {
        return next(new ErrorHandler('Total amount must be a valid positive number', 400));
    }

    // Parse and validate tours
    const parsedTours = typeof tours === 'string' ? JSON.parse(tours) : tours;
    if (!Array.isArray(parsedTours) || parsedTours.length === 0) {
        return next(new ErrorHandler('At least one tour is required', 400));
    }

    const validatedTours = parsedTours.map(tour => {
        if (!tour.tourId || !tour.spotsBooked || !tour.tourDate || typeof tour.spotsBooked !== 'number') {
            throw new ErrorHandler('Each tour must have a valid tourId, spotsBooked and tourDate value', 400);
        }
        return {
            tourId: tour.tourId,
            spotsBooked: tour.spotsBooked,
            tourDate: new Date(tour.tourDate),
        };
    });



    // Validate total amount
    if (!totalAmount) {
        return next(new ErrorHandler('Total amount is required', 400));
    }

    // Validate phone number
    if (!phoneNumber) {
        return next(new ErrorHandler('Phone number is required', 400));
    }

    if (!req.file) {
        return next(new ErrorHandler('Payment slip is required', 400));
    }

    // Convert file path
    const paymentSlip = `${process.env.BACKEND_URL}/uploads/payment/${req.file.originalname}`;


    // Create booking
    const booking = await Booking.create({
        user,
        tours: validatedTours,
        tourDate: new Date(tourDate),
        totalAmount,
        contactDetails: { phoneNumber },
        paymentSlip
    });



    res.status(201).json({
        success: true,
        message: 'Booking created successfully',
        booking
    });
});


// Get single booking - /api/v1/booking/:id
exports.getSingleBooking = catchAsyncError(async (req, res, next) => {
    const booking = await Booking.findById(req.params.id)
        .populate({
            path: 'user',
            select: 'name email'  // Optionally include user details
        })
        .populate({
            path: 'tours.tourId',
            select: 'name price category images description'  // Added description for more info
        });

    if (!booking) {
        return next(new ErrorHandler(`Booking not found with id: ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        booking
    });
});

// Get logged-in user bookings - /api/v1/mybookings
exports.myBookings = catchAsyncError(async (req, res, next) => {
    const bookings = await Booking.find({ user: req.user.id })
        .populate('tours.tourId', 'name price category');

    res.status(200).json({
        success: true,
        bookings
    });
});

// Admin: Get all bookings - /api/v1/admin/bookings
exports.bookings = catchAsyncError(async (req, res, next) => {
    const bookings = await Booking.find()
        .populate('user', 'name email')
        .populate('tours.tourId', 'name price category');

    let totalAmount = 0;

    bookings.forEach(booking => {
        totalAmount += Number(booking.totalAmount);
    });

    res.status(200).json({
        success: true,
        totalAmount,
        bookings
    });
});

// Admin: Update Booking/ Booking status - /api/v1/admin/booking/:id
exports.updateBooking = catchAsyncError(async (req, res, next) => {
    const booking = await Booking.findById(req.params.id);

    if (booking.status === 'Confirmed') {
        return next(new ErrorHandler('Booking has already been confirmed', 400));
    }
    if (booking.status === 'Cancelled') {
        return next(new ErrorHandler('Booking has already been cancelled', 400));
    }

    if (req.body.status === 'Confirmed' && booking.paymentStatus !== 'Verified') {
        return next(new ErrorHandler('Cannot confirm booking unless payment is verified', 400));
    }

    // Update the booking status
    if (req.body.status) {
        booking.status = req.body.status;
    }

    if (req.body.paymentStatus) {
        booking.paymentStatus = req.body.paymentStatus;
    }
    booking.updatedAt = Date.now();

    await booking.save();

    res.status(200).json({
        success: true
    });
});

// Admin: Delete Booking - /api/v1/admin/booking/:id
exports.deleteBooking = catchAsyncError(async (req, res, next) => {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
        return next(new ErrorHandler(`Booking not found with the id: ${req.params.id}`, 400));
    }

    // Deleting the booking
    await Booking.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: "Booking deleted successfully."
    });
});





