function loginCtrl($scope, $rootScope, $location, Auth, $http, $window, User){


	$scope.facebookLogin = function () {
    if(!window.cordova) {
      facebookConnectPlugin.browserInit('1493228840925351');
    }
    facebookConnectPlugin.login(["public_info", "email"], function(response){
      User.authorizeFacebook({email: response.email, uid: response.id, first_name: response.first_name, last_name: response.last_name}, function(user){
        localStorage.currentUser = JSON.stringify(user);
        $rootScope.currentUser = JSON.parse(localStorage.currentUser);
        $http.defaults.headers.common["X-User-Email"]= $rootScope.currentUser.email;
        $http.defaults.headers.common["X-User-Token"]= $rootScope.currentUser.authentication_token;
        $location.path("/categories");
        console.log($rootScope.currentUser);
      });
    })
	}



	$scope.credentials = {};
	$scope.login = function(){
		Auth.login($scope.credentials).then(function(user) {
			localStorage.currentUser = JSON.stringify(user.user);
			$rootScope.currentUser = JSON.parse(localStorage.currentUser);
			$http.defaults.headers.common["X-User-Email"]= $rootScope.currentUser.email;
			$http.defaults.headers.common["X-User-Token"]= $rootScope.currentUser.authentication_token;
			$location.path("/categories");
			console.log(user.user);
  	}, function(error) {
			console.log("In errors.");
      // Authentication failed...
  	});
	}

}
