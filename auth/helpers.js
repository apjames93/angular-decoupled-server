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
  }
};
