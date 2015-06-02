var godjServices = angular.module('godj.services',['btford.socket-io']);

godjServices.factory('socket',function(socketFactory){
	return socketFactory({
		ioSocket: io.connect('localhost:3000/groups')
	});
});

godjServices.factory('persistLayer',function(){
	var services = (function(){
		var userInfo = (function(){
						var data = {};
			var get = function(){
				return data;
			};
			
			var set = function(v){
				data = v;
			};
			
			return{
				get: get,
				set: set
			}
		})();
		var roomInfo = (function(){
			var data = {};
			var get = function(){
				return data;
			};
			
			var set = function(v){
				data = v;
			};
			
			return{
				get: get,
				set: set
			}
		})();
			
		return{
			user:userInfo,
			room:roomInfo
		}
	})();
	return services;
});

godjServices.service('searchSongs',function(){
	
});