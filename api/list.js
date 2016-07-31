var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var queries = require('../queries/apiQueries');

//(1)
router.get('/', function(req, res, next){
  queries.getData()
  .then(function(data){
      res.json({list: data});
  });
});
//(4)
router.get('/:id', function(req, res, next){
  queries.getOneData(req.params.id)
  .then(function(data){
      res.json({list: data});
  });
});
router.post('/newListItem', function(req, res, next){
  queries.addListItem(req.body, req.params)
  .then(function(data){
      res.json({message: 'list item added'});
  });
});



module.exports = router;
