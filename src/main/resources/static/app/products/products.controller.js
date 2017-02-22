(function(){
  'use strict';

  /* reference to module */
 angular.module('myApp.products.module')

    .controller('productsCtrl', [
      '$rootScope',
      '$log',
      '$http',
      '$q',
      '$state',
      '$scope',
      '$timeout',
      '$location',
      '$mdDialog',
      '$resource',
      'productsFactory',
      'storesFactory',

      function ($rootScope, $log, $http, $q, $state, $scope, 
                $timeout, $location, $mdDialog, $resource, productsFactory, storesFactory) {
    	  
    	var vm = this;

      // Load stores 
      storesFactory.initLoadStores().then(function successCallback(result){
          vm.stores=result.data;
      });
    	
      // Load products 
      productsFactory.getAllProducts().then(function successCallback(result){
          vm.products=result.data;
      });

      // Load products 
/*      productsFactory.getAllProducts().then(function(data) {
        vm.products = data;
      });*/
    	// Load products 
/*      $http({
            method : 'GET',
            url : 'products/'
        }).then(function successCallback(response) {
        	console.log("prod: success response Data: ", response.data);
        	vm.products = response.data;
        }, function errorCallback(response) {
            console.log(response.statusText);
      });*/
    	
    	vm.reload = function(productId) {
        vm.stores = storesFactory.getAllStores();
    		vm.products = productsFactory.getAllProducts();
      };

      vm.getStoreQuantity = function(storeStock, productStock)
      {
        var quantity = 0;
        for (var i = 0, len = storeStock.length; i < len; i++) {
          for(var j = 0, len1 = productStock.length; j < len1; j++){
            if (storeStock[i].id === productStock[j].id) {
              return storeStock[i].quantity;
            }
          }
          
        }  

        return quantity;
      }
    	
/*    	vm.products = [];
        function getAllProductsNew() {
          var getProductsData = productsFactory.getProducts();

          getProductsData.then(function (post) {
             vm.products = post.data;

          }, function () {
             alert('Error in getting post records');
          });
        }
              
        getAllProductsNew();*/

/*        //$scope.oneProduct = productsFactory.get({id: 1});
        //var allProducts = productsFactory.query(console.log);

        //$scope.products = null;
        //$scope.products = productsFactory.allProducts;
        //$scope.products = productsFactory.getProducts();

        $scope.products = productsFactory.getAllProducts(); //productsFactory.getProducts();
    	vm.products = [];
        
    	vm.hello = "Hello buddy!!!";
        
    	vm.test = function(productId) {
        	//$scope.products = productsFactory.getProducts();
            //$scope.products = productsFactory.getAllProducts();
            //$scope.oneProduct = productsFactory.get({id: productId});
            //$scope.products = productsFactory.query(function(){
            //    console.log("Length of array AFTER BUTTON PRESS : ", $scope.products.length);
            //});
        	
        	$http({
                method : 'GET',
                url : 'products/'
            }).then(function successCallback(response) {
            	console.log("Controller http request: ", response);
            	vm.products = response.data;
            	return vm.products;
            	console.log("Length of array: ", vm.products.length);
            }, function errorCallback(response) {
                console.log(response.statusText);
            });
            
        };*/

        vm.openDialog = function(){
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

	     vm.openProductForm = function(event) {
	        $mdDialog.show({
	          controller: DialogController,
	          templateUrl: 'app/products/productForm.html',
	          parent: angular.element(document.body),
	          targetEvent: event,
	          clickOutsideToClose:true,
	          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
	        })
	        .then(function(answer) {
	          $scope.status = 'Product Saved "' + answer + '".';
	        }, function() {
	          $scope.status = 'You cancelled the dialog.';
	        });
	     };

       function DialogController($scope, $mdDialog) {
          $scope.hide = function() {
            $mdDialog.hide();
          };
  
          $scope.cancel = function() {
            $mdDialog.cancel();
          };

          $scope.clear = function() {
            //$mdDialog.cancel();
            // set all model variables to "";
          };
  
          $scope.save = function(answer) {
            $mdDialog.hide(answer);
          };
       };

	     
    }]) // END OF productsCtrl

    .controller('prodFormCtrl', [
      '$rootScope',
      '$log',
      '$http',
      '$q',
      '$state',
      '$scope',
      '$timeout',
      '$location',
      '$mdDialog',
      '$resource',
      'productsFactory',
      'storesFactory',

      function ($rootScope, $log, $http, $q, $state, $scope, 
                $timeout, $location, $mdDialog, $resource, productsFactory, storesFactory) {

        /*$scope.product = {
          barcode : '',
          description : ''
        }*/

      }]) 
  
      .controller('brandsCtrl', [
        '$rootScope',
        '$scope',
        '$log',
        '$mdDialog',
        'brandsFactory',

        function($rootScope, $scope, $log, $mdDialog, brandsFactory) {

          var vm = this;

          // Load Brands
          brandsFactory.getAllBrands().then(function successCallback(result){
              vm.brands = result.data;
              console.log("Success load brands into Controller");
              }, function errorCallback(response) {
              console.log("Unsuccessful - load brands into Controller");
          });

          vm.openBrandForm = function(event) {
            $mdDialog.show({
              controller: DialogController,
              templateUrl: 'app/products/brandForm.html',
              parent: angular.element(document.body),
              targetEvent: event,
              clickOutsideToClose:true,
              fullscreen: false // Only for -xs, -sm breakpoints.
            })
            .then(function(answer) {
              $scope.status = 'Product Saved "' + answer + '".';
            }, function() {
              $scope.status = 'You cancelled the dialog.';
            });
          };

          function DialogController($scope, $mdDialog, brandsFactory) {
            $scope.hide = function() {
              $mdDialog.hide();
            };
    
            $scope.cancel = function() {
              $mdDialog.cancel();
            };

            $scope.clear = function() {
              //$mdDialog.cancel();
              // set all model variables to "";
            };
    
            $scope.save = function(answer) {

              var brand = {
                brandName : $scope.brand.brandName
              };

              brandsFactory.insertBrand(brand).then(function(response) {
                console.log(response.data);
                brand.id = response.data.id;
              });
              console.log("Brand with id?", brand);

              vm.brands.push(brand);

              $mdDialog.hide(answer);
            };

          }; // END OF DialogController

/*          // Method for adding brand on click save brand in form        
          vm.saveBrand = function () {
            //Fake brand data
            var brand = {
                name: 'test brand' // should use $scope.formName
            };
            brandsFactory.insertBrand(brand)
              .then(function (response) {
                  vm.status = 'Inserted brand! Refreshing customer list.';
                  vm.brands.push(brand);
              }, function(error) {
                  vm.status = 'Unable to insert brand: ' + error.message;
              });
          };*/



      }])  
/*      .controller('brandsCtrl', [
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

      }])*/


      .config(function($mdThemingProvider) {

      // Configure a dark theme with primary foreground yellow

      $mdThemingProvider.theme('docs-dark', 'default')
        .primaryPalette('yellow')
        .dark();

    })

})();