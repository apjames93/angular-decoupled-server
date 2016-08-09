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
addListItem : function(list, user){
  return knex('list').insert({'list': list, 'users_id': user});
},
findUserByUserName : function(userName){
  return knex('users').where({"userName": userName}).first();
},
addUser : function(body){
  return knex('users').insert(body);
},
deleteItem : function(body){
  // console.log( body, "body");
  return knex('list').del().where({id: body});
},
editItem : function(id, editListItem){
  // console.log( body, "body");
  return knex('list').update({list: editListItem}).where({id: id});
}
};
