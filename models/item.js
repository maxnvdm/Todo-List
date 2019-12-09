const mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Create a schema - blueprint for data
var todoSchema = new Schema({
    item: String
});

module.exports = mongoose.model('Todo', todoSchema);