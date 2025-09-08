const { json } = require('express');
const catchAsyncError = require('../middlewares/catchAsyncError')
const SafariBooking = require('../models/safariBookingModel');
const Safari = require('../models/safariModel');
const ErrorHandler = require('../utils/errorHandler');

// Create new booking - /api/v1/safariBooking/new
exports.newSafariBooking = catchAsyncError(async (req, res, next) => {
    const { user, safaris, totalAmount, phoneNumber, safariDate } = req.body;

    // Validate user
    if (!user) {
        return next(new ErrorHandler('User ID is required', 400));
    }

    if (isNaN(totalAmount) || totalAmount < 0) {
        return next(new ErrorHandler('Total amount must be a valid positive number', 400));
    }

    // Parse and validate tours
    const parsedSafaris = typeof safaris === 'string' ? JSON.parse(safaris) : safaris;
    if (!Array.isArray(parsedSafaris) || parsedSafaris.length === 0) {
        return next(new ErrorHandler('At least one safari is required', 400));
    }

    const validatedSafaris = parsedSafaris.map(safari => {
        if (!safari.safariId || !safari.safariDate || !safari.safariTime) {
            throw new ErrorHandler('Each safari must have a valid safariId, safariDate and safariTime', 400);
        }
        return {
            safariId: safari.safariId,
            safariDate: new Date(safari.safariDate),
            safariTime: safari.safariTime
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
    const safariBooking = await SafariBooking.create({
        user,
        safaris: validatedSafaris,
        totalAmount,
        contactDetails: { phoneNumber },
        paymentSlip
    });

    

    res.status(201).json({
        success: true,
        message: 'Safari Booking created successfully',
        safariBooking
    });
});


// Get single booking - /api/v1/safariBooking/:id
exports.getSingleSafariBooking = catchAsyncError(async (req, res, next) => {
    const safariBooking = await SafariBooking.findById(req.params.id)
        .populate({
            path: 'user',
            select: 'name email'  // Optionally include user details
        })
        .populate({
            path: 'safaris.safariId',
            select: 'name price vehicleType images description'  // Added description for more info
        });

    if (!safariBooking) {
        return next(new ErrorHandler(`Booking not found with id: ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        safariBooking
    });
});

// Get logged-in user bookings - /api/v1/mybookings
exports.mySafariBookings = catchAsyncError(async (req, res, next) => {
    const safariBookings = await SafariBooking.find({ user: req.user.id })
        .populate('safaris.safariId', 'name price vehicleType');

    res.status(200).json({
        success: true,
        safariBookings
    });
});


// Admin: Get all bookings - /api/v1/admin/safariBookings
exports.safariBookings = catchAsyncError(async (req, res, next) => {
    const safariBookings = await SafariBooking.find()
        .populate('user', 'name email')
        .populate('safaris.safariId', 'name price category');

    let totalAmount = 0;

    safariBookings.forEach(booking => {
        totalAmount += Number(booking.totalAmount);
    });

    res.status(200).json({
        success: true,
        totalAmount,
        safariBookings
    });
});


// Admin: Update Booking/ Booking status - /api/v1/admin/booking/:id
exports.updateSafariBooking = catchAsyncError(async (req, res, next) => {
    const safariBookings = await SafariBooking.findById(req.params.id);

    if (safariBookings.status === 'Confirmed') {
        return next(new ErrorHandler('Booking has already been confirmed', 400));
    }
    if (safariBookings.status === 'Cancelled') {
        return next(new ErrorHandler('Booking has already been cancelled', 400));
    }

    if (req.body.status === 'Confirmed' && safariBookings.paymentStatus !== 'Verified') {
        return next(new ErrorHandler('Cannot confirm booking unless payment is verified', 400));
    }

    if(req.body.status){
        safariBookings.status = req.body.status;
    }

    if(req.body.paymentStatus){
        safariBookings.paymentStatus = req.body.paymentStatus;
    }

    safariBookings.updatedAt = Date.now();

    await safariBookings.save();

    res.status(200).json({
        success: true
    });
});

// Admin: Delete Booking - /api/v1/admin/booking/:id
exports.deleteSafariBooking = catchAsyncError(async (req, res, next) => {
    const safariBooking = await SafariBooking.findById(req.params.id);

    if (!safariBooking) {
        return next(new ErrorHandler(`Booking not found with the id: ${req.params.id}`, 400));
    }

    // Deleting the booking
    await SafariBooking.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: "Booking deleted successfully."
    });
});
