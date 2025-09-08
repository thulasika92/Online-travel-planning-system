const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, "User ID is required"]
    },
    tours: [
        {
            tourId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Tour',
                required: [true, "Tour ID is required"]
            },
            spotsBooked: {
                type: Number,
                required: [true, "Number of spots is required"]
            },
            tourDate: {
                type: Date,
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

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
