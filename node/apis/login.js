const http = require('http');
const URL = require('url');

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