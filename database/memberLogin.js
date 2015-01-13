/**
 * New node file for implementing all the member related operation like authentication, last login etc.
 */

var lastlogin;
function lastLoginDate(memberId) {
	var member = memberId;

	var connectionPool = require('../database/connectionPooling');
	var pool = connectionPool.Pool();
	pool.connect();

	var sql1 = 'select max(lastLogindate) as lastLoginDate from login where memberId='
			+ member;
	pool.query(sql1, function(err, results1) {
		if (err) {
			console.log("ERROR: " + err.message);
			var error = err.message;
			res.render('Error.html', {
				Error : error
			});
		} else {
			var str = (results1[0].lastLoginDate);
			var str1 = new Date(str.toLocaleString());
			var date = new Date(str1);
			console.log(" new date :" + date);
			lastlogin = date;
		}
	});
	console.log("getting last login :" + lastlogin);
	return lastlogin;
};

function timeStamp() {
	var now = new Date();
	var date = [ now.getFullYear(), now.getMonth() + 1, now.getDate() ];
	var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];
	for ( var i = 0; i < 3; i++) {
		if (time[i] < 10) {
			time[i] = "0" + time[i];
		}
	}
	for ( var i = 1; i < 3; i++) {
		if (date[i] < 10) {
			date[i] = "0" + date[i];
		}
	}
	return date.join("-") + " " + time.join(":");
}

function verify(req, res) {
	var a = JSON.stringify(req.body);
	var obj = JSON.parse(JSON.stringify(req.body));
	var userName = obj.userName.toString();
	console.log("username " + userName);
	var password = obj.Password.toString();
	console.log(" the pwd is:" + password);
	var connectionPool = require('../database/connectionPooling');
	var pool = connectionPool.Pool();
	pool.connect();

	var sqlVerify = 'select * from member where userName="' + userName
			+ '" and password= "' + password + '"';
	var str = sqlVerify.toString();
	var se = JSON.stringify(str);
	console.log("the new " + se);
	pool.query(sqlVerify,
					function(err, results) {
						if (err) {
							console.log("ERROR: " + err.message);
							var error = err.message;
							res.render('Error.html', {
								Error : error
							});
						} else if (results.length == 0) {
							console.log("came in this ");
							res.render('Error.html', {
								Error : "User not authenticated !!"
							});
						}
						else if (results[0].admin == "Y") {
							console.log("came into the admin module check  ");
							console.log(results);
							console.log(results[0].memberId);
							console.log(results[0].firstName);
							req.session.memberId = results[0].memberId;
							req.session.firstName = results[0].firstName;
							var member = req.session.memberId;

							var sql1 = 'select max(lastLogindate) as lastLoginDate from login where memberId='
									+ member;
							pool.query(sql1, function(err, results1) {
								if (err) {
									console.log("ERROR: " + err.message);
									var error = err.message;
									res.render('Error.html', {
										Error : error
									});
								} else {
									var str = (results1[0].lastLoginDate);
									var str1 = new Date(str.toString());
									var date = new Date(str1);
									console.log(" new date :" + date);
									req.session.lastlogin = date;
									console.log("The session variable : "
											+ req.session.lastlogin);
								}
							});
							var dateHere = lastLoginDate(member);
							console.log(" date last login : ---" + dateHere);
							var time = timeStamp();
							var sql = 'insert into login values(null,' + member
									+ ',"' + time + '")';
							pool.query(sql, function(err, results) {
								if (err) {
									console.log("ERROR: " + err.message);
									var error = err.message;
									res.render('Error.html', {
										Error : error
									});
								} else {
									console.log("date is persisted");
								}
							});
							res.redirect('/AdminHome');
					
						}
							
						else if (results[0].premiumMember == "Y" && results[0].admin == "N") {
							console.log("came into the premium member module   ");
							console.log(results);
							console.log(results[0].memberId);
							console.log(results[0].firstName);
							req.session.memberId = results[0].memberId;
							req.session.firstName = results[0].firstName;
							var member = req.session.memberId;

							var sql1 = 'select max(lastLogindate) as lastLoginDate from login where memberId='
									+ member;
							pool.query(sql1, function(err, results1) {
								if (err) {
									console.log("ERROR: " + err.message);
									var error = err.message;
									res.render('Error.html', {
										Error : error
									});
								} else {
									var str = (results1[0].lastLoginDate);
									var str1 = new Date(str.toString());
									var date = new Date(str1);
									console.log(" new date :" + date);
									req.session.lastlogin = date;
									console.log("The session variable : "
											+ req.session.lastlogin);
								}
							});
							var dateHere = lastLoginDate(member);
							console.log(" date last login : ---" + dateHere);
							var time = timeStamp();
							var sql = 'insert into login values(null,' + member
									+ ',"' + time + '")';
							pool.query(sql, function(err, results) {
								if (err) {
									console.log("ERROR: " + err.message);
									var error = err.message;
									res.render('Error.html', {
										Error : error
									});
								} else {
									console.log("date is persisted");
								}
							});
							
						
							
							res.redirect('/PremiumMemberHome');
					
						}

						
						
						
						
						
						else {
							console.log(results);
							console.log(results[0].memberId);
							console.log(results[0].firstName);
							req.session.memberId = results[0].memberId;
							req.session.firstName = results[0].firstName;
							var member = req.session.memberId;

							var sql1 = 'select max(lastLogindate) as lastLoginDate from login where memberId='
									+ member;
							pool.query(sql1, function(err, results1) {
								if (err) {
									console.log("ERROR: " + err.message);
									var error = err.message;
									res.render('Error.html', {
										Error : error
									});
								} else {
									var str = (results1[0].lastLoginDate);
									var str1 = new Date(str.toString());
									var date = new Date(str1);
									console.log(" new date :" + date);
									req.session.lastlogin = date;
									console.log("The session variable : "
											+ req.session.lastlogin);
								}
							});
							var dateHere = lastLoginDate(member);
							console.log(" date last login : ---" + dateHere);
							var time = timeStamp();
							var sql = 'insert into login values(null,' + member
									+ ',"' + time + '")';
							pool.query(sql, function(err, results) {
								if (err) {
									console.log("ERROR: " + err.message);
									var error = err.message;
									res.render('Error.html', {
										Error : error
									});
								} else {
									console.log("date is persisted");
								}
							});
							
							
							
							
							
							
							res.redirect('/Home');
						}
					});
}

