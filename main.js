// npm start [server starter]
// MOST IMPORTANT FILE!!! 
// if edited, submit a pull request  

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
    console.error("MONGO_URI is not set in .env file!");
    process.exit(1);
}

// Database Connection
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {});
        console.log("Connected to the database...");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        setTimeout(connectDB, 5000); // Retry after 5s
    }
};

connectDB();

// Mongoose Connection
const conn = mongoose.connection;

let gfs, gridfsBucket, upload;

// Wrap initialization inside a Promise
const initGridFS = new Promise((resolve, reject) => {
    conn.once("open", () => {
        console.log("Database connected successfully");

        // Initialize GridFSBucket
        gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: "uploads" });
        gfs = gridfsBucket;

        // Initialize GridFsStorage
        const storage = new GridFsStorage({
            db: conn.db,
            file: (req, file) => {
                return new Promise((resolve, reject) => {
                    crypto.randomBytes(16, (err, buf) => {
                        if (err) return reject(err);
                        const filename = buf.toString("hex") + path.extname(file.originalname);
                        resolve({ filename, bucketName: "uploads" });
                    });
                });
            }
        });

        upload = multer({ storage });

        console.log("GridFS storage initialized");
        resolve({ gfs, upload, gridfsBucket }); // Resolve when done
    });

    conn.on("error", (err) => reject(err)); // Reject if there's an error
});

// Export `initGridFS`
module.exports = { initGridFS };

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

// Import routes
// app.use('/yourRoute', require('./routes/yourRoutes')); 
const rr_editRestoProfile = require('./routes/rr_editRestoProfile');
app.use(rr_editRestoProfile);


/*conn.once("open", async () => {
    try {
        await conn.db.collection("Restaurant").insertOne({
            email: "sample@restaurant.com",
            restoName: "Sample Restaurant",
            password: "hashedpassword123",
            phone: "123-456-7890",
            description: "A great place to dine in.",
            location: "123 Main Street, City",
            pfp: "default.jpg"
        });
        console.log("Sample restaurant inserted successfully");
    } catch (err) {
        console.error("Error inserting sample restaurant:", err);
    }
});*/



// Start Server
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});


