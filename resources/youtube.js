/**
 * Created by millsky on 6/21/15.
 */
var youtube = angular.module('youtube',[]);


youtube.service('youtubeFactory',['$q',function($q){
    var youtube = $q.defer();
    var OAUTH2_CLIENT_ID = '196223678939-h5k9rroarlrv5o6id30n33i28vdc19vo.apps.googleusercontent.com';
    var OAUTH2_SCOPES = [
        'https://www.googleapis.com/auth/youtube'
    ];

    googleApiClientReady = function() {
        console.log(gapi);
        if(gapi.hasOwnProperty('auth') === true){
            init();
        }else{
            window.setTimeout(init(),100);
        }
        function init(){
            gapi.auth.init(function () {
                window.setTimeout(checkAuth, 1);
            });
        }
    }

    function checkAuth() {
        gapi.auth.authorize({
            client_id: OAUTH2_CLIENT_ID,
            scope: OAUTH2_SCOPES,
            immediate: true
        }, handleAuthResult);
    };

    function handleAuthResult(authResult) {
        if (authResult && !authResult.error) {
            // Authorization was successful. Hide authorization prompts and show
            // content that should be visible after authorization succeeds.
            loadAPIClientInterfaces();
        } else {
            // Make the #login-link clickable. Attempt a non-immediate OAuth 2.0
            // client flow. The current function is called when that flow completes.

            gapi.auth.authorize({
                client_id: OAUTH2_CLIENT_ID,
                scope: OAUTH2_SCOPES,
                immediate: false
            }, handleAuthResult);

        }
    }

    function loadAPIClientInterfaces() {
        gapi.client.load('youtube', 'v3', function() {
            handleAPILoaded();
        });
    }

    function handleAPILoaded(){
        console.log("API LAODED");
        youtube.resolve({youtube:gapi.client.youtube});
    }

    function getYoutube(){
        //YOUTUBE IS NOT DEFINED IN MEM;
        if(!gapi.hasOwnProperty('youtube')){
            console.log("Youboob not defined getting");
            googleApiClientReady();
            return youtube.promise;
        }else{
            return {youtube:gapi.client.youtube};
        }
    }

    return {
        get: getYoutube,
    }
}]);