exports.signUp = function(req, res) {
	console.log("Received the info for the signup  in the member Login!!");
	var obj = JSON.parse(JSON.stringify(req.body));
	console.log("Here it is ---->"+obj);
	var firstName = obj.firstName;
	var lastName = obj.lastName;
	var userName = obj.userName;
	var password = obj.password;
	var address = obj.address;
	var phone = obj.phone;
	var email = obj.email;
	var address=obj.address;
	var city=obj.city;
	var state=obj.state;
	var zipcode=obj.zipcode;
	var preMember=obj.premiumMember;
	var email=obj.email;
	var member=null;
	var premiumValue=null;
	
	if(preMember== "on")
		{
		premiumValue= 'Y';
		}
	else
		{
		premiumValue= 'N';
		}
	var connectionPool = require('../database/connectionPooling');
	var pool = connectionPool.Pool();
	pool.connect();

	var sqlVerify = 'insert into member values(null,"' + firstName + '","'
			+ lastName + '","'+address + '","'+city+'","'+state+'","'+zipcode+'","'+email+'","'+userName + '","' + password + '","'+premiumValue+'","N")';
	var str = sqlVerify.toString();
	console.log(str);
	pool.query(sqlVerify, function(err, results) {
		if (err) {
			console.log("ERROR: " + err.message);
			var error = err.message;
			res.render('Error.html', {
				Error : error
			});
		} else {
			var sql2="select memberId from member where userName='"+userName+"'";
			
			console.log(sql2);
			pool.query(sql2, function(err, results) {
				if (err) {
					console.log("ERROR: " + err.message);
					var error = err.message;
					res.render('Error.html', {
						Error : error
					});
				}
				else{
				var memberid=results[0].memberId;
				console.log("The menberid retrieved is -------->"+memberid);
				var member =memberid;
				var time = timeStamp();
				
				
				if(results[0].premiumMember == 'Y')
					{
					console.log("Persising the enry for the premium member in the priemum member table ");
					var sql7 = 'insert into premiummember values(' + member+ ',300,null,0 )';
					pool.query(sql7, function(err, results) {
				if (err) {
					console.log("ERROR: " + err.message);
					var error = err.message;
					res.render('Error.html', {Error : error});
					
				}
				});
					}
				else
					{
					console.log("Persising the enry for the simple member in the simple  member table ");
					
					var sql9 = 'insert into simplemember values(' + member+ ',null,0 )';
					pool.query(sql9, function(err, results) {
				if (err) {
					console.log("ERROR: " + err.message);
					var error = err.message;
					res.render('Error.html', {Error : error});
					
				}
				});
					
					}
				
				
				
				
				
				
				
				
				
				
				
				
				console.log(member);
				var sql = 'insert into login values(null,' + member
						+ ',"' + time + '")';
				console.log(sql);
				
				pool.query(sql, function(err, results) {
					if (err) {
						console.log("ERROR: " + err.message);
						var error = err.message;
						res.render('Error.html', {
							Error : error
						});
					} else {
						console.log("date is persisted");
					}
				  });
				}
		     });
			
			
			
			res.render('Sign.html');
		}
	});
};



