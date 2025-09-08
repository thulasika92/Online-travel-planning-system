const mongoose = require('mongoose');

const safariSchema = new mongoose.Schema({
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
    vehicleType: {
        type: String,
        required: [true, "Please enter place vehicle type"],
        enum: {
            values: [
                'Hiking',
                'Jeep',
                'Bus',
                'Boat',
                'Bike'
            ],
            message: "Please select a valid place vehicle type"
        }
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

let schema = mongoose.model('Safari', safariSchema)

module.exports = schema;