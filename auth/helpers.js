//(4)
var queries = require('../queries/apiQueries');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var knex= require('../db/knex');
var express = require('express');

module.exports ={
  createUser : function(body){
    var hash = bcrypt.hashSync(body.password, 8);
    body.password = hash;
    return queries.addUser(body)
    .then(function(user){
      return user.id;
    });
  },
  authMiddleWare : function(req, res, next){
    var token = req.get('Authorization');
    // console.log(token, 'token');
    if(token){
      token = token.substring(7);
      jwt.verify(token, process.env.TOKEN_SECRET, function(error, decoded){
        if(error){
          next();
        }else{
          req.user = decoded;
          next();
        }
      });
    }else{
      next();
    }
  },
  ensureauthenticated : function(req, res, next){
    // console.log(req.get('Authorization'));
    if(req.user){
      next();
    }else{
      res.json({
        message : "you cant come here buddy"
      });
    }
  }
};
