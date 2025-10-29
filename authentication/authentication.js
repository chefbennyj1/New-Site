const express = require("express");
const bcrypt = require('bcryptjs');
const rateLimit = require('express-rate-limit');

const router = express.Router();

//USER SCHEMA
const UserModel = require('../models/User.js');

// Create a limiter for the login route
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login requests per 15 minutes
  message: 'Too many login attempts from this IP, please try again after 15 minutes'
});

//LOGIN THE USER
router.post('/login', loginLimiter, async (req, res) => {

  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.redirect('/login');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.redirect('/login');
  }


  req.session.isAuth = true;
  req.session.user = {
    id: user._id,
    name: user.username,
    email: user.email
  };
  console.log(user.name)
  res.redirect('/dashboard');

})



//LOGOUT
//log out, destroy cookie
router.post("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err);
      return res.redirect("/"); // fallback if error
    }
    res.clearCookie("connect.sid"); // clear session cookie
    res.redirect("/"); // send user back to login page
  });
});

module.exports = router;