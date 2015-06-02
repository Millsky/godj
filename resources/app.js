var godj = angular.module('godj',['godj.controllers','btford.socket-io','godj.services','ui.router']);
godj.config(function($stateProvider,$urlRouterProvider){
	$urlRouterProvider.otherwise('lobby');
	$stateProvider
		.state('lobby',{
			url:"/lobby",
			templateUrl:"templates/lobby.html"
		})
		.state('room',{
			url:"/room/:roomID",
			templateUrl:"templates/room.html"
		})
});
