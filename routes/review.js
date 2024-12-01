const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

// View All Reviews
router.get("/", async (req, res) => {
   const reviews = await Review.find();
   res.render("reviews", { reviews });
});

// Create a New Review
router.get("/create", (req, res) => {
   if (!req.session.user) return res.redirect("/login");
   res.render("create_review");
});

router.post("/create", async (req, res) => {
   const review = new Review({ ...req.body, created_by: req.session.user });
   await review.save();
   res.redirect("/reviews");
});

module.exports = router;