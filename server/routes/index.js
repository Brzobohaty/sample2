var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Todo = require('../models/Todo.js');

/* GET home page. */
router.get('/', function (req, res, next) {
//    Todo.create({name: 'Master Javscript', completed: true, note: 'Getting better everyday'}, function (err, todo) {
//        if (err)
//            console.log(err);
//        else
//            console.log(todo);
//    });

//    Todo.find(function (err, todos) {
//        if (err)
//            return console.error(err);
//        console.log(todos);
//    });

    res.render('index', {title: 'Expresssssssssssssss'});
});

module.exports = router;
