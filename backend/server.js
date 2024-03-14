const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require("./routes/user_routes.js");
const cookieParser = require("cookie-parser");

require('dotenv').config();
const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;


mongoose.connect(`mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.hubtpxn.mongodb.net/jwt_aa?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => app.listen(5000))
    .then(() => console.log("Database is connected! Listening to localhost 5000"))
    .catch((err) => console.log(err));


const app = express();
app.use(cookieParser());

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());

app.use('/api', router);



// k19F8kCpZphoDijn - mongodb password