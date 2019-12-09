const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
var Todo = require('../models/item');

router.get('/', function(req, res){
    Todo.find({}, function(err, data){
        if (err) throw err;
        res.json({todos: data});
    });
});

router.post('/:item', function(req, res){
    var newTodo = Todo({item: req.params.item}).save(function(err, data){
        if (err) throw err;
        res.json(data);
    });
});

module.exports = router;