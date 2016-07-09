var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});
io.on('connection', function(socket){
	socket.on('register',function(name){
	io.emit('start',{'jsonmsg':''+name+' is now CONNECTED. Say Hello!'});
	});
	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});
	console.log('a user connected');
	socket.on('disconnect', function(){
		console.log('user disconnected');
		io.emit('finish',{'jsonmsg':'1 of the users DISCONNECTED!!'});
	});
});
http.listen(3000, function(){
	console.log('listening on *: 3000');
});