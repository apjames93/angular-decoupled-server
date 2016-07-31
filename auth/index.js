//(3)
require('dotenv').config();
var express = require('express');
var router = express.Router();
var queries = require('../queries/apiQueries');
var auth = require('./helpers.js');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

router.post('/signup', function(req, res, next){
  queries.findUserByUserName(req.body.userName)
  .then(function(user){
    if(user){
      res.json({
        error : "user already makes list bitch"
      });
    }else {
      auth.createUser(req.body)
      .then(function(user){
        res.json({
          message : 'you are a new user yay'
        });
      });
    }
  });
});

module.exports = router;
