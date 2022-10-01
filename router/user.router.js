const express = require("express");
const User = require("../model/user.mode");
const bcrypt = require("bcrypt");
const passport = require("passport");
const router = express.Router();

require("../config/passport");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/profile", (req, res) => {
  res.json({
    message: "profile",
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successMessage: "success",
    failureRedirect: "/login",
    successRedirect: "/",
  })
);

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const newuser = new User({
    username: username,
    email: email,
    password: hashPassword,
  });
  try {
    const checkAlreayExit = await User.find({ email: email });
    if (checkAlreayExit.length === 0) {
      await newuser.save();
      res.redirect("/login");
    } else {
      res.send("user alreay exit");
    }
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
