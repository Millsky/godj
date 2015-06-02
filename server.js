var io = require('socket.io').listen(3000);
var uid = require('uuid');
var Room = require('./rooms.js');


var groupNameSpace = io.of('/groups');

var users = {};
var rooms = {};

groupNameSpace.on('connection',function(socket){
	console.log(socket.id);
  //When User Connects they are placed in a lobby    
	socket.join('lobby',function(){  
		users[socket.id] = {name: uid.v4(), room: null};
		socket.emit('groupsList',{groups:rooms});
	});

	socket.on('createGroup',function(groupName){
		//leave lobby || Current Group
		socket.leave('lobby');
		//generate uniqueid
		var id = uid.v4();
		//Create Room To BroadCast Events to
		socket.join(id,function(){
			var room = new Room(groupName, id, socket.id);
			rooms[id] = room;
			//NOW ADD THAT ROOM AS MA ROOM
			users[socket.id].room = id;
			//Make User DJ 
			users[socket.id].isDJ = true;
			//Add User to Room;
			rooms[id].people.push(users[socket.id]);
			//Set Room DJ as Owner 
			rooms[id].djList.push(socket.id);
			//Confirm Success 
			socket.emit('joinedGroup',{id:id,room:rooms[id]});
			//LET USERS KNOW A GROUP HAS BEEN ADDED
			console.log("EMITTIGN GROUPS EVENT");
			socket.to('lobby').emit('groupsList',{groups:rooms});
		});
		io.emit('groupsList',{groups:rooms});
	});
	
	socket.on('joinGroup',function(id){
		socket.leave('lobby');
		if(rooms[id] !== undefined){
		socket.join(id,function(){
			console.log("USER JOINED GROUP:" + id );
			rooms[id].people.push(users[socket.id]);
			users[socket.id].room = id;
			socket.emit('joinedGroup',{id:id,room:rooms[id]});
			socket.to(id).emit('newMember',rooms[id]);
			socket.to('lobby').emit('groupsList',{groups:rooms});
		});
		}
	});
	
	socket.on('playSong',function(){
		//EMIT TO ONLY ROOM IM IN
		if(users[socket.id].room !== null){
			var myRoomID = users[socket.id].room;
			//EMITS TO EVERYONE EXCEPT SENDER
			socket.to(myRoomID).emit('msg','HEY USERS');
		}
	});
	
	socket.on('pauseSong',function(){
		
	});
	
	socket.on('addSongPlayList',function(){
		
	});
	
	socket.on('removeSongPlayList',function(){
		
	});
	
	socket.on('addSongRoomPlayList',function(){
		if(users[socket.id].isDJ === true){
			//Allow user to add to room playlist
			
		}
	});
	
	socket.on('removeSongRoomPlayList',function(){
		
	});
	
	socket.on('getUsersRoom',function(){
		
	});
	
	/* USER IF DJ CAN PLAY SONG */
   socket.on('disconnect', function() {
      console.log('Got disconnected!');
	  if(users[socket.id].room != null){
	   console.log("HAS ROOM");
	   var roomID = users[socket.id].room;
	  if(rooms[roomID].owner == socket.id){
	  	delete rooms[roomID];
	  }else{
		  //JUST REMOVE USER FROM ROOM
		  rooms[roomID].removePerson(socket.id);
	  }
	  }
      delete users[socket.id];
   });

});