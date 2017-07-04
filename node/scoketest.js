
var io = require('socket.io')(880);

console.log('connect success')


io.on('connection', function (socket) {
    console.log('acc')
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
  socket.on('input event', function (data) {
    console.log(454545445454);
    socket.emit('new message',data);
  });
});
var chat = io
  .of('/chat')
  .on('connection', function (socket) {
      console.log(socket)
    socket.emit('new message', {
        that: 'only'
      , '/chat': 'will get'
    });
    socket.on('input event', function (data) {
        console.log(444);
        chat.emit('new message',data);
    });
    chat.emit('new message', {
        everyone: 'in'
      , '/chat': 'will get'
    });
  });
var newscount=0
var news = io
  .of('/news')
  .on('connection', function (socket) {
        newscount=newscount+1
        if(newscount==1){
            news.emit('userinfo',{usertype:'whiteuser'});
        }else if(newscount==2){
            news.emit('userinfo',{usertype:'blackuser'});
        }else{
            news.emit('userinfo',{usertype:'watcher'});
        }
        news.emit('new message',{name:'当前房间人数',text:newscount});
        socket.on('input event', function (data) {
            console.log(444);
            news.emit('new message',data);
        });
        socket.on('disconnect', function () { 
            newscount=newscount-1
            news.emit('new message',{name:'当前房间人数',text:newscount});
        });
  })
  .on('disconnection', function (socket) {
        newscount=newscount-1
        socket.on('input event', function (data) {
        console.log(444);
        news.emit('new message',data);
        socket.on('disconnect', function () { 
            newscount=newscount-1
        });
    });
  });