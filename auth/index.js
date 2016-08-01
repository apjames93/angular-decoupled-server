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

router.post('/login', function(req, res, next){
  queries.findUserByUserName(req.body.userName)
  .then(function(user){
    var plainTextPassword = req.body.password;
    if(user && bcrypt.compareSync(plainTextPassword, user.password)){
      jwt.sign(user, process.env.TOKEN_SECRET, {expiresIn: '1d'}, function(err, token){
        console.log(token);
        if(err){
          res.json({
            message: 'error creating token'
          });
        }else{
          res.json({
            token : token
          });
        }
      });
      }else{
      res.status(401);
      res.json({
        message : 'unauthorized'
      });
    }
  });
});
module.exports = router;
