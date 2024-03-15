const express = require('express');
const { signup, login, getUser, logout } = require('../controllers/user_controller.js');
const { verifyToken } = require('../middleware/verifyTokenMiddleware.js')
const { refreshToken } = require('../middleware/refreshTokenMiddleware.js');
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/user", verifyToken, getUser);
router.get('/refresh', refreshToken, verifyToken, getUser);
router.post("/logout", verifyToken, logout);
module.exports = router;