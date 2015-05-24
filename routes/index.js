var express = require('express');
var router = express.Router();
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');


module.exports = function (io) {

  router.get('/', function (req, res) {
    var tweets = tweetBank.list();
    res.render( 'index.html', { title: 'Twitter.js', tweets: tweets, showForm: true } );
  });

  router.get('/users/:name', function(req, res) {
    var name = req.params.name;
    var tweets = tweetBank.find({name:name});
    res.render( 'index.html', { title: 'Twitter.js - Posts by '+name, tweets: tweets, showForm:true, name:name} );
  });

  router.get('/users/:name/tweets/:id', function(req, res) {
  	var name = req.params.name;
    var id = req.params.id;
    var tweets = tweetBank.find({name:name,unID:id});
    res.render( 'index.html', { title: 'Twitter.js - Posts by '+name, tweets: tweets, name:name } );
  });

  router.post('/submit', function(req, res) {
    var name = req.body.name;
    var text = req.body.text;
    tweetBank.add(name, text);
    res.redirect('/');
  });

  return router

}


