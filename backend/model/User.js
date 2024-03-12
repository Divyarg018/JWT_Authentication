const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        reuired: true
    },
    email: {
        type: String,
        reuired: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
});

module.exports = mongoose.model('User', userSchema);