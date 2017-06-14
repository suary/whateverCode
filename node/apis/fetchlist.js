const http = require('http');
const URL = require('url');

//database
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '192.168.0.104',
  user     : 'root',
  password : '',
  database : 'suary'
});

var add=function(){
  return 3
}
const server = function(req, res) {
  
  var arg = URL.parse(req.url, true).query;  
  var path=URL.parse(req.url, true).path
  console.log(arg)
  res.statusCode = 200;
  var skipcount = parseInt(arg.skipcount)
  var pagesize = parseInt(arg.pagesize)
  if(arg.id){
    var querystr='SELECT * FROM `hellodata` WHERE `id` like ? or `text` like ? '
  }else{
    var querystr='SELECT * FROM `hellodata`'
  }
  var data={}
  console.log(data)
  connection.query(querystr,['%'+arg.id+'%','%'+arg.id+'%'], function (error, results, fields) {
    data.count=results.length
    data.data=JSON.stringify(results)
    console.log(data)
  });
  connection.query(querystr+('limit '+skipcount+','+pagesize),['%'+arg.id+'%','%'+arg.id+'%'], function (error, results, fields) {
    data.data=JSON.stringify(results)
    res.setHeader('Content-Type', 'text/plain');
    res.write(JSON.stringify(data))
    res.end();
  });
  
};
exports.server = server;