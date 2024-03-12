const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require("./routes/user_routes.js");

const app = express();

app.use('/api', router);

mongoose.connect("mongodb+srv://admin:k19F8kCpZphoDijn@cluster0.hubtpxn.mongodb.net/jwt_aa?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        app.listen(5000);
        console.log("Database is connected! Listening to localhost 5000");
    })
    .catch((err) => console.log(err));

app.use(cors());
app.use(express.json);







// k19F8kCpZphoDijn - mongodb password