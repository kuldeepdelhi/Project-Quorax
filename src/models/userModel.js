const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    fname: { type: String, required: true, trim: true },

    lname: { type: String, required: true, trim: true },

    email: { type: String, required: true, lowercase: true, unique: true, trim: true },

    phone: { type: String, unique: true, trim: true,sparse: true},

    password: { type: String, required: true, trim: true }

}, { timestamps: true })

module.exports = mongoose.model('USER', userSchema);