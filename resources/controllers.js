var godjControllers = angular.module('godj.controllers',[]);
godjControllers.controller('lobby',['$scope','socket','$state','persistLayer','client',function($scope,socket,$state,persistLayer,client){


	$scope.groups = [];
	$scope.groupName = "";
	$scope.groupID = "";

	$scope.addGroup = function(){
		socket.emit('createGroup',$scope.groupName);
	};

	$scope.joinGroup = function(){
		socket.emit('joinGroup',$scope.groupName);
	}

	socket.on('groupsList',function(data){
		transFormObj(data.groups);
	});

	socket.on('joinedGroup',function(groupObj){
		//SET ROOM INFO
        persistLayer.room.set(groupObj.room);
		$state.go("room",{roomID:groupObj.id});
	});

	var transFormObj = function(d){
		var groupKeys = Object.keys(d);
		for(i=0;i<groupKeys.length;i++){
			$scope.groups.push(d[groupKeys[i]]);
		}
		console.log($scope.groups);
	};
	
}]);
godjControllers.controller('room',['$scope','socket','persistLayer',function($scope,socket,persistLayer){
	socket.on('msg',function(d){
		console.log(d);
	});
	$scope.broadcaster = function(){
		socket.emit('playSong');	
	};
	socket.on('newMember',function(d){
		$scope.group = d;
	});
	//ADD PERSISTENCE FOR STUFF
	$scope.group = persistLayer.room.get();
	
}]);

godjControllers.controller('playList',['$scope',function($scope){
	
	
}]);

godjControllers.controller('search',['$scope','client',function($scope,client){

	$scope.client = {};

	client.p.then(function (data) {
		$scope.client = data;
	});

	$scope.results = [];
	$scope.playList = [];
	$scope.searchParams = "";

	$scope.search = function () {
		var searchQuery = $scope.client.search.list({
			q: $scope.searchParams,
			part: 'snippet'
		});
		searchQuery.execute(function (resp) {
			$scope.$apply(function () {
				$scope.results = resp.items;
			});
			console.log(resp);
		});

	};

	$scope.addSong = function(index){
		$scope.playList.push($scope.results[index]);
	};
	$scope.removeSong = function(index){
		$scope.playList.splice(index,1);
	};
}]);

godjControllers.controller('loginGate',['$scope',function($scope){

}]);