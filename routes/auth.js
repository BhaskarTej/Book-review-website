const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Home Page
router.get("/", (req, res) => {
   res.render("index", { user: req.session.user });
});

// Login
router.get("/login", (req, res) => {
   res.render("login");
});

router.post("/login", async (req, res) => {
   const user = await User.findOne({ username: req.body.username });
   if (user && (await bcrypt.compare(req.body.password, user.password))) {
       req.session.user = user.username;
       return res.redirect("/dashboard");
   }
   res.send("Invalid login credentials.");
});

// Register
router.get("/register", (req, res) => {
   res.render("register");
});

router.post("/register", async (req, res) => {
   try {
       const user = new User(req.body);
       await user.save();
       req.session.user = user.username;
       res.redirect("/dashboard");
   } catch (err) {
       res.send("Error: " + err.message);
   }
});

// Dashboard
router.get("/dashboard", (req, res) => {
   if (!req.session.user) return res.redirect("/login");
   res.render("dashboard", { user: req.session.user });
});

// Logout
router.get("/logout", (req, res) => {
   req.session.destroy();
   res.redirect("/");
});

module.exports = router;