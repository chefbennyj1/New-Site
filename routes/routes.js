const express = require("express");

const router = express.Router();

//USER SCHEMA
const UserModel = require('../models/User.js');

const isAuth = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    res.redirect('/login');
  }
}

//LANDING PAGE
router.get("/", (req, res) => {
  
  console.log(req.session);
  console.log(req.session.id);

  res.render("landingPage");
})

//DASHBOARD
router.get('/dashboard', isAuth, async (req, res) => {
  let user;
  try {

    user = await UserModel.findById(req.session._id);

  } catch(err) { 

    res.redirect('/login');

  }
  
  res.render('dashboard', { user: user });
})

//LOGIN PAGE
router.get('/login', (req, res) => {
  res.render("login");
})



module.exports = router;
