'use strict';
var path = process.cwd();

module.exports = {init};
function init(app,passport){

	app.route('/').get(function(req,res){
		res.render(path + '/views/index.jade') , {user : req.user};
	});

	app.get('/auth/google/get', passport.authenticate('google', { scope
		 : ['https://www.googleapis.com/auth/plus.me' ,
		  'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile']}
		));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback', passport.authenticate('google', {
				successRedirect: '/',
				failureRedirect: '/failure'
		}));
};
