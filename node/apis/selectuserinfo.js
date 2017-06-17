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
const server = function(req, res , connection) {
  var arg = URL.parse(req.url, true).query;
  res.statusCode = 200;
  var querystr='SELECT * FROM `userinfo` WHERE `partyid` = ?'
  var data={}
  connection.query(querystr,[arg.partyid], function (error, results, fields) {
    
    if(results.length){
        data.results='success'
        data.data=results[0];
    }else{
        data.results='error'
        data.data='';
    }
    
    res.setHeader('Content-Type', 'text/plain');
    res.write(JSON.stringify(data))
    res.end();
  });
  
};
exports.server = server;