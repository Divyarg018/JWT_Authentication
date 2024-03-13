const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

function verifyToken(req, res, next) {
    const headers = req.headers[`authorization`];
    const token = headers.split(" ")[1];
    if (!token) {
        res.status(404).json({ message: "No token found" })
    }
    jwt.verify(String(token), JWT_SECRET_KEY, function (err, user) {
        if (err) {
            return res.status(400).json({ message: "Invalid Token" });
        }
        console.log(user.id);
        req.id = user.id;
    });
    next();
};

exports.verifyToken = verifyToken;