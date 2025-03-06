// npm start [server starter]
// MOST IMPORTANT FILE!!! 
// if edited, submit a pull request  
// if your changes in main crashes the server, dont commit

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");
const { GridFsStorage } = require("multer-gridfs-storage");
const multer = require("multer");
const crypto = require("crypto");

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

// Mongoose Connection
const conn = mongoose.connection;

let gfs, gridfsBucket, upload;

// Initialize GridFS **Before Exporting Anything**
const initGridFS = new Promise((resolve, reject) => {
    conn.once("open", () => {
        console.log("Database connected successfully");

        // Initialize GridFSBucket
        gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: "uploads" });
        gfs = gridfsBucket;

        // Initialize GridFsStorage
        const storage = new GridFsStorage({
            url: MONGO_URI,
            file: (req, file) => {
                return new Promise((resolve, reject) => {
                    crypto.randomBytes(16, (err, buf) => {
                        if (err) {
                            console.error("Error generating filename:", err);
                            return reject(err);
                        }
                        const filename = buf.toString("hex") + path.extname(file.originalname);
                        resolve({
                            filename,
                            bucketName: "uploads",
                            metadata: { uploadedAt: new Date() } 
                        });
                    });
                });
            }
        });
        

        storage.on("connection", () => console.log("GridFS storage initialized"));
        storage.on("error", (err) => console.error("GridFS Storage Error:", err));

        upload = multer({ storage });

        resolve({ gfs, upload, gridfsBucket });
    });

    conn.on("error", (err) => reject(err));
});

// Export `initGridFS`
module.exports = { initGridFS };

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

// Set template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));
app.use(express.static(path.join(__dirname, "public")));

// Ensure GridFS is initialized **before** routes are registered
initGridFS.then(({ upload }) => {
    app.locals.upload = upload;
    module.exports = { initGridFS, upload }; 

// Import routes
const rr_editRestoProfile = require('./routes/rr_editRestoProfile');
app.use('/restaurant', rr_editRestoProfile);

const rr_sideBar = require("./routes/rr_sideBar");
app.use("/restaurant", rr_sideBar); 

const r_getRestoReviews = require("./routes/r_getRestoReviews");
app.use("/", r_getRestoReviews); 

const r_login = require("./routes/r_login");
app.use("/", r_login);

const r_homepage = require('./routes/r_getRestos');
app.use('/', r_homepage);

const r_SuLi = require('./routes/r_suli');
app.use('/', r_SuLi);

const r_accounttype_creation = require('./routes/r_accounttype_creation');
app.use('/',r_accounttype_creation);

const replyRoutes = require("./routes/r_deleteReply");
app.use(replyRoutes);

// Start Server **after GridFS is Ready**     
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
}).catch(err => {
    console.error("Error initializing GridFS:", err);
});

