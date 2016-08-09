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
  // console.log(req.query);
  queries.addListItem(req.query.list, req.query.users_id)
  .then(function(data){
      res.json({message: 'list item added'});
  });
});
router.get('/:id/delete', function(req, res, next){
  console.log(req.query.list_id);
  queries.deleteItem(req.query.list_id)
  .then(function(data){
      res.json({list: data});
  });
});
router.put('/:id/edit', function(req, res, next){
  console.log(req.query.list_id);
  console.log(req.query.editListItem);
  queries.editItem(req.query.list_id, req.query.editListItem)
  .then(function(data){
      res.json({list: data});
  });
});


module.exports = router;
