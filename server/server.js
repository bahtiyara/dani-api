const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Question} = require('./models/question');
const port = process.env.PORT || 3000;

var app = express();
app.use(bodyParser.json());

// For home.html
app.get('/', (req, res) => {
    Question.find().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e.toString());
    });
});

// For detail.html
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

// For new.html
app.post('/questions', (req, res) => {
    var question = new Question({
        title: req.body.title,
        desc: req.body.desc
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