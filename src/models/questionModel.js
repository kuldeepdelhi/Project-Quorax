const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({

    description: { type: String, required: true, trim: true },

    tag: [String],

    askedBy:{ type: mongoose.Schema.Types.ObjectId, ref: 'USER' },

    deletedAt: Date,

    isDeleted: { type: Boolean, default: false },
    
}, { timestamps: true })

module.exports = mongoose.model('question', questionSchema)