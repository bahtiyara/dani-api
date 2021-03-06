const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Question} = require('./models/question');
const port = process.env.PORT || 3000;

var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});  

app.use(bodyParser.json());

// For home.html
app.get('/', (req, res) => {
    Question.find().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e.toString());
    });
});

// For detail.html fetching data
app.get('/questions/:id', (req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Question.findById(id).then((question) => {
        if (!question) {
            return res.status(404).send();
        }
        res.send(question);
    });
});

// For detail.html updating data {title, desc, answers-add, answers-delete}
app.patch('/questions/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['title', 'desc', 'answers']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Question.findByIdAndUpdate(id, {$set: body}, {new: true}).then((question) => {
        if (!question) {
            return res.status(404).send();
        }
        res.send(question);
    }, (e) => {
        res.status(400).send();
    });
});

// For detail.html deleting data
app.delete('/questions/:id', (req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Question.findByIdAndRemove(id).then((question) => {
        if (!question) {
            return res.status(404).send();
        }
        res.send(question);
    });
});

// For new.html
app.post('/questions', (req, res) => {
    var question = new Question({
        title: req.body.title,
        desc: req.body.desc,
        answers: req.body.answers
    });
    question.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e.toString());
    });
});

app.listen(port, () => {
    console.log(`The server is up on port ${port}`);
});