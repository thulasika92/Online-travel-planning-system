const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, "Please enter place name"],
        trim: true,
        maxlength: [100, "Product name cannot exceed 100 characters"]
    },
    price:{
        type: Number,
        default: 0.0,
    },
    description: {
        type: String,
        required: [true, "Please enter place description"]
    },
    ratings:{
        type: String,
        default: 0
    },
    images:[
        {
            image:{
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, "Please enter place category"],
        enum: {
            values: [
                'Historical',
                'Adventure',
                'Nature',
                'Cultural',
                'Beach',
                'Mountain',
                'Wildlife',
                'City Tour',
                'Heritage',
                'Religious',
                'Eco-Tourism',
                'Cruise'
            ],
            message: "Please select a valid place category"
        }
    },
    availableSpots: {
        type: Number,
        required: [true, "Please enter available spots for the tour"],
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },
            rating:{
                type:String,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

let schema = mongoose.model('Tour', tourSchema)

module.exports = schema;