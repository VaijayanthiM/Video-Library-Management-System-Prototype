/**
 * New node file for all the premium member related functiality
 */


exports.displayMovie=function(req,res)
{
	var sql="select * from movie";
	var connectionPool = require('../database/connectionPooling');
	var pool = connectionPool.Pool();
	pool.connect();
	pool.query(sql, function(err, results) {
		if (err) {
			console.log("ERROR: " + err.message);
			var error = err.message;
			res.render('Error.html', {
				Error : error
			});
		} else {
			console.log("We have the results for all the persons "+results);
			res.render('MemberMovies.html', {title : "List All Movies  !!",MovieResults : results});
		}
	  });
	

};