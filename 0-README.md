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