exports.editPersonalInfo = function(req,res)
{
	
	var member=req.session.memberId;
	var sql="select * from member where memberId="+member;
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
			console.log("We have the results for concerned member "+results);
			res.render('EditPersonalInfo.html', {title : "Edit Personal Info  !!",PersonalInfoResults : results});
		}
	  });
};

exports.updatePersonalInfo=function(req,res)
{
	var a = JSON.stringify(req.body);
	var json = JSON.parse(a);
	var b = json["row_id"];
	var col=json["column"];
	var columnName;
	if(parseInt(col)==0)
		{
		columnName="memberId";
		}
	else if(parseInt(col)==1)
		{
		columnName="firstName";
		}
	else if(parseInt(col)==2)
		{
		columnName="lastName";
		}
	else if(parseInt(col)==3)
	{
	columnName="address";
	}
	else if(parseInt(col)==4)
	{
	columnName="city";
	}
	else if(parseInt(col)==5)
	{
	columnName="state";
	}
	else if(parseInt(col)==6)
	{
	columnName="zipcode";
	}
	else
	{
	columnName="email";
	}
	var value=json["value"];
	console.log("the value  of id :" + b);
	var connectionPool = require('../database/connectionPooling');
	var pool = connectionPool.Pool();
	pool.connect();
	var sql = 'update member set ' +columnName+'="'+value  +'" where memberId=' + parseInt(b);
	console.log("The query is--->"+ sql);
	pool.query(sql, function(err, results) {
		if (err) {
			console.log("ERROR: " + err.message);
		}
		console.log("succcessfully updated  the Personal Info !!");
		res.send(value);

	});
};



exports.issueMovie=function(req,res)
{
	var a = JSON.stringify(req.body);
	var json = JSON.parse(a);
	console.log("The json is like :"+json);
	var movieId=json["IssueId"];
	var member=req.session.memberId;
	console.log("The meneber id is :"+member);
	var sql='select * from  movie where movieId='+movieId;
	console.log("The query being formed is :"+sql);
	var connectionPool = require('../database/connectionPooling');
	var pool = connectionPool.Pool();
//	var today = new Date();
//	var dd = today.getDate();
//	var mm = today.getMonth()+1; //January is 0!
//	var yyyy = today.getFullYear();
//
//	if(dd<10) {
//	    dd='0'+dd
//	} 
//
//	if(mm<10) {
//	    mm='0'+mm
//	} 
//
//	today = mm+'/'+dd+'/'+yyyy;
	//document.write(today);
	pool.connect();
	pool.query(sql, function(err, results) {
		if (err) {
			console.log("ERROR: " + err.message);
		}
		else {
			var price=results[0].rentAmount;
			console.log("The price is :- "+price);
			var sqlQuery='Insert into cart values(null,'+movieId+','+member+',SYSDATE(),1,'+price+')';
			console.log(sqlQuery);
			pool.query(sqlQuery, function(err, results) {
				if (err) {
					console.log("ERROR: " + err.message);
				}
				res.send("The call happened dude !!");
			});
		}
		
		

	});
	
};


exports.viewCart = function(req,res)
{
	var a = JSON.stringify(req.body);
	var json = JSON.parse(a);
	console.log("The json is like :"+json);
	var member=req.session.memberId;
	console.log("The meneber id is :"+member);
	var sql='select * from  cart where memberId='+member;
	console.log("The query being formed is :"+sql);
	var connectionPool = require('../database/connectionPooling');
	var pool = connectionPool.Pool();
	pool.query(sql, function(err, results) {
		if (err) {
			console.log("ERROR: " + err.message);
		}
		res.render('MemberCart.html', {memberCart : results});
	});
	
};


exports.proceedToPayment=function(req,res)
{
	var member=req.session.memberId;
	console.log("The meneber id is :"+member);
	var sql='select * from  cart where memberId='+member;
	console.log("The query being formed is :"+sql);
	var connectionPool = require('../database/connectionPooling');
	var pool = connectionPool.Pool();
	pool.query(sql, function(err, results) {
		if (err) {
			console.log("ERROR: " + err.message);
		}
		else 
			{
			
			var price = 0;
			var numRows = results.length;
			var quantity=numRows;
			console.log("Fetched -->"+numRows);
			for(var i=0;i<numRows;i++)
				{
				console.log("First"+results[i].price);
				price=price+results[i].price;
				}
			console.log("The total cost is :"+price);
			res.render('PaymentDetails.html', {memberId : req.session.memberId, issueDate : results[0].issueDate , totalQuantity :quantity , totalPrice:price});
			}
		
		
	});

};


