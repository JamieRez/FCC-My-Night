'use strict';
var path = process.cwd();
var user = require('../models/user.js');
var client = require('../../config/yelp.js').client;
var savedSearch ='';
var Bar = require('../models/bar.js').Bar;

module.exports = {init};
function init(app,passport){

	app.route('/').get(function(req,res){
			res.render(path + '/views/index.jade' , {user : req.user , searchTerm : savedSearch});
	});

	app.route('/delete').get(function(req,res){
		user.deleter();
	});

	app.get('/logout' , function(req,res){
		req.logout();
  	res.redirect('/');
	});

	app.post('/search',function(req,res){
			client.search({term : "Bars" , location : req.body.searchLoc}).then(function(data){
				res.send(data.businesses);
			})
	});

	app.post('/letsAuth' , function(req,res){
		savedSearch = req.body.searchTerm;
		res.send(savedSearch);
	});

	app.post('/getBarModel' , function(req,res){
		Bar.find({}, function(err,bars){
			if(err) throw err;
			res.send(bars);
		});
	});

	app.post('/addPeep' , function(req,res){
		Bar.findOne({name : req.body.barName} ,function(err,bar){
			if(err) throw err;
			if(!bar){
				var newBar = new Bar({name : req.body.barName});
				if(req.body.leaveBool == 0){
					newBar.peepsGoing++;
				}else{
					newBar.peepsGoing--;
				}
				newBar.save();
				res.send(newBar);
			}else{
				if(req.body.leaveBool == 0){
					bar.peepsGoing++;
				}else{
					bar.peepsGoing--;
				}
				bar.save();
				res.send(bar);
			}
		});

	});

	app.get('/auth/google', passport.authenticate('google', { scope
		 : ['https://www.googleapis.com/auth/plus.me' ,
		  'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile']}
		));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback', passport.authenticate('google', {
				failureRedirect: '/failure'
		}), function(req,res){
				res.redirect('/');
		});
};
