const mongoose = require('mongoose');
const validator = require('validator');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required!'],
        minLength: [2, 'Title should be at least 2 characters!']
    },
    image: {
            type: String,
            required: [true, 'Image is required'],
           validate: {
            validator(value) {
                return /^https?:\/\//.test(value)
            },
            message: (props) => `This is invalid url for the image!`
        }
    },
    
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [5,'The length of discription it should be at least 5 characters!'],
        maxLength: [50,'The length of discription should not exceed 50 characters!'],
    },
    category: {
        type: String,
        required: [true, 'Category is required!'],
        minLength: [3,'The length of category it should be at least 3 characters!'],
        maxLength: [30,'The length of category should not exceed 30 characters!'],
    },
   
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    likesCount: {
        type: Number,
        default: 0
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Post', postSchema);
