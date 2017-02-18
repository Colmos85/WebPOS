(function(){
  'use strict';

  /* reference to module */
 angular.module('myApp.cashier.module')

    .controller('cashierCtrl', [
      '$rootScope',
      '$scope',
      '$log',
      '$state',
      '$timeout',
      '$location',
      '$mdDialog',
      '$resource',
      'cashierFactory',
      'allProducts',

      function ($rootScope, $scope, $log, $state, 
                $timeout, $location, $mdDialog, $resource, cashierFactory/*, allProducts*/) {


/*        $scope.test = function(productId) {
            $scope.oneProduct = cashierFactory.get({id: productId});
            $scope.products = cashierFactory.query(function(){
                console.log("Length of array AFTER BUTTON PRESS : ", scope.products.length)
            });
            //scope.products = productsFactory.query(console.log);
        };


        var allProducts = cashierFactory.query(function(){
            console.log("Length of array : ", allProducts.length);
            console.log(allProducts);
        });*/

        //console.log("Logs: " , allProducts);
        $scope.products = cashierFactory.query(console.log);

        //$scope.products = allProducts;

        $scope.oneProduct = cashierFactory.get({id: 1});
        $scope.test = function() {
            $scope.oneProduct = cashierFactory.get({id: productId});
            //$scope.products = allProducts;
            /*$scope.products = cashierFactory.query(function(){
                console.log("Length of array AFTER BUTTON PRESS : ", $scope.products.length)
            });*/
            $scope.products = productsFactory.query(console.log);


            //$scope.products = allProducts;
        };



      }])


})();