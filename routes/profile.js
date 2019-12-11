const router = require('express').Router();
const User = require('../models/user-model');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});

const authCheck = (req, res, next) => {
    if (!req.user){
        // if user is not logged in
        res.redirect('/auth/login');
    } else {
        // if logged in
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    User.findOne({username: req.user.username}).then((user) => {
        res.render('profile', {user: req.user, todos: user.items});
    });
});

// add a new item to the todo list through the text input form
router.post('/', urlencodedParser, function(req, res){
    // get data from the view and add it to mongodb
    var bod = req.body;
    User.findOne({username: req.user.username}).then((user) => {
        user.items.push({item: bod.item});
        user.save(function(err, data){
            if (err) throw err;
            res.json(data);
        });
    });
});

// delete an item on the todo list by clicking on it
router.delete('/:item', function(req, res){
    // delete the requested item from mongodb
    User.update({username: req.user.username}, {"$pull": {items: {item: req.params.item}}}, {safe: true}, function(err, obj) {
        if (err) throw err;
        res.json(obj);
    });
});

module.exports = router;