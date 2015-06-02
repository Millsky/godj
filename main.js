/* CONNECT TO SERVER */
var socket = io('http://localhost:3000');
socket.on('connected',function(data){
	console.log("IM CONNECTED");
});

socket.on('groupsList',function(data){
	console.log(data);
});

