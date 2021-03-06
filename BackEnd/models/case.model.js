const mongoose = require('mongoose');

const types = mongoose.Schema.Types;

const caseSchema = new mongoose.Schema({
    "_id": {
        require: true,
        type: types.ObjectId
    },
    "userID": {
        require: true,
        type: types.String
    },
    "title": {
        require: true,
        type: types.String
    },
    "author": {
        require: true,
        type: types.String
    },
    "date": {
        require: true,
        type: types.Date
    },
    "category": {
        require: true,
        type: types.String
    },
    "methodology": {
        require: true,
        type: types.String
    },
    "description": {
        require: true,
        type: types.String
    },
    "caseText": {
        require: true,
        type: types.String
    }
})

module.exports = mongoose.model('Case', caseSchema);
