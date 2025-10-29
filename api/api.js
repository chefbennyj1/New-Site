//API ENDPOINTS
const express = require("express");
const router = express.Router();
//USER SCHEMA
const UserModel = require('../models/User.js');
//VOLUMES SCHEMA
const VolumeModel = require('../models/Volume.js');
const VolumeManager = require("./../services/VolumeManager.js");

//FILE SYSTEM
const fs = require('fs');

//USER
router.post("/user/register", async (req, res) => {
  const { username, email, password, age } = req.body;

  createUser({ username, email, password, age });

  res.redirect('/login');

})
//GET USER
router.get('/user', async (req, res) => {

  if (!req.session || !req.session.isAuth) {
    return res.status(401).json({ ok: false, message: "Unauthorized" });
  }

  let email = req.session.user.email;
  let user = await UserModel.findOne({ email });
  if(!user) return res.status(401).json({ ok: false });
  // send only safe fields
  res.json({ ok: true, user: user });

});
//UPDATE USER
router.post('/user/update', async (req, res) => {

  const userId = req.session.user.id.toString();
  
  if (!userId) return res.status(404).json({ message: 'User not found' });

  const { email, currentPassword, newPassword } = req.body;
  console.log(userId);

  await updateUser(userId, email, currentPassword, newPassword);

});


//VOLUMES
router.post('/volume/create', async (req, res) => {

  //TODO: alert the ui that an existing volume is there, and a new one was not made.

  const { index, title, volumePath, pages } = req.body;

  try {
    // Create new volume
    await VolumeManager.createVolume({ index, title, volumePath, pages });
    res.redirect('/dashboard'); // browser navigates back to dashboard
  } catch (err) {

  }
   res.redirect('/dashboard'); // browser navigates back to dashboard

});
// e.g. /view/{id}
router.get('/volume/:id', async (req, res) => {

  if (!req.session || !req.session.isAuth) {
    return res.status(401).json({ ok: false, message: "Unauthorized" });
  }

  const id = req.params.id;
  console.log(id);

  if (!id) return res.status(400).json({ ok: false, message: "Missing id" });

  const view = await VolumeModel.findOne({ _id: id });
  if (!view) return res.status(404).json({ ok: false, message: "view not found" });

  res.json({ ok: true, view });

});

//get All Volumes
router.get('/volumes', async (req, res) => {
  // Ensure the user is authenticated
  if (!req.session || !req.session.isAuth) {
    return res.status(401).json({ ok: false, message: "Unauthorized" });
  }

  try {

    // Fetch all volumes (you can sort them by index)
    const volumes = await VolumeModel.find({}).sort({ index: 1 });
    
    res.json({ ok: true, volumes });

  } catch (err) {
    console.error("Error fetching volumes:", err);
    res.status(500).json({ ok: false, message: "Server error" });
  }
});



//METHODS

//USERS
async function createUser({ username, email, password, age }){
  let user = await UserModel.findOne({ email });

  if (user) {
    return res.redirect('/login');
  }

  const hashedPsw = await bcrypt.hash(password, 12);

  user = new UserModel({
    username,
    email,
    password: hashedPsw,
    age
  })

  await user.save();
}

async function updateUser(userId, email, currentPassword, newPassword){
  try {    

    const user = await UserModel.findById(userId);

    console.log(user);

    if (!user) return res.status(404).json({ message: 'User not found' });

    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordMatch) {
      return res.status(403).json({ message: 'Current password is incorrect' });
    }

    if (email !== user.email) {
      const existing = await UserModel.findOne({ email });
      if (existing) {
        return res.status(409).json({ message: 'Email already in use' });
      }
      user.email = email;
    }

    console.log(newPassword);
    if (newPassword && newPassword.length) {

      user.password = await bcrypt.hash(newPassword, 10);
    }

    await user.save();
    res.render('dashboard', { user: user });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating account.' });
  }
}


module.exports = router;