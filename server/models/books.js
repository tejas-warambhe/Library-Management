const mongoose = require('mongoose');

const book = new mongoose.Schema({
    uid: {
        type: String,
        // required: true
    },
    name: {
        type: String,
        // required: true
    },
    author: {
        type: String,
        // required: true
    },
    publication_year: {
        type: String,
        // required: true
    }
});

module.exports = mongoose.model('book', book);