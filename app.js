var express = require('express');
var apiRoutes = require('./routes/api');
var mongoose = require('mongoose');
var todoController = require('./controllers/todoController');
var authRoutes = require('./routes/auth');
var passportSetup = require('./config/passport-setup');
var keys = require('./config/keys');
var cookieSession = require('cookie-session');
var passport = require('passport');
var profileRoutes = require('./routes/profile');
var app = express();

// connect to the database
mongoose.connect(keys.mongodb.dbURI, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Connected');
});

// set up template engine
app.set('view engine', 'ejs');

app.use(cookieSession({
  maxAge: 24*60*60*1000,
  keys: [keys.session.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

// static files
app.use(express.static('./public'));

// fire controllers for front-end
todoController(app);

// initialize routes for authentication
app.use('/auth', authRoutes);

// initialize routes for profile pages
app.use('/profile', profileRoutes);

// initialize routes for api
app.use('/api', apiRoutes);

// listen to port
app.listen(process.env.PORT || 3000);
console.log('Listening to port 3000');