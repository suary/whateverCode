const http = require('http');
const URL = require('url');
const hostname = '127.0.0.1';
const port = 3000;
var api={}
api.insert= require('./apis/insertnode.js');
//database
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '192.168.0.103',
  user     : 'root',
  password : '',
  database : 'suary'
});
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

// connection.end(function(err) {
//   if (err) {
//     console.error(err.stack);
//     return;
//   }
//   console.log('stop success ' + connection.threadId);
// });


//server
const server = http.createServer((req, res) => {
    var path=URL.parse(req.url, true).pathname
    var deal= require('.'+path+'.js');
    deal.server(req, res ,connection);
});
server.listen(port, hostname, () => {
  console.log(`服务器运行在 http://${hostname}:${port}/`);
});