var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var queries = require('../queries/apiQueries');

//(ROUTES SETUP (1)
router.get('/', function(req, res, next){
  queries.getData()
  .then(function(data){
      res.json({list: data});
  });
});
//(ROUTES SETUP (4)
router.get('/:id', function(req, res, next){
  queries.getOneData(req.params.id)
  .then(function(data){
      res.json({list: data});
  });
});
//(ROUTES SETUP (6)
router.post('/', function(req, res, next){
  queries.addListItem(req.query.list, req.query.users_id)
  .then(function(data){
      res.json({message: 'list item added'});
  });
});
//(ROUTES SETUP (8)
router.delete('/:id', function(req, res, next){
  queries.deleteItem(req.query.list_id)
  .then(function(data){
      res.json({list: data});
  });
});
//(ROUTES SETUP (10)
router.put('/:id', function(req, res, next){
  queries.editItem(req.query.list_id, req.query.editListItem)
  .then(function(data){
      res.json({list: data});
  });
});
module.exports = router;
