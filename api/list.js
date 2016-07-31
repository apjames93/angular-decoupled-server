var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var queries = require('../queries/apiQueries');


router.get('/', function(req, res, next){
  queries.getData()
  .then(function(data){
      res.json({list: data});
  });
});



module.exports = router;
