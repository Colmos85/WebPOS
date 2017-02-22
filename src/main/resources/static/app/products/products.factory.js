(function(){
  'use strict';

  /* reference to module */
  angular.module('myApp.products.module')

    .factory('productsFactory', ['$log','$http', function($log, $http) {

      var urlBase = 'products/';
      var factory = this;

      //var allProducts = [{"id":1,"description":"Office Home and Business 2013","tradePriceEx":10.0,"markup":10.0,"quantity":50,"barcode":"13321566324"}];

/*      factory.loadAllProducts = function(){
          $http({
              method : 'GET',
              url : 'products/'
          }).then(function successCallback(response) {
          	console.log("Products: success response Data: ", response.data);
          	allProducts = response.data;
            return allProducts;
          }, function errorCallback(response) {
              console.log(response.statusText);
          });
      };

      factory.loadAllProducts();
      //loadAllProducts(); // not defined on load
      
      factory.getAllProducts = function () {
          factory.loadAllProducts();
          return allProducts;
      };*/



      factory.getAllProducts = function(){
        return $http.get(urlBase);
      }

      factory.getProduct = function (id) {
        return $http.get(urlBase + '/' + id);
      };

      factory.insertProduct = function (product) {
          return $http.post(urlBase, product);
      };

      factory.updateProduct = function (product) {
          return $http.put(urlBase + '/' + product.ID, product)
      };

      factory.deleteProduct= function (id) {
          return $http.delete(urlBase + '/' + id);
      };

/*      factory.getOrders = function (id) {
          return $http.get(urlBase + '/' + id + '/orders');
      };
*/



      return factory;


    }]) // END OF productsFactory


    .factory('brandsFactory', ['$log','$http', function($log, $http) {

      var urlBase = 'brands/';
      var factory = this;
      

      factory.getAllBrands = function(){
        return $http.get(urlBase);
      }

      factory.getBrand = function (id) {
        return $http.get(urlBase + '/' + id);
      };

      factory.insertBrand = function (brand) {
          return $http.post(urlBase, brand);
      };

      factory.updateBrand = function (brand) {
          return $http.put(urlBase + '/' + brand.ID, brand)
      };

      factory.deleteBrand = function (id) {
          return $http.delete(urlBase + '/' + id);
      };

      return factory;

    }]) // END OF brandsFactory

})();