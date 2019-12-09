const express = require('express');
const router = express.Router();
var Todo = require('../models/item');
var bodyParser = require('body-parser');
var bodyjson = bodyParser.json();

// end-point for api/ get request, returns json of items in todo-list
router.get('/', function(req, res){
    Todo.find({}, function(err, data){
        if (err) throw err;
        res.json({todos: data});
    });
});

// end-point for creating an item via posting a json in the following format {"item": "name"}
router.post('/', bodyjson, function(req, res){
    console.log(req.body)
    // var item = new Todo(req.body);
    var newTodo = Todo(req.body).save(function(err, data){
        if (err) throw err;
        res.json(data);
    });
});

// end-point to delete an item using it's ID as found in the database (can also be found using the get API call)
router.delete('/:item', function(req, res){
    Todo.findByIdAndRemove({_id: req.params.item}).then(function(todo){
        res.send(todo);
    });
});

// end-point to update an item in the database using it's ID and entering the updated params in the body as a json
router.put('/:item', bodyjson, function(req, res, next ){
    Todo.findByIdAndUpdate({_id: req.params.item}, req.body, {new: true}).then(function(todo){
        res.send(todo);
    });
});

module.exports = router;