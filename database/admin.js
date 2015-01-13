/**
 * New node file for establishing and making database request for all books
 * related requests
 */



exports.retrieveSimpleMembers= function(req,res)
{
	var sql="select * from member where premiumMember='N' and admin='N'";
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
			console.log("We have the results "+results);
			res.render('MemberList.html', {title : "Member Operations  !!",MemberResults : results});
		}
	  });
	

};


exports.removeSimpleMember=function(req,res)
{
	var a = JSON.stringify(req.body);
	var json = JSON.parse(a);
	var b = json["RemoveId"];
	console.log("the value  of id :" + b);
	var connectionPool = require('../database/connectionPooling');
	var pool = connectionPool.Pool();
	pool.connect();
	var sql = 'delete from member where memberId=' + parseInt(b);
	console.log(a);
	pool.query(sql, function(err, results) {
		if (err) {
			console.log("ERROR: " + err.message);
		}
		console.log("succcessfully removed the simple member !!");
		console.log("Return value of id " + parseInt(b));
		res.send(parseInt(b));

	});
};


exports.retrievePremiumMembers= function(req,res)
{
	var sql="select * from member where premiumMember='Y' and admin='N'";
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
			console.log("We have the results "+results);
			res.render('PremiumMemberList.html', {title : "Premium Member Operations  !!",MemberResults : results});
		}
	  });
	

};


exports.removePremiumMember=function(req,res)
{
	var a = JSON.stringify(req.body);
	var json = JSON.parse(a);
	var b = json["RemoveId"];
	console.log("the value  of id :" + b);
	var connectionPool = require('../database/connectionPooling');
	var pool = connectionPool.Pool();
	pool.connect();
	var sql = 'delete from member where memberId=' + parseInt(b);
	console.log(a);
	pool.query(sql, function(err, results) {
		if (err) {
			console.log("ERROR: " + err.message);
		}
		console.log("succcessfully removed the premium member !!");
		console.log("Return value of id " + parseInt(b));
		res.send(parseInt(b));

	});
};


exports.adminDisplayPersons=function(req,res)
{
	var sql="select * from member where admin='N'";
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
			res.render('ListPerson.html', {title : "List All Persons  !!",MemberResults : results});
		}
	  });
	

};


exports.adminSearchPersons=function(req,res)
{
	var sql="select * from member";
	
	
		console.log("about to search ");
		var a = JSON.stringify(req.body);
		var json = JSON.parse(a);
		var first = json["firstName"];
		var last= json["lastName"];
		console.log(" the first name is "+first);
		console.log(" the last name is "+last);
	var connectionPool = require('../database/connectionPooling');
	var pool = connectionPool.Pool();
	pool.connect();
	
	if(first!= ""){
		sql += (" where firstName Like "+"'%"+first+"%'");
		}
		if(last!="") {
			sql += (" and lastName Like"+"'%"+last+"%'");
		}
		console.log("the query formed is-->"+sql);
	pool.query(sql, function(err, results) {
		if (err) {
			console.log("ERROR: " + err.message);
			var error = err.message;
			res.render('Error.html', {
				Error : error
			});
		} else {
			console.log("We have the results for all the persons "+results);
			res.render('ListPerson.html', {title : "List All Persons  !!",MemberResults : results});
		}
	  });
	

};


exports.addNewMovie=function(req,res)
{
	var a = JSON.stringify(req.body);
	var json = JSON.parse(a);
	var movieName = json["movieName"];
	var movieBanner = json["movieBanner"];
	var releaseDate = json["releaseDate"];
	var rentAmount = json["rentAmount"];
	var avilableCopies = json["avilableCopies"];
	var category = json["category"];	
	var sql="insert into movie values(null,'"+movieName+"','"+movieBanner+"','"+releaseDate+"',"+rentAmount+","+avilableCopies+",'"+category+"')";
	console.log("Inserting into movies values --->"+sql);
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
			res.render('MakeNewMovie.html', {title : "Create New Movie  !!",message : "Successfully created a new movie"});
		}
	  });
	

};


exports.getAllMovie=function(req,res)
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
			res.render('AdminAllMovies.html', {title : "List All Movies  !!",MovieResults : results});
		}
	  });
	

};

exports.adminDeleteMovie=function(req,res)
{
	var a = JSON.stringify(req.body);
	var json = JSON.parse(a);
	var b = json["RemoveId"];
	console.log("the value  of id :" + b);
	var connectionPool = require('../database/connectionPooling');
	var pool = connectionPool.Pool();
	pool.connect();
	var sql = 'delete from movie where movieId=' + parseInt(b);
	console.log(a);
	pool.query(sql, function(err, results) {
		if (err) {
			console.log("ERROR: " + err.message);
		}
		console.log("succcessfully removed the movie !!");
		console.log("Return value of id " + parseInt(b));
		res.send(parseInt(b));

	});
};

exports.adminupdateMovie=function(req,res)
{
	var a = JSON.stringify(req.body);
	var json = JSON.parse(a);
	var b = json["row_id"];
	var col=json["column"];
	var columnName;
	if(parseInt(col)==0)
		{
		columnName="movieId";
		}
	else if(parseInt(col)==1)
		{
		columnName="movieName";
		}
	else if(parseInt(col)==2)
		{
		columnName="movieBanner";
		}
	else if(parseInt(col)==3)
	{
	columnName="releaseDate";
	}
	else if(parseInt(col)==4)
	{
	columnName="rentAmount";
	}
	else if(parseInt(col)==5)
	{
	columnName="availableCopies";
	}
	else
	{
	columnName="category";
	}
	var value=json["value"];
	console.log("the value  of id :" + b);
	var connectionPool = require('../database/connectionPooling');
	var pool = connectionPool.Pool();
	pool.connect();
	var sql = 'update movie set ' +columnName+'="'+value  +'" where movieId=' + parseInt(b);
	console.log("The query is--->"+ sql);
	pool.query(sql, function(err, results) {
		if (err) {
			console.log("ERROR: " + err.message);
		}
		console.log("succcessfully updated  the movie !!");
		res.send(value);

	});
};
