const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, 'Username is required!'],
        unique: true,
        minLength: [2, 'Username shoul be at least 2 characters!'],
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minLength: [5, 'Password should be at least 5 characters!']
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        lowercase: true,
        unique: true,
        validate: {
            validator(value) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                .test(value)
            },
            message:(props) => `${props.value} is not a valid email address!`
        },
        minLength: [10, 'Email should be at least 10 characters'],
    },
});

userSchema.virtual('repeatPassword')
    .set(function (value) {
        if (this.password !== value) {
            throw new Error('Password missmatch!')
        }
    });

userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;

});

const User = mongoose.model('User', userSchema);

module.exports = User;