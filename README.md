SERVER SETUP

(1) use the express generator to build  your files
 	-express .
This will make files
	Bin
	Public
	Routes
	Views  
	App.js
	Package.json

(2) rename folder routes to api. This is where we will make the routes for api calls
- remove users.js we will not use this
- Remove views
- remove public

Go into app.js file

(3) on line 8 Change
-var routes = require('./routes/index');  TO
var api = require('./api/index');
Line 28 change
-app.use(‘/’ index) TO
-app.use(‘/api’,api);

(4) remove
	4.1- on line 8 remove
-  var users = require('./routes/users');
4.2 - on line16 remove
	-// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
	4.3 - on line 26 remove
		-app.use(express.static(path.join(__dirname, 'public')));

4.4 - on line 29  
-app.use('/users', users);




(5) change res.render to res.json
	5.1 development error handler
	ex
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
 		   res.status(err.status || 500);
   		 res.json({
     		 message: err.message,
    		  error: err
   		 });
  });
}
5.2 production error handler
Ex
	app.use(function(err, req, res, next) {
 	 res.status(err.status || 500);
 		 res.json( {
  		  message: err.message,
   		 error: {}
  });
});



(6)Npm initstall
	-make node_modules



(7)npm install gitignore -g (if you don't have gitignore installed globally)
  	Gitignore node
		-makes a .gitignore file
(8)Knex init
	-Creates knexfile.js
Go in to knexfile.js and change it to the same file as your data base
	Ex
	require('dotenv').config();
module.exports = {
  		development: {
   		 client: 'pg',
    		connection: 'postgres://localhost/YOUR DATABASE NAME '
 	 },
 	 production:{
    		client: 'pg',
    		connection: process.env.DATABASE_URL + '?ssl=true'
  		}
};



(9)npm install knex pg dotenv --save
-Installs dotenv module and adds to the dependencies in package.json(this loads the environment variables)Installs pg and knex and add them to the dependencies in the package.json



(10)Git init
-Initialize git repo

(11)Echo node_modules > .gitignore
		-moves node modules to a .gitignore file
(12)Touch .env 	 
	-Makes a empty .env file in the root directory
(13)echo .env >> .gitignore
		-adds .env file to .gitignore so git doesn't track it
(15)Atom .
	-open atom
(16) make folder db
In db make knex.js add in
var environment = process.env.NODE_ENV || 'development';
var config = require('../knexfile')[environment];
var knex = require('knex')(config);
module.exports= knex;



API SET UP

(1)In api make file
-list.js

(2)make a folder called queires
	-make 	
		apiQueries.js
Require files

(3)in index.js
	-var express = require('express');
-var router = express.Router();
-var knex = require('../db/knex');
-var queries = require('../queries/apiQueries')
-//change to use the list.js file
-var list = require('./list');
-router.use('/list', list);
-module.exports = router;

(4) in list.js
	-var express = require('express');
-var router = express.Router();
-var knex = require('../db/knex');
-var queries = require('../queries/apiQueries');
-module.exports = router;

(5)in queries in the apiQueries.js
	-var knex = require('../db/knex');
-module.exports ={
-// setup functions in here
-};

(6) test
	6.1 in apiQueries.js make
		test: function(){
  console.log("hello");
}
In list.js
	-router.get('/', function(req, res, next){
  		queries.test().then(function(data){
 	 		res.json({test:'hello'});
  			});
 	 	});
Start nodemon and then In postman hit the url prams
http://localhost:3000/api/list
If the test worked you will see hello in the console

6.2  in index.js remove the query
router.get('/', function(req, res, next){
   		 res.json({test:'hello'});
  });
-in postman it hit url http://localhost:3000/api/list if it worked you will get hello back in the json object under test

ROUTES SETUP

(1)under apiQueries.js make getData function
getData : function(){
		Return knex(‘users’).innerJoin(‘list”, “users_id”, “users.is”);
	}
(2)under list.js use getData()
	router.get('/', function(req, res, next){
  queries.getData()
  .then(function(data){
    		  res.json({list: data});
 		 });
});

(3)under apiQueries.js make getOneData() function
	 getOneData : function(id){
 		 return knex('users').innerJoin('list', 'users_id', 'users.id').where({users_id : id});
  }
(4) under list.js use getOneData() function
router.get('/:id', function(req, res, next){
 	 queries.getOneData(req.params.id)
  	.then(function(data){
   	   res.json({list: data});
  });
});
(5) under apiQueries.js make addListItem() function
Ex
	addListItem : function(list, user){
  		return knex('list').insert({'list': list, 'users_id': user});
},
(6) under list.js use the addListItem function in the route
Ex
	router.post('/', function(req, res, next){
  queries.addListItem(req.query.list, req.query.users_id)
  .then(function(data){
      res.json({message: 'list item added'});
  });
});
(7)
 under apiQueries.js make deleteItem() function
Ex
deleteItem : function(body){
  return knex('list').del().where({id: body});

(8)under list,js use the deleteItem() function in the route
Ex
	router.delete('/:id', function(req, res, next){
  	queries.deleteItem(req.query.list_id)
 	 .then(function(data){
     	 res.json({list: data});
 	 });
});
(9)
 under apiQueries.js make editItem() function
Ex
editItem : function(id, editListItem){
  return knex('list').update({list: editListItem}).where({id: id});
},

(10)under list,js use the editItem() function in the route
Ex
router.put('/:id', function(req, res, next){
  queries.editItem(req.query.list_id, req.query.editListItem)
  .then(function(data){
      res.json({list: data});
  });
});



SETTING UP AUTH

(1)npm install jsonwebtoken  bcrypt  dotenv --save

(2) make folder
	-auth
		Make file
Index.js
helpers.js

(3)go into auth and under index.js add in
	require('dotenv').config();
var express = require('express');
var router = express.Router();
var queries = require('./queries/apiQueries')
var auth = require('./helpers.js');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

module.exports = router;

(4)go in to auth under helpers.js add

	var queries = require('../queries/apiQueries');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var knex= require('../db/knex');
var express = require('express');

(5)
go into app.js add
	var auth = require('./auth/index')
	app.use('/auth', auth); //make sure this is above the app.use(‘/api’,api)
(6)
Make function createUser() in auth/helpers
Ex
	  createUser : function(body){
    //take the password from the body of the request, hashing it
    //then setting the req.body.password to the hashed password
    var hash = bcrypt.hashSync(body.password, 8);
    body.password = hash;
    //adds the user to the database with the hashed password
    return queries.addUser(body)
    .then(function(user){
      return user.id;
    });
  },
(7)
In auth/index make route
Ex
	router.post('/signup', function(req, res, next){
  queries.findUserByUserName(req.query.userName)
  .then(function(user){
    if(user){
      res.json({
        error : "user already exist try another name"
      });
    }else {
      auth.createUser(req.query)
      .then(function(user){
        res.json({
          message : 'you are a new user yay'
        });
      });
    }
  });
});

(8)
In auth/index make route for login
router.post('/login', function(req, res, next){
  queries.findUserByUserName(req.query.userName)
  .then(function(user){
    var plainTextPassword = req.query.password;
    if(user && bcrypt.compareSync(plainTextPassword, user.password)){
      jwt.sign(user, process.env.TOKEN_SECRET, {expiresIn: '1d'}, function(err, token){
        if(err){
          res.json({
            message: 'error creating token'
          });
        }else{
          res.json({
            token : token,
            userId: user.id
          });
        }
      });
      }else{
      res.status(401);
      res.json({
        message : 'unauthorized'
      });
    }
  });
});







(9)
In auth/helpers make function authMiddleWare
  authMiddleWare : function(req, res, next){
    //Authorization is part of the header that is being sent
    var token = req.get('Authorization');

    if(token){
      //removing "Bearer " frome the token string, leaving only the token
      token = token.substring(7);
      //a method of JWT that verifies the payload, token, and takes a callback
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
(10)
In auth/helpers make function ensureauthenticated
  ensureauthenticated : function(req, res, next){
    if(req.user){
      next();
    }else{
      res.json({
        message : "you cant come here buddy"
      });
    }
  }
};
