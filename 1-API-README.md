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
If the test woked you will see hello in the console

6.2  in index.js remove the query
router.get('/', function(req, res, next){
   		 res.json({test:'hello'});
  });
-in postman it hit url http://localhost:3000/api/list if it worked you will get hello back in the json object under test
