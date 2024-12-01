const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    title: { type: String, required: true },
    review: { type: String, required: true },
    created_by: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Review", ReviewSchema);