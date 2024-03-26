const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required!'],
        minLength: [2, 'Title should be at least 2 characters!']
    },
    image: {
        type: String,
        required: [true, 'ImageUrl is required!'],
        validate: {
            validator(value) {
                return /^https?:\/\//.test(value)
            },
            message:(props) => `This is invalid url for the image!`
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
        maxLength: [30,'The length of category should not exceed 30 characters!'],
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    // comments: [
    //     {
    //         user:{
    //             type: mongoose.Types.ObjectId,
    //             required: true,
    //             ref: 'User',
    //         } ,
    //         message: {
    //             type: String,
    //             required: 'Comment message is required!'
    //         },
    //     }
    // ],
    likes: {
        type: Number,
        default: 0
    }
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;