const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const bodyParser = require("body-parser");
const connectDB = require("./db");
const flash = require("connect-flash");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Session Middleware
app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: "mongodb://localhost:27017/book_review_website",
        }),
        cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
    })
);

// Flash Middleware
app.use(flash());

// Make flash messages available globally
app.use((req, res, next) => {
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    res.locals.user = req.session.user || null; // Pass user data to all views
    next();
});

// Routes
app.use("/", require("./routes/auth"));
app.use("/reviews", require("./routes/review"));

// Start Server
app.listen(3000, () => {
    console.log("Server started on http://localhost:3000");
});