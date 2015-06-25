
// Modules =========================
var express = require('express');
var app 	= express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// Configuration ===================

mongoose.connect('mongodb://localhost/gp-tut');     // connect to mongoDB database on modulus.io // PERHAPS THIS IS A SANDBOXED THING?

// the middleware stack
app.use(express.static(__dirname + '/public')); // set static dir to public
app.use(morgan('dev')); // log all requests
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());



// http://mongoosejs.com/docs/guide.html
var organizationSchema = mongoose.Schema({
    name: String,
	portion : Number
});

var Organization = mongoose.model('Organization', organizationSchema);



// Routes =============================

app.get('/api/organizations', function(req,res){
	Organization.find(function(err, organizations){
		if(err)
			res.send(err);

		res.json(organizations);
	})
});

app.post('/api/organizations', function(req,res){
	Organization.create({
		name : req.body.name,
		portion : req.body.portion, // must match with schema
		grade : req.body.grade
	}, function(err,organizations){ // why plural?
		if(err)
			res.send(err);

		Organization.find(function(err,organizations){
			if(err)
				res.send(err);

			res.json(organizations);
		})
	}) 
});

app.delete('/api/organizations', function(req,res){
	Organization.remove({}, function(err, organizations){
		if(err)
			res.send(err);

		Organization.find(function(err,organizations){
			if(err)
				res.send(err);

			res.json(organizations);
		})
	})
});

app.delete('/api/organizations/:organization_id', function(req,res){
	Organization.remove({
		_id : req.params.organization_id
	}, function(err, organizations){
		if(err)
			res.send(err);

		Organization.find(function(err,organizations){
			if(err)
				res.send(err);

			res.json(organizations);
		})
	})
});




app.get('*', function(req,res){
	res.sendfile('./public/index.html');
});
















// listen (start app with node server.js)
app.listen(8080);
console.log("App listening on port 8080");
