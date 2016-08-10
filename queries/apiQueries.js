var knex = require('../db/knex');

module.exports ={
// setup functions in here
//ROUTES SETUP (1)
getData : function(){
  return knex('users').innerJoin('list', 'users_id', 'users.id');
  },
//ROUTES SETUP (3)
getOneData : function(id){
  return knex('users').innerJoin('list', 'users_id', 'users.id').where({users_id : id});
},
//ROUTES SETUP (5)
addListItem : function(list, user){
  return knex('list').insert({'list': list, 'users_id': user});
},
//ROUTES SETUP (7)
deleteItem : function(body){
  return knex('list').del().where({id: body});
},
//ROUTES SETUP (9)
editItem : function(id, editListItem){
  return knex('list').update({list: editListItem}).where({id: id});
},
findUserByUserName : function(userName){
  return knex('users').where({"userName": userName}).first();
},
addUser : function(body){
  return knex('users').insert(body);
}

};
