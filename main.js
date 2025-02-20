//npm start [server starter]

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const adminRoutes = require('./routes/adminRoutes');
const customerRoutes = require('./routes/customerRoutes');
const restoRoutes = require('./routes/restaurantRoutes');

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
      setTimeout(connectDB, 5000); //retry: 5s interval
    }
  };  

connectDB();

//middlewares
app.use(express.urlencoded({extended: false})); // used to parse URL-encoded data.  request body will only accept key-value pairs
app.use(express.json());                        // parses JSON data from incoming requests.

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
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Route prefixes
app.use('/admin', adminRoutes);
app.use('/customer', customerRoutes);
app.use('/resto', restoRoutes);

app.get('/', (req, res) => {
  res.render('landingPage'); // Renders landingPage.ejs from the /views folder
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
