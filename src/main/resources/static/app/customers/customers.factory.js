(function(){
  'use strict';

  /* reference to module */
  angular.module('myApp.customers.module')

    .factory('customersFactory', ['$log','$http', function($log, $http) {

      var urlBase = 'customers/';
      var factory = this;

      factory.getAllCustomers = function(){
        return $http.get(urlBase);
      }

      factory.getCustomer = function (id) {
        return $http.get(urlBase + '/' + id);
      };

      factory.insertCustomer = function (product) {
          return $http.post(urlBase, product);
      };

      factory.updateCustomers = function (id, product) {
          return $http.put(urlBase + '/' + id, product)
      };

      factory.deleteCustomers = function (id) {
          return $http.delete(urlBase + '/' + id);
      };

      return factory;

    }]) // END OF productsFactory

})();