const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const mysql = require('mysql');
const fastcsv = require("fast-csv");
const fs = require("fs");
const ws = fs.createWriteStream("bezkoder_mysql_fastcsv.csv");

const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/registration.html");
});

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'registration'
});

connection.connect(function(err){
  if(err)
  throw err
  else
  console.log("connected")
})

connection.query("SELECT * FROM registration LIMIT 10", function (err, result, fields) {
  if (err) throw err;

    const jsonData = JSON.parse(JSON.stringify(data));
    console.log("jsonData", jsonData);

    fastcsv
      .write(jsonData, { headers: true })
      .on("finish", function() {
        console.log("Write to bezkoder_mysql_fastcsv.csv successfully!");
      })
      .pipe(ws);
  });


app.post("/",function(req,res){

var name =req.body.name
var roll=req.body.roll
var email=req.body.email
var phone=req.body.phone
var address=req.body.address

var sqla="INSERT INTO registration VALUES(null,'"+name +"','"+ roll +"','"+email+"','"+phone +"','"+address+"')"
connection.query(sqla,function(err,result){
  if(err)
  res.sendFile(__dirname+"/failure.html");
console.log(result)
//res.sendFile(__dirname+"/success.html");
})


connection.end()

})
app.listen(process.env.PORT || 3000,function(){
  console.log("Server running at port 3000");
});
