const mongoose = require('mongoose');

const student = new mongoose.Schema({
    uid: {
        type: String,

    },
    name: {
        type: String,

    },
    classSection: {
        type: String,

    }
    // imagePath: {
    //     type: String,
    //     required: true
    // }
});

module.exports = mongoose.model('student', student);