// npm start [server starter]
// MOST IMPORTANT FILE!!! 
// if edited, submit a pull request  
// if your changes in main crashes the server, dont commit

require("dotenv").config();
require('events').EventEmitter.defaultMaxListeners = 15;

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");
const multer = require("multer");
const Restaurant = require('./model/restaurant'); 

// Init Express     
const app = express();

// Environment Variables
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

// Ensure MongoDB URI is set
if (!MONGO_URI) {
    console.error("ERROR: MONGO_URI is not set in .env file!");
    process.exit(1);
}

// Database Connection
mongoose.connect(MONGO_URI)
    .then(() => console.log("Connected to the database..."))
    .catch((err) => {
        console.error("MongoDB connection error:", err);
        process.exit(1); 
    });

// Multer Setup (No GridFS)
const storage = multer.memoryStorage();  // Use memory storage to store files in memory as buffers
const upload = multer({ storage });

module.exports = { upload };

// Middlewares
app.use(express.urlencoded({ extended: true }));  // Body parsing
app.use(express.json());                          // JSON handling

app.use(
    session({
        secret: "my_secret_key",
        saveUninitialized: true,
        resave: false
    })
);

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    next();
  });
  

// Set template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));
app.use(express.static(path.join(__dirname, "public")));

//pfp 
const Customer = require('./model/customer'); // Make sure this is required

app.get('/profile-pics/:id', async (req, res) => {
  const id = req.params.id;
  console.log('Fetching profile pic for ID:', id);

  try {
    // Check customer first
    let user = await Customer.findOne({ email: id });

    // If not found in customers, check restaurants
    if (!user) {
      user = await Restaurant.findById(id);
    }

    if (!user || !user.pfp || !user.pfp.data) {
      return res.status(404).send('No profile picture found');
    }

    res.set('Content-Type', user.pfp.contentType);
    res.send(user.pfp.data);
  } catch (err) {
    console.error('Error fetching profile pic:', err);
    res.status(500).send(err.message);
  }
});



// Import routes
const rr_editRestoProfile = require('./routes/rr_editRestoProfile');
app.use('/restaurant', rr_editRestoProfile);

const r_editCustomerProfile = require('./routes/r_editCustomerProfile');
app.use('/customer', r_editCustomerProfile);

const rr_sideBar = require("./routes/rr_sideBar");
app.use("/restaurant", rr_sideBar); 

const r_customerProfile = require('./routes/r_customerProfile');
app.use('/', r_customerProfile);

const r_editReview = require('./routes/r_editReview');
app.use('/', r_editReview);

const r_customerProfile_public = require('./routes/r_customerProfile_public');
app.use('/', r_customerProfile_public);

const r_getRestoReviews = require("./routes/r_getRestoReviews");
app.use("/", r_getRestoReviews); 

const r_login = require("./routes/r_login");
app.use("/", r_login);

const r_search_username = require("./routes/r_search_username");
app.use("/", r_search_username);

const r_homepage = require('./routes/r_getRestos');
app.use('/', r_homepage);

const r_SuLi = require('./routes/r_suli');
app.use('/', r_SuLi);

const r_accounttype_creation = require('./routes/r_accounttype_creation');
app.use('/',r_accounttype_creation);

const r_replyResto = require('./routes/r_replyResto'); 
app.use('/', r_replyResto); 

const r_deleteReply = require("./routes/r_deleteReply");
app.use(r_deleteReply);

const r_editReply = require("./routes/rr_editReply");
app.use("/", r_editReply);

const r_customer_homeFeed  = require("./routes/r_customer_homeFeed");
app.use("/", r_customer_homeFeed);

const rr_restoSignup = require("./routes/rr_restoSignup");
app.use("/restoSignup", rr_restoSignup);

const r_customerPOV_restoProfile = require("./routes/r_customerPOV_restoProfile");
app.use("/", r_customerPOV_restoProfile);

//miguel  added
const r_adminSearch = require("./routes/r_adminsearch");
app.use("/", r_adminSearch);

const r_adminRoutes = require("./routes/r_adminRoutes");
app.use("/", r_adminRoutes);

const imageRoutes = require('./routes/r_imageRoutes');
app.use('/images', imageRoutes); 

const r_adminSettings = require("./routes/r_adminSettings");
app.use("/", r_adminSettings);
const adminReportsRoute = require('./routes/ra_adminReportsTable');
app.use(adminReportsRoute);

const r_write_reviews = require("./routes/r_write_reviews");
app.use("/",r_write_reviews);

const customerSignupRoute = require("./routes/rr_custoSignup");
app.use("/", customerSignupRoute);

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});


// const bcrypt = require("bcrypt");
// const Admin = require("./model/admin");

// async function resetAllAdminPasswords() {
//   try {
//     const newPassword = "admin123"; // ← Change this as needed
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     const result = await Admin.updateMany({}, { password: hashedPassword });
//     console.log(`✅ Updated ${result.modifiedCount} admin password(s).`);
//   } catch (err) {
//     console.error("❌ Error resetting passwords:", err);
//   }
// }

// // Run it once
// resetAllAdminPasswords();
