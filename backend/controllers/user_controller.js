const User = require('../model/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

module.exports.signup = async function (req, res, next) {
    const { name, email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error while verifying user" });
    }
    if (existingUser) {
        return res.status(400).json({ message: "User already exists! Login Instead" })
    }
    const hashedPassword = bcrypt.hashSync(password);
    const user = new User({
        name: name,
        email: email,
        password: hashedPassword,
    });

    try {
        await user.save();
    }
    catch (err) {
        return res.status(501).json({ message: "Internal server while inserting the user" });
    }
    return res.status(201).json({ message: user })
}

module.exports.login = async function (req, res, next) {
    const { email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error for old user" });
    }
    if (!existingUser) {
        return res.status(400).json({ message: "User not found. Invalid Email" })
    }
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'Invalid Password' })
    }
    const token = jwt.sign({ id: existingUser._id }, JWT_SECRET_KEY, {
        expiresIn: "30s"
    });

    res.cookie(String(existingUser._id), token, {
        path: '/',
        expires: new Date(Date.now() + 1000 * 30),
        httpOnly: true,
        sameSite: 'lax'
    })

    return res.status(200).json({ message: 'Successfully Logged In', user: existingUser, token })
};




module.exports.getUser = async function (req, res) {
    const userId = req.id;
    let user;
    try {
        user = await User.findById(userId, "-password");
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error while inserting user id" })
    }
    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }
    return res.status(200).json({ user })
}





