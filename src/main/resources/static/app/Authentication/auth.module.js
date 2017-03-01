(function() {
  var app = angular.module('myApp.auth.module');

  app.service('AuthService', function() {
    return {
      user : null
    }
  });

  app.controller('loginCtrl', function ($http, $q, $scope, $state, $mdToast, AuthService, $rootScope) {

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
          //console.log(res);
          $scope.password = null;
          // checking if the token is available in the response
          if (res.data.token) {
            console.log("Successful Login");
            $scope.toastFailedLogin();
            $scope.message = 'Successful Login';
            // setting the Authorization Bearer token with JWT token
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token;
            localStorage.setItem('token', res.data.token);
            
            // setting the user in AuthService
            AuthService.user = res.data.user;
            // transform user object to string for storing in local storage 
            localStorage.setItem('user', JSON.stringify(res.data.user));
            
            $rootScope.$broadcast('LoginSuccessful');
            // going to the home page
            $state.go('home.gettingstarted');
          } else {
            // if the token is not present in the response then the
            // authentication was not successful. Setting the error message.
            console.log("Inside the login then else");
            $scope.error = 'Username or password is incorrect';
          }/*, function errorCallback(res){
            $scope.message = 'Authetication Failed !';
          }*/
        }).then(function errorCallback(error) {
          // if authentication was not successful. Setting the error message.
          console.log("Failed to login");
          $scope.error = 'Username or password is incorrect';
          $scope.toastFailedLogin();
        });
      };

    $scope.toastFailedLogin = function() {
      $mdToast.show(
        $mdToast.simple()
          .textContent('Username or password is incorrect')
          .hideDelay(3000)
      );
    }; 
  });

})();