exports.submitPayment=function(req,res)
{
	var type=null;
	var member=req.session.memberId;
	console.log("The meneber id is :"+member);
	var sql='select * from  cart where memberId='+member;
	console.log("The query being formed is :"+sql);
	var connectionPool = require('../database/connectionPooling');
	var pool = connectionPool.Pool();
	pool.query(sql, function(err, results) {
		if (err) {
			console.log("ERROR: " + err.message);
		}
		else
		{
			
			var sql2='select * from member where memberId='+member;
			console.log("The member ---------->"+member);
			var connectionPool = require('../database/connectionPooling');
			var pool = connectionPool.Pool();
			pool.connect();
			pool.query(sql2, function(err, results1) {
				if (err) {
					console.log("ERROR: " + err.message);
				}
				else
					{
//					if(results1[0].premiumMember == 'Y')
//						{
//						console.log("Setting the type to premium");
//						type= "premiummember";
//						}
//					else 
//						{
//						console.log("Setting the type to simple");
//						type="simplemember";
//						}
					}
				
				
				});
			
			var totalIssue=null;
			for ( var i = 0; i < results.length; i++) {
				var cartid = results[i].cartId;
				var movieId=results[i].movieId;
				var totalPrice = results[i].price;
				var quantity = results[i].quantity;
				var issueDate = results[i].issueDate;
				var memberId=results[i].memberId;
				var now = new Date(issueDate);
				var date = [ now.getFullYear(), now.getMonth() + 1, now.getDate() ];
				for ( var m = 1; m < 3; m++) {
					if (date[m] < 10) {
						date[m] = "0" + date[m];
					}
				}
				var currentDateFromed= date.join("-");
				var sql1 = 'insert into ordermovie values(null,' + movieId + ','
						+ memberId + ',\'' + currentDateFromed + '\',' + quantity + ','
						+ totalPrice + ',\'N\''+')';
				console.log("The sql " + sql1);
				pool.query(sql1, function(err, results) {
					if (err) {
						console.log("ERROR: " + err.message);
					}
					});
				var sql1 = 'Delete from cart where cartid=' + cartid;
				console.log("Deleting the SQL is : " + sql1);
				pool.query(sql1, function(err, results) {
					if (err) {
						console.log("ERROR: " + err.message);
					}

				  });
			}
			
			var sql8='select * from  ordermovie O, member M where O.memberId='+member+' and O.returned =\'N\'';
			console.log("The query being formed is :"+sql8);
			var connectionPool = require('../database/connectionPooling');
			var pool = connectionPool.Pool();
			pool.query(sql8, function(err, results) {
				if (err) {
					console.log("ERROR: " + err.message);
				}
				else
					{
				totalIssue=results.length;
				console.log("the total issued movies---> "+totalIssue);
				if(results[0].premiumMember == 'Y')
				{
				console.log("Setting the type to premium");
				type= "premiummember";
				}
			else 
				{
				console.log("Setting the type to simple");
				type="simplemember";
				}
				var anotherSQL='Update '+type+' SET totalIssuedMovies='+totalIssue+' where memberId='+member;
				console.log("query for updating the type --------------------------->"+anotherSQL);
				var connectionPool = require('../database/connectionPooling');
				var pool = connectionPool.Pool();
				pool.query(anotherSQL, function(err, results) {
					if (err) {
						console.log("ERROR: " + err.message);
					}
				});
				
					}
			});
			
		res.render('Thanks.html');	
		}
		
	});
};


exports.viewOrderHistory=function(req,res)
{
	var member=req.session.memberId;
	console.log("The meneber id is :"+member);
	var sql='select * from  ordermovie where memberId='+member;
	console.log("The query being formed is :"+sql);
	var connectionPool = require('../database/connectionPooling');
	var pool = connectionPool.Pool();
	pool.query(sql, function(err, results) {
		if (err) {
			console.log("ERROR: " + err.message);
		}
		else
			{
			res.render('OrderHistory.html',{orderHistory: results});
			}
	});
};


exports.UpgradeToPremium=function(req,res)
{
	var member=req.session.memberId;
	var sqlNew= 'Update member SET premiumMember=\'Y\' where memberId='+member;
	console.log("The query formed is "+sqlNew);
	var connectionPool = require('../database/connectionPooling');
	var pool = connectionPool.Pool();
	pool.query(sqlNew, function(err, results) {
		if (err) {
			console.log("ERROR: " + err.message);
		}
		else
			{
			res.render('UpgradePremium.html');
			}
	});
	

};

exports.verify = verify;
