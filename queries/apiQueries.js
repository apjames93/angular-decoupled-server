var knex = require('../db/knex');

module.exports ={
// setup functions in here
//(1)
getData : function(){
  return knex('users').innerJoin('list', 'users_id', 'users.id');
  },
//(3)
getOneData : function(id){
  return knex('users').innerJoin('list', 'users_id', 'users.id').where({users_id : id});
},
addListItem : function(add){
  return knex('list').insert({'list': add.list});
},
findUserByUserName : function(userName){
  return knex('users').where({"userName": userName}).first();
},
addUser : function(body){
  return knex('users').insert(body);
}
};
