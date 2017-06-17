const http = require('http');
const URL = require('url');


const server = function(req, res , connection) {
  var arg = URL.parse(req.url, true).query;
  res.statusCode = 200;
  var querystr='UPDATE `userinfo` SET `isactive` = 0 WHERE `id` = ? and `text`=?'
  var data={}
  connection.query(querystr,[arg.id,arg.text], function (error, results, fields) {
    
    if(results.length){
        data.results='success'
        data.data=results;
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