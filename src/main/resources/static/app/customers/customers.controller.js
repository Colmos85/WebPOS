(function(){
  'use strict';

  /* reference to module */
 angular.module('myApp.customers.module')

    .controller('customersCtrl', [
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
      'customersFactory',
      '$mdToast',

      function ($rootScope, $log, $http, $q, $state, $scope, 
                $timeout, $location, $mdDialog, $resource, customersFactory, $mdToast) {
    	  
    	var vm = this;

      // load / reload
    	vm.reload = function() {
        // Load stores 
        customersFactory.getAllCustomers().then(function successCallback(result){
            vm.customers=result.data;
        });
      };

      vm.reload();


      vm.removeItem = function(customer) {
          console.log("selected product to delete", customer);
          customersFactory.deleteCustomer(customer.id).then(function successCallback(result){


              var index = vm.customers.indexOf(customer);
              console.log("index", index);
              vm.customers.splice(index, 1);

              vm.toastMessage("Customer deleted successfully");
          });
      };

      vm.editItem = function(customer, event) {
          console.log("selected Customers to edit", customer);
          vm.openProductForm(customer, event);
      };

	    vm.openCustomerForm = function(customer, event) {
          // product may be null if new product or an object if existing

          console.log("Gone into open customer form function");

	        $mdDialog.show({
            //isolateScope: false,
            locals:{
              selectedCustomer: customer
            },
	          controller: DialogController,
	          templateUrl: 'app/customers/customerForm.html',
	          parent: angular.element(document.body),
	          targetEvent: event,
	          clickOutsideToClose:true,
	          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
	        })
	        .then(function(answer) {
	          $scope.status = 'Customer Saved "' + answer + '".';
	        }, function() {
	          $scope.status = 'You cancelled the dialog.';
	        });
	     };

      function DialogController($scope, $mdDialog, selectedCustomer, customersFactory) {
          // inject brands from parent ctrl and set to dialogs isolated scope variable

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
            var customer = {
              //
            };

            //vm.reload();
            $mdDialog.hide(answer);
          }; // end of save
      }; // end of Dialog Controller
	     

    }]) // END OF customersCtrl

    .config(function($mdThemingProvider) {

    // Configure a dark theme with primary foreground yellow

    $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('yellow')
      .dark();

    })

})();