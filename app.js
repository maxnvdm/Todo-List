var express = require('express');
var apiRoutes = require('./routes/api');
var mongoose = require('mongoose');
var todoController = require('./controllers/todoController');

var app = express();

// connect to the database
mongoose.connect('mongodb+srv://test:test@todo-kofr6.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Connected');
});

// set up template engine
app.set('view engine', 'ejs');

// static files
app.use(express.static('./public'));

// fire controllers for front-end
todoController(app);

// initialize routes for api
app.use('/api', apiRoutes);

// listen to port
app.listen(process.env.PORT || 3000);
console.log('Listening to port 3000');