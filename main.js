// npm start [server starter]
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path'); 
const Grid = require('gridfs-stream');
const { GridFsStorage } = require('multer-gridfs-storage');
const multer = require('multer');
const crypto = require('crypto');

// Init Express
const app = express();

// Environment Variables
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI; 
  //fix the URL

// Database Connection
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to the database...');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        setTimeout(connectDB, 5000); // retry after 5s
    }
};  

connectDB();

// Mongoose Connection
const conn = mongoose.connection;
let gfs;

// Init GridFS 
conn.once('open', () => {
    console.log('Database connected successfully');
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

// Set up GridFS Storage
const storage = new GridFsStorage({
    url: MONGO_URI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) return reject(err);
                const filename = buf.toString('hex') + path.extname(file.originalname);
                resolve({ filename, bucketName: 'uploads' });
            });
        });
    }
});
const upload = multer({ storage });

// Export gfs and upload for use in routes
module.exports = { gfs, upload };

// Middlewares
app.use(express.urlencoded({ extended: false })); 
app.use(express.json());                        

app.use(session({
    secret: 'my_secret_key',
    saveUninitialized: true,
    resave: false,
}));

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
// app.use('/yourRoute', require('./routes/yourRoutes')); // Uncomment & modify accordingly

// Start Server
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
