const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require("./routes/user_routes.js");

mongoose.connect("mongodb+srv://admin:k19F8kCpZphoDijn@cluster0.hubtpxn.mongodb.net/jwt_aa?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => app.listen(5000))
    .then(() => console.log("Database is connected! Listening to localhost 5000"))
    .catch((err) => console.log(err));


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', router);



// k19F8kCpZphoDijn - mongodb password