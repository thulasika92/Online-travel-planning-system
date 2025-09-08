const mongoose = require('mongoose');

const safariBookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, "User ID is required"]
    },
    safaris: [
        {
            safariId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Safari',
                required: [true, "Safari ID is required"]
            },
            safariDate: {
                type: Date,
                required: true,
            },
            safariTime: {
                type: Number,
                required: true,
            }
        }
    ],
    totalAmount: {
        type: String,
        required: [true, "Total amount is required"]
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Verified', 'Denied'],
        default: 'Pending'
    },
    status: {
        type: String,
        enum: ['Confirmed', 'Cancelled', 'Pending'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    contactDetails: {
        phoneNumber: {
            type: String,
            required: [true, "Phone number is required"]
        }
    },
    // Adding payment slip image
    paymentSlip: {
        type: String, // This will store the URL or path of the image
        required: [true, "Payment slip image is required"]
    }
});

const SafariBooking = mongoose.model('SafariBooking', safariBookingSchema);
module.exports = SafariBooking;
