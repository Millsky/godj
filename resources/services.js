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

godjServices.service('client',['$q',function($q){
	var def = $q.defer();
	var promise = def.promise;
	var youtube = {};
	var clientID = "196223678939-h5k9rroarlrv5o6id30n33i28vdc19vo.apps.googleusercontent.com";
    var apiKey = "AIzaSyDnBgVivSpKRRTFCQRX0ZEhOjDIqiYmGhQ";
    window.setTimeout(function () {
        try {
            checkAuth();
        }catch(e){
            window.setTimeout(function () {
                checkAuth();
            },100);
        }
    },100);
    
    function checkAuth(){
        gapi.client.setApiKey(apiKey);
        gapi.client.load('youtube','v3', function () {
            def.resolve(gapi.client.youtube);
        });
    }
	return{
		p:promise
	}
}]);