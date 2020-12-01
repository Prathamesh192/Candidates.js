const express = require('express');
const bodyParser = require('body-parser');
//const logger =require('logger');
//const cookieParser = require('cookie-parser');
const mysql = require('mysql');
 

const app = express();
const POrt = 8080;
const path = require('path');
const { Buffer } = require('buffer');


//app.use(logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({extended:true}));

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);
//app.use(cookieParser());


app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'views','view.html'))});

app.get('/result',function(req,res){
  res.send('result page');
})


app.post('/result',function(req,res){
  //res.redirect("/averre");

   res.sendfile(path.join(__dirname,'views','newview.html'))
   var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"candi"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO candinfo(Name,Email,First,Second,Third) values ('"+ req.body.name +"','"+ req.body.email +"','"+ req.body.First +"','"+ req.body.Second +"','"+ req.body.Third +"')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("data is entered");
      

    });
  });  
});


app.get('/averre',function(req,res){
  
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:"candi"
 });
 
  
  con.connect(function(err) {
   if (err) throw err;
   console.log("Connected!");
  
  var sql1 = "SELECT AVG(First) AS average FROM candinfo; ";
  console.log('query executed');
    
     con.query(sql1, function (err, result) {
       if (err) throw err;
       
       
       var myjson = JSON.stringify(result);
       
       res.set('Content-Type','test.html');
       res.write(new Buffer('<h2>"'+ myjson +'"</h2>'));
       
      
       console.log("data is gathered");
       console.log(result)
       res.end();
 
     });

 

 });

})

app.get('/secondav',function(req,res){
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:"candi"
 });
 
  
  con.connect(function(err) {
   if (err) throw err;
   console.log("Connected!");
  
  var sql1 = "SELECT AVG(Second) As Second FROM candinfo; ";
  console.log('query executed');
    
     con.query(sql1, function (err, result1) {
       if (err) throw err;
       
       
       var myjson1 = JSON.stringify(result1);
       
       res.set('Content-Type','test2.html');
       res.write(new Buffer('<h2>"'+ myjson1 +'"</h2>'));
       
      
       console.log("data is gathered");
       
       res.end();
 
     });

 

 });

})

app.get('/thirdav',function(req,res){
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"candi"
   });
   
    
    con.connect(function(err) {
     if (err) throw err;
     console.log("Connected!");
    
    var sql1 = "SELECT AVG(Third) As Third FROM candinfo; ";
    console.log('query executed');
      
       con.query(sql1, function (err, result2) {
         if (err) throw err;
         
         
         var myjson2 = JSON.stringify(result2);
         
         res.set('Content-Type','test3.html');
         res.write(new Buffer('<h2>"'+ myjson2 +'"</h2>'));
         
        
         console.log("data is gathered");
         
         res.end();
   
       });
  
   
  
   });
  
  })

  app.get('/firsthigh',function(req,res){
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database:"candi"
     });
     
      
      con.connect(function(err) {
       if (err) throw err;
       console.log("Connected!");
      
      var sql1 = "SELECT Name, MAX(First) as first_round FROM candinfo; ";
      console.log('query executed');
        
         con.query(sql1, function (err, result3) {
           if (err) throw err;
           
           
           var myjson3 = JSON.stringify(result3);
           
           res.set('Content-Type','test3.html');
           res.write(new Buffer('<h2>"'+ myjson3 +'"</h2>'));
           
          
           console.log("data is gathered");
           
           res.end();
     
         });
    
     
    
     });
    
    })

    app.get('/secondhigh',function(req,res){
      var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database:"candi"
       });
       
        
        con.connect(function(err) {
         if (err) throw err;
         console.log("Connected!");
        
        var sql1 = "SELECT Name, MAX(Second) as Second_Round FROM candinfo; ";
        console.log('query executed');
          
           con.query(sql1, function (err, result4) {
             if (err) throw err;
             
             
             var myjson4 = JSON.stringify(result4);
             
             res.set('Content-Type','test4.html');
             res.write(new Buffer('<h2>"'+ myjson4 +'"</h2>'));
             
            
             console.log("data is gathered");
             
             res.end();
       
           });
      
       
      
       });
      
      })
      app.get('/thirdhigh',function(req,res){
        var con = mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "",
          database:"candi"
         });
         
          
          con.connect(function(err) {
           if (err) throw err;
           console.log("Connected!");
          
          var sql1 = "SELECT Name, MAX(Third) as Third_Round FROM candinfo; ";
          console.log('query executed');
            
             con.query(sql1, function (err, result5) {
               if (err) throw err;
               
               
               var myjson5 = JSON.stringify(result5);
               
               res.set('Content-Type','test5.html');
               res.write(new Buffer('<h2>"'+ myjson5 +'"</h2>'));
               
              
               console.log("data is gathered");
               
               res.end();
         
             });
        
         
        
         });
        
        })



app.listen(POrt,()=>{console.log('server started',POrt)});
 