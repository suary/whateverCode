const http = require('http');
const URL = require('url');


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