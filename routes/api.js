const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
var Todo = require('../models/item');

// end-point for api/ get request, returns json of items in todo-list
router.get('/', function(req, res){
    Todo.find({}, function(err, data){
        if (err) throw err;
        res.json({todos: data});
    });
});

// end-point for creating an item via the url /api/item and adds the item to the database
router.post('/:item', function(req, res){
    var newTodo = Todo({item: req.params.item}).save(function(err, data){
        if (err) throw err;
        res.json(data);
    });
});

module.exports = router;