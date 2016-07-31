var knex = require('../db/knex');

module.exports ={
// setup functions in here
getData : function(){
  return knex('users').innerJoin('list', 'users_id', 'users.id');
  }
};
