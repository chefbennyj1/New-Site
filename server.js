const express = require('express'); //server
const bcrypt = require('bcryptjs'); //password encryption
const path = require('path'); //files paths
const session = require('express-session'); //current session data
const MongoDbSession = require('connect-mongodb-session')(session); //DB
const mongoose = require('mongoose'); //DB interface
const fs = require('fs'); //file system
const mime = require('mime-types'); //ensure proper mime types
const sharp = require('sharp'); //image editing

const app = express();

const UserModel = require('./models/User.js');
const mongoDbURI = 'mongodb://localhost:27017/VeilSite';


const siteRoutes = require("./routes/routes.js");
const authRoutes = require("./authentication/authentication.js");
const apiRoutes = require("./api/api.js");



mongoose.connect(mongoDbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then((res) => {
  console.log('mongoDb Connected');
})

const store = new MongoDbSession({
  uri: mongoDbURI,
  collection: 'VeilSessions'
})

//set up sessions
app.use(session({
  secret: "key to sign the cookie",
  resave: false,
  saveUninitialized: false,
  store: store
}))

// Set up views
app.set("views", path.join(__dirname, "views"));
//we will use .ejs files
app.engine("html", require("ejs").renderFile);
//app.set("view engine", "html");
app.set("view engine", "ejs");

//Use THREEJS
app.use('/three', express.static(path.join(__dirname, 'node_modules/three/build')));
app.use('/three_jsm', express.static(path.join(__dirname, 'node_modules/three/examples/jsm')));

//views HTML file
app.use('/views', express.static(path.join(__dirname, 'views')));

//partials
app.use('/views/partials', express.static(path.join(__dirname, 'views/partials')));

//javascript modules
app.use('/scripts', express.static(path.join(__dirname, 'views/public/scripts')));


app.use(express.urlencoded({ extended: true }));




// handle serving and caching images
app.get('/images/volumes/*path', async (req, res) => {
  //req.params return an array of folder and file ['volume-1", "file.png"]
  //we have to join them togethe rot create a path;
  let imagePath = req.params.path.join('/');
  try {
    // Full file path, e.g. "volume-1/images/character.png"
    const filePath = path.join(__dirname, 'views/partials/', imagePath);

    // Ensure the file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).send('Image not found');
    }
    
    // Parse resize width if provided
    const resizeWidth = parseInt(req.query.resize, 10);
    const type = mime.lookup(filePath) || 'image/png';

    res.type(type);

    // If resize is requested
    if (resizeWidth && !isNaN(resizeWidth)) {
      const cacheDir = path.join(__dirname, 'cache');
      if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir);

      const cacheFile = path.join(cacheDir, `${resizeWidth}_${path.basename(filePath)}`);

      // Check cache first
      if (fs.existsSync(cacheFile)) {
        return res.sendFile(cacheFile);
      }

      // Resize and save to cache
      await sharp(filePath)
        .resize({ width: resizeWidth })
        .toFile(cacheFile);

      return res.sendFile(cacheFile);
    }

    // No resize — send original
    res.sendFile(filePath);

  } catch (err) {
    console.error('Error serving image:', err);
    res.status(500).send('Internal Server Error');
  }
});


// Serve images from public with correct MIME type
app.get("/images/public/:file", (req, res) => {
  const filePath = path.join(__dirname, "views/public/images", req.params.file);
  res.type("image/png");   // <-- forces correct MIME type
  res.sendFile(filePath);
});

// Serve public videos with correct MIME type
app.get("/videos/public/:file", (req, res) => {
  const filePath = path.join(__dirname, "views/public/videos", req.params.file);
  res.type("video/mp4");   // <-- forces correct MIME type
  res.sendFile(filePath);
});

app.get("/viewer", (req, res) => {
   if (!req.session.isAuth) {
     res.redirect('/login');
  } 
  console.log(req.params);
  res.render('viewer', req.params)
})

// Serve static files (CSS, JS, images) from "public"
app.use(express.static(path.join(__dirname, "views/public")));

const isAuth = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    res.redirect('/login');
  }
}

app.use(async (req, res, next) => {
  if (req.session.userId) {
    res.locals.user = await User.findById(req.session.userId);
  } else {
    res.locals.user = null;
  }
  next();
});


//app.use(express.json());
app.use("/", siteRoutes);
app.use("/authentication", authRoutes);
app.use("/api", apiRoutes);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Website running on http://localhost:${PORT}`);
});
