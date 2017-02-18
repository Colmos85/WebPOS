(function(){
  'use strict';

  /* reference to module */
 angular.module('myApp.products.module')

    .controller('productsCtrl', [
      '$rootScope',
      '$log',
      '$http',
      '$state',
      '$scope',
      '$timeout',
      '$location',
      '$mdDialog',
      '$resource',
      'productsFactory',

      function ($rootScope, $log, $http, $state, $scope, 
                $timeout, $location, $mdDialog, $resource, productsFactory) {

        //$scope.oneProduct = productsFactory.get({id: 1});
        //var allProducts = productsFactory.query(console.log);

        //$scope.products = null;
        //$scope.products = productsFactory.allProducts;
        //$scope.products = productsFactory.getProducts();

        $scope.products = productsFactory.getProducts();//productsFactory.getAllProducts();

        $scope.test = function(productId) {
        	$scope.products = productsFactory.getProducts();
            //$scope.products = productsFactory.getAllProducts();
            //$scope.oneProduct = productsFactory.get({id: productId});
            //$scope.products = productsFactory.query(function(){
            //    console.log("Length of array AFTER BUTTON PRESS : ", $scope.products.length);
            //});
            
        };

        /*$http.get('http://localhost:8080/products/').
        then(function(response) {
            $scope.products = response.data;
        });*/

        




        $scope.openDialog = function(){

        $mdDialog.show({
          controller: function($scope, $mdDialog){
            // do something with dialog scope
          },
          template: '<md-dialog aria-label="My Dialog">'+
                        '<md-dialog-content class="sticky-container">Blah Blah' +
                        '</md-dialog-content>' +
                        '<md-button ng-click=close()>Close</md-button>' +
                        '</md-dialog>',
          targetEvent: event
        });
      };

      $scope.openProductForm = function(event) {
        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'app/products/productForm.html',
          parent: angular.element(document.body),
          targetEvent: event,
          clickOutsideToClose:true,
          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          scope.status = 'You cancelled the dialog.';
        });
      };

      function DialogController($scope, $mdDialog) {
        $scope.hide = function() {
          $mdDialog.hide();
        };

        $scope.cancel = function() {
          $mdDialog.cancel();
        };

        $scope.answer = function(answer) {
          $mdDialog.hide(answer);
        };
      };


      $scope.helloWorld = function(){
        console.log("Hello from productsCtrl");
      };



    }])

    .controller('brandsCtrl', [
      '$rootScope',
      '$log',
      '$state',
      '$timeout',
      '$location',
      'productsFactory',

       function($scope) {
      $scope.user = {
        title: 'Developer',
        email: 'ipsum@lorem.com',
        firstName: '',
        lastName: '',
        company: 'Google',
        address: '1600 Amphitheatre Pkwy',
        city: 'Mountain View',
        state: 'CA',
        biography: 'Loves kittens, snowboarding, and can type at 130 WPM.\n\nAnd rumor has it she bouldered up Castle Craig!',
        postalCode: '94043'
      };

      $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
      'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
      'WY').split(' ').map(function(state) {
          return {abbrev: state};
        });
/*    .config(function($mdThemingProvider) {

      // Configure a dark theme with primary foreground yellow

      $mdThemingProvider.theme('docs-dark', 'default')
        .primaryPalette('yellow')
        .dark();

    });*/

      }])
      .config(function($mdThemingProvider) {

      // Configure a dark theme with primary foreground yellow

      $mdThemingProvider.theme('docs-dark', 'default')
        .primaryPalette('yellow')
        .dark();

    })

})();