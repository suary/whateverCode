const http = require('http');
const URL = require('url');

// connection.connect(function(err) {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   }
//   console.log('connected as id ' + connection.threadId);
// });

// connection.end(function(err) {
//   if (err) {
//     console.error(err.stack);
//     return;
//   }
//   console.log('stop success ' + connection.threadId);
// });




//server
var add=function(){
  return 3
}
const server = function(req, res,connection) {
  
  var arg = URL.parse(req.url, true).query;  
  console.log(arg)
  res.statusCode = 200; 
  var times=new Date();
  times=times.toLocaleString()
  console.log(times)
  connection.query('INSERT INTO hellodata SET ?',{id:arg.id,text:arg.text,time:times}, function (error, results, fields) {
    results=JSON.stringify(results)
    res.setHeader('Content-Type', 'text/plain');
    res.write(results)
    res.end();
  });
  
};
exports.server = server;