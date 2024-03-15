const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;


function refreshToken(req, res, next) {
    const cookies = req.headers.cookie;
    const prevToken = cookies.split('=')[1];
    if (!prevToken) {
        return res.status(400).json({ message: "Couldn't find token" });
    }
    jwt.verify(String(prevToken), JWT_SECRET_KEY, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(403).json({ message: 'Authentication failed' });
        }
        res.clearCookie(`${user.id}`);
        req.cookies[`$(user.id)`] = "";

        const token = jwt.sign({ id: user.id }, JWT_SECRET_KEY, {
            expiresIn: "35s"
        });

        console.log("Regenerated Token\n", token);
        res.cookie(String(user.id), token, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 30),
            httpOnly: true,
            sameSite: "lax",
        });
        req.id = user.id;
        next();
    })
}

exports.refreshToken = refreshToken;