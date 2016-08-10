//(3)
require('dotenv').config();
var express = require('express');
var router = express.Router();
var queries = require('../queries/apiQueries');
var auth = require('./helpers.js');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
//(SETTING UP AUTH 7)
router.post('/signup', function(req, res, next){
  queries.findUserByUserName(req.query.userName)
  .then(function(user){
    if(user){
      res.json({
        error : "user already exist try another name"
      });
    }else {
      auth.createUser(req.query)
      .then(function(user){
        res.json({
          message : 'you are a new user yay'
        });
      });
    }
  });
});

router.post('/login', function(req, res, next){
  queries.findUserByUserName(req.query.userName)
  .then(function(user){
    // console.log(user, 'user');
    var plainTextPassword = req.query.password;
    if(user && bcrypt.compareSync(plainTextPassword, user.password)){
      jwt.sign(user, process.env.TOKEN_SECRET, {expiresIn: '1d'}, function(err, token){
        // console.log(token, 'auth token');
        if(err){
          res.json({
            message: 'error creating token'
          });
        }else{
          res.json({
            token : token,
            userId: user.id
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
