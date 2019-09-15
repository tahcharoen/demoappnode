var connect = require('./config/db.js');
var con = connect.DB.instance();

var express = require('express');
var fs = require('fs');
var app = express();
var vue = require('vue');

// เมื่อมีการใช้ Method POST From
var body = require('body-parser');
app.use(body.urlencoded({extended: true}));
app.use(body.json());  
// เมื่อมีการใช้ Method POST From

app.set('view engine','ejs');

app.get('/home/:title',function(req,res){
	var data = {name:'Tah',lname:'Charoen'}
	res.render('profile',{data:data,title:req.params.title});
});


app.get('/contact',function(req,res){
	res.sendFile(__dirname+'/views/myform.html');
	
});

// รับ Data แบบ GET
app.get('/senddata',function(req,res){
	var data = {name:'Email:',lname:req.query.email}
	res.render('profile',{data:data,title:req.params.title});
	//res.end(req.query.email);
});


// รับ Data แบบ POST
app.post('/senddatapost',function(req,res){
	var data = {name:'Email:',lname:req.body.email}
	res.render('profile',{data:data,title:req.body.name});
	console.log(req.body);
	//res.end(req.query.email);
});



app.get('/listdata',function(req,res){

	con.connect(function(err) {
	 
	  var sql = "SELECT fname_gb,lname_gb,m_login FROM member_info LIMIT 1000";  
	  con.query(sql, function (err, result) {
	    
	    res.render('listdata',{data:result});

	   
	  });
	});
	
	
});

app.listen(9000);