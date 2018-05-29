const mongoose = require('mongoose');

const Question = mongoose.model('Question', {
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    desc: {
        type: String,
        default: null
    },
    answers: {
        type: Array,
        default: []
    }
});

module.exports = {Question};