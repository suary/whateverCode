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
const server = function(req, res,connection) {
  
  var arg = URL.parse(req.url, true).query;  
  var path=URL.parse(req.url, true).path
  console.log(arg)
  res.statusCode = 200;
  var skipcount = parseInt(arg.skipcount)
  var pagesize = parseInt(arg.pagesize)
  var querystr='SELECT * FROM `user` WHERE `user` = ?'
  var data={}
  connection.query(querystr,[arg.username], function (error, results, fields) {
      console.log('inpass:'+arg.password);
      console.log('form'+results)
      console.log(111)
      if (results&&(results[0].password==arg.password)) {
          data.result='success';
      }else{
          data.result='error';
      }
    data.data=results[0].partyid;
    res.setHeader('Content-Type', 'text/plain');
    res.write(JSON.stringify(data))
    res.end();
  });
  
};
exports.server = server;