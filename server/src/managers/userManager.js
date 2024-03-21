const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');
const User = require('../models/User');
const { SECRET } = require('../config/config');


exports.login = async (username, password) => {
    // find user
    const user = await User.findOne({ username });

    if (!user) {
        throw new Error('Invalid user or password!')
    }

    //check password
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Invalid user or password!');
    }
    const token = await generateToken(user);

    return token;


};

exports.register = async (username, email, password, rePassword) => {
    const user = await User.findOne({ email });

    if (user) {
        throw new Error('Username or email already exists!');
    }

    if(password !== rePassword){
        throw new Error('Password do not match!');

    }

    const newUser = new User({
        username,
        email,
        password,
        rePassword
    });

    await User.create(newUser);
    
    const token = await generateToken(newUser);

    return token;
};

async function generateToken(user) {
    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
    };

    const token = await jwt.sign(payload, SECRET, { expiresIn: '3d' });

    return token;

}