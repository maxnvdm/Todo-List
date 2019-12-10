var bodyParser = require('body-parser');
var Todo = require('../models/item');
var urlencodedParser = bodyParser.urlencoded({extended: false});

// handle normal web-browser interactions for the todo app
module.exports = function(app){
    
    app.get('/', (req, res) =>{
        res.render('home');
    });


    // return the main page of the todo list, populated with entries form the database
    app.get('/todo', function(req, res){
        // get data from mongodb and pass it to the view
        Todo.find({}, function(err, data){
            if (err) throw err;
            res.render('todo', {todos: data});
        });
    });

    // add a new item to the todo list through the text input form
    app.post('/todo', urlencodedParser, function(req, res){
        // get data from the view and add it to mongodb
        var newTodo = Todo(req.body).save(function(err, data){
            if (err) throw err;
            res.json(data)
        });
    });

    // delete an item on the todo list by clicking on it
    app.delete('/todo/:item', function(req, res){
        // delete the requested item from mongodb
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).deleteOne(function(err, data){
            if (err) throw err;
            res.json(data);
        });
    });

}