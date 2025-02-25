//npm start [server starter]
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path'); 
//const routes...

const app = express();

//env
const PORT = process.env.PORT || 4000; //PORT 4000 as backup when PORT 3000 fails

//database connection
const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
      console.log('Connected to the database...');
      const db = mongoose.connection;
      db.on('error', console.error.bind(console, 'Connection error:'));
      db.once('open', () => {
        console.log('Database connected successfully');
      });
    } catch (err) {
      console.error('MongoDB connection error:', err);
      setTimeout(connectDB, 5000); 
    }
  };  

connectDB();

//middlewares
app.use(express.urlencoded({extended: false})); 
app.use(express.json());                        

app.use(session({
    secret: 'my_secret_key',
    saveUninitialized: true,
    resave: false,
    })
);

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
  }
);

//set template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));
app.use(express.static(path.join(__dirname, "public")));

// Route prefixes

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});


