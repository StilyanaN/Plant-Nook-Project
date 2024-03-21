const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [2, 'Name should be at least 2 characters!']
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
    location: {
        type: String,
        required: [true, 'Location is required!'],
        minLength: [5,'The length of location it should be at least 5 characters!'],
        maxLength: [50,'The length of location should not exceed 50 characters!'],
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    comments: [
        {
            user:{
                type: mongoose.Types.ObjectId,
                required: true,
                ref: 'User',
            } ,
            message: {
                type: String,
                required: 'Comment message is required!'
            },
        }
    ]
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;