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
      'brandsFactory',
      'taxBandsFactory',
      'stockFactory',

      function ($rootScope, $log, $http, $q, $state, $scope, 
                $timeout, $location, $mdDialog, $resource, productsFactory, storesFactory, brandsFactory, taxBandsFactory, stockFactory) {
    	  
    	var vm = this;

      // Load stores 
      storesFactory.initLoadStores().then(function successCallback(result){
          vm.stores=result.data;
      });
    	
      // Load products 
      productsFactory.getAllProducts().then(function successCallback(result){
          vm.products=result.data;
      });

      // Load Brands
      brandsFactory.getAllBrands().then(function successCallback(result){
          vm.brands = result.data;
      });

      // Load Tax Bands
      taxBandsFactory.getAllTaxBands().then(function successCallback(result){
          vm.taxBands = result.data;
      });
    	
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

	    vm.openProductForm = function(event) {
	        $mdDialog.show({
            //isolateScope: false,
            locals:{
              brands: vm.brands,
              stores: vm.stores,
              taxBands: vm.taxBands
            },
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

       function DialogController($scope, $mdDialog, brands, stores, taxBands, brandsFactory, storesFactory, productsFactory, stockFactory) {
          // inject brands from parent ctrl and set to dialogs isolated scope variable
          $scope.brands = brands;
          $scope.stores = stores;
          $scope.taxBands = taxBands;

          //$scope.tradePriceEx = "20.000";
          
          $scope.addQuantity = {};
          $scope.currentStock = {};


          $scope.formatTradePriceEx = function()
          {   
              if($scope.tradePriceEx > 0)
              {
                  $scope.tradePriceEx = parseFloat($scope.tradePriceEx).toFixed(3);
              }
          }
          $scope.formatMarkup = function()
          {
             if($scope.salesPriceEx > 0 /*$scope.product.markup.length !== 0 || typeof $scope.markup !== 'undefined'*/)
              {
                  $scope.markup = parseFloat($scope.markup).toFixed(3);
              }
          }
          $scope.formatSalesPriceEx = function()
          {
             if($scope.salesPriceEx > 0 )
              {
                  $scope.salesPriceEx = parseFloat($scope.salesPriceEx).toFixed(3);
              }
          }
          $scope.formatSalesPriceInc = function()
          {
              if($scope.salesPriceInc > 0 )
              {
                  $scope.salesPriceInc = parseFloat($scope.salesPriceInc).toFixed(3);
              }
             
          }

          // calculations for price???
          $scope.tradePriceExChange = function() {
            if($scope.tradePriceEx <= 0 )
            {
              $scope.markup = "";
              $scope.salesPriceEx = "";
              $scope.salesPriceInc = "";
            }
            if($scope.markup > 0 )
            {
                var markup = ($scope.markup / 100) + 1; 
                $scope.salesPriceEx = ($scope.tradePriceEx * markup).toFixed(3);
                if(/*$scope.product.taxBand.rate > 0 */typeof $scope.taxBand !== 'undefined')
                {
                    var taxBand = ($scope.taxBands.rate / 100) + 1; 
                    $scope.salesPriceInc = ($scope.salesPriceEx * taxBand).toFixed(3);
                }
            }
          }; 

          $scope.markupChange = function() {
            if($scope.tradePriceEx <= 0 || $scope.markup <= 0)
            {
              $scope.salesPriceEx = "";
              $scope.salesPriceInc = "";
            }
            if($scope.tradePriceEx > 0 && $scope.markup > 0)
            {
                var markup = ($scope.markup / 100) + 1; 
                $scope.salesPriceEx = ($scope.tradePriceEx * markup).toFixed(2);
                if(typeof $scope.taxBand !== 'undefined')
                {
                    var taxBand = ($scope.taxBands.rate / 100) + 1; 
                    $scope.salesPriceInc = ($scope.salesPriceEx * taxBand).toFixed(3);
                }
            }
          };

          $scope.salesPriceExChange = function() {
            if($scope.salesPriceEx <= 0 )
            {
              $scope.markup = "";
              $scope.salesPriceInc = "";
            }
            // change the markup based on trade price
            if($scope.tradePriceEx > 0)
            {
                var markup = $scope.salesPriceEx / $scope.tradePriceEx;
                markup = (markup - 1) * 100;
                $scope.markup = markup.toFixed(3);
                if(typeof $scope.taxBand !== 'undefined')
                {
                    var taxBand = ($scope.taxBand.rate / 100) + 1; 
                    $scope.salesPriceInc = ($scope.salesPriceEx * taxBand).toFixed(3);
                }
            }
          };


          $scope.taxChanged = function() {
            if(typeof $scope.salesPriceEx !== 'undefined' || $scope.salesPriceEx > 0)
                {
                    var taxBand = ($scope.taxBand.rate / 100) + 1; 
                    $scope.salesPriceInc = ($scope.salesPriceEx * taxBand).toFixed(3);
                }

          }

          $scope.salesPriceIncChange = function() {
            console.log("Sales Price Inc - changed");
            if($scope.salesPriceInc <= 0 )
            {
                $scope.salesPriceInc = "";
            }
            if($scope.salesPriceInc > 0 )
            {
                // change ex vat price
                var tax = ($scope.taxBand.rate / 100) + 1; 
                $scope.salesPriceEx = ($scope.salesPriceInc / tax).toFixed(3);
                if($scope.tradePriceEx > 0)
                {
                    var markup = $scope.salesPriceEx / $scope.tradePriceEx;
                    markup = (markup - 1) * 100;
                    $scope.markup = markup.toFixed(3);
                }
            }
          };



          $scope.hide = function() {
            $mdDialog.hide();
          };
  
          $scope.cancel = function() {
            $mdDialog.cancel();
          };

          $scope.clear = function() {
            // set all model variables to "";
          };
  
          $scope.save = function(answer) {

            // Create the product object
            var product = {
              barcode : $scope.barcode,
              description : $scope.description,
              tradePriceEx : $scope.tradePriceEx,
              markup : $scope.markup,
              retailPriceEx : $scope.salesPriceEx,
              retailPriceInc : $scope.salesPriceInc,
              /*"brand": [
                  {"id":1,"name":"John Doe"},
                  {"id":2,"name":"Don Joeh"}
              ],*/
              taxBand: $scope.taxBand,
              brand: $scope.brand
            };

            console.log("Product created 1", product);

            // send request to factory to create new Product in the database
            productsFactory.insertProduct(product).then(function successCallback(response) {
              console.log(" Response data " , response.data);
              product.id = response.data.id;
              console.log("Product created SUCESSFULLY", product);
              //push product to products
              //vm.products.push(product);
            });

             //$scope.addQuantity = {};
             //$scope.currentStock = {};

            // for each store create quantity record in DB
            var index = 0;
            for(index = 0; index < stores.length; index++){

              var stock = {
              quantity : $scope.addQuantity[index],
              product: product,
              store: stores[index]
              };

              //vm.products.push(product);

              console.log("Stock created: ", stock);

              stockFactory.createStock(stock).then(function successCallback(response) {
                console.log(" Response data " , response.data);
              });
            }

            $mdDialog.hide(answer);
          };
       };

	     
    }]) // END OF productsCtrl
  
    .controller('brandsCtrl', [
        '$rootScope',
        '$scope',
        '$log',
        '$mdDialog',
        'brandsFactory',/*
        'recordAvailabilityValidator',*/

        function($rootScope, $scope, $log, $mdDialog, brandsFactory/*, recordAvailabilityValidator*/) {

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
              $scope.status = 'Brand Saved "' + answer + '".';
            }, function() {
              $scope.status = 'You cancelled the dialog.';
            });
          };

          function DialogController($scope, $mdDialog, brandsFactory/*, recordAvailabilityValidator*/) {

           ///////////$scope.brandForm.brandName.$setValidity('validationError', true);

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

              brandsFactory.createBrand(brand).then(function successCallback(response) {
                brand.id = response.data.id;
                vm.brands.push(brand);
                /////brandForm.brand.brandName.$error.validationError = true; //$setValidity('custom-err', false); //form.field1.$error.validationError = true;
                $mdDialog.hide(answer);
              }, function errorCallback(response) {
                if(response.status === 409)
                {
                  console.log("error - 409");
                }
                ////////$scope.brandForm.brandName.$setValidity('validationError', false);
                ////////brandForm.brand.brandName.$error.validationError = false; // $setValidity('custom-err', false); //$error.validationError = true;//inputName.$setValidity('custom-err', false);
                console.log("Unsuccessful - ", response.data.errorMessage);
                $scope.errorMessage = response.data.errorMessage

              });
              console.log("Brand with id?", brand);
            };

          }; // END OF DialogController
      }])  // END of Brands Controller

      /**
      * This directive can be used with any input tag which will show validation against the server for duplicates.
      *
      *<input name="brandName" ng-model="brand.brandName" md-autofocus record-availability-validator="/brands/exists/" required>
      *<div ng-messages="brandForm.brandName.$error" >
      *    <div ng-message="recordLoading">
      *    Checking database...
      *    </div>
      *  <div ng-message="recordAvailable">
      *      The object?? name is already in use...
      *  </div>
      *</div>
      *
      */
      .directive('recordAvailabilityValidator', ['$http', function($http) {
          return {
              /*restrict: 'A',*/
              /*scope: {
                recordAvailabilityValidator: "="
              },*/
              require: 'ngModel',
              link: function(scope, element, attrs, ngModel) {

                  var apiUrl = attrs.recordAvailabilityValidator;

                  function setAsLoading(bool) {
                      ngModel.$setValidity('recordLoading', !bool);
                  }

                  function setAsAvailable(bool) {
                      ngModel.$setValidity('recordAvailable', bool);
                  }
                  ngModel.$parsers.push(function(value) {
                      if (!value || value.length == 0) 
                      {
                        setAsLoading(false);
                        setAsAvailable(true);
                        return;
                      }
                      apiUrl = attrs.recordAvailabilityValidator.concat(value);
                      setAsLoading(true);
                      setAsAvailable(false);
                      $http.get(apiUrl, {
                          v: value
                      }).then(function successCallback(response) {
                          //value = response.data;
                          if(response.data === false) // if object does not exist
                          {
                            //value = response.data;
                            setAsLoading(false);
                            setAsAvailable(true);
                          }else{
                            //value = response.data;
                            setAsLoading(false);
                            setAsAvailable(false);
                          }
                          
                      })/*.error(function() {
                          setAsLoading(false);
                          setAsAvailable(false);
                      })*/;
                      return value;
                  })
              }
          }
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