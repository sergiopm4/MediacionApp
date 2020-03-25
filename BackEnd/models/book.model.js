const mongoose = require('mongoose');

const types = mongoose.Schema.Types;

const bookSchema = new mongoose.Schema({
    "_id": {
        require: true,
        type: types.ObjectId
    },
    "title": {
        require: true,
        type: types.String
    },
    "author": {
        require: true,
        type: types.String
    },
    "link": {
        require: true,
        type: types.String
    }
})

module.exports = mongoose.model('Book', bookSchema);
