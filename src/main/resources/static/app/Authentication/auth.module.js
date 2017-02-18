(function() {
  var app = angular.module('myApp.auth.module');

  app.service('AuthService', function() {
    return {
      user : null
    }
  });

  app.controller('loginCtrl', function ($http, $q, $scope, $state, AuthService, $rootScope) {

    $scope.login = function() {
        // requesting the token by usename and passoword
        $http({
          url : 'authenticate',
          method : "POST",
          params : {
            username : $scope.username,
            password : $scope.password
          }
        }).then(function successCallback(res) {
          console.log(res);
          $scope.password = null;
          // checking if the token is available in the response
          if (res.data.token) {
            console.log("Inside the login :", res.data.user.firstName);
            $scope.message = 'Successful Login - Token received';
            // setting the Authorization Bearer token with JWT token
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token;

            // setting the user in AuthService
            AuthService.user = res.data.user;
            console.log("user assigned to: ", AuthService.user.firstName);
            $rootScope.$broadcast('LoginSuccessful');
            // going to the home page
            $state.go('home.gettingstarted');
          } else {
            // if the token is not present in the response then the
            // authentication was not successful. Setting the error message.
            console.log("Inside the login then else");
            $scope.message = 'Authetication Failed !';
          }/*, function errorCallback(res){
            $scope.message = 'Authetication Failed !';
          }*/
        })/*.error(function(error) {
          // if authentication was not successful. Setting the error message.
          $scope.message = 'Authetication Failed !';
        })*/;
      };
  });

})();