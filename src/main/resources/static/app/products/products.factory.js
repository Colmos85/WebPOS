(function(){
  'use strict';

  /* reference to module */
  angular.module('myApp.products.module')

    .factory('productsFactory', ['$log','$http', function($log, $http) {

      var urlBase = 'products';
      var factory = this;

      var allProducts = [{"id":1,"description":"Office Home and Business 2013","tradePriceEx":10.0,"markup":10.0,"quantity":50,"barcode":"13321566324"}];

      factory.getAllProducts = function () {
          //return factory.setAllProducts(console.log);
          allProducts = factory.getProducts();
          return allProducts;
      };

      // Get all products
      factory.getProducts = function(){
        $http({
            method : 'GET',
            url : 'products'
        }).then(function successCallback(response) {
            allProducts = response.data;
            return allProducts;
        }, function errorCallback(response) {
            console.log(response.statusText);
        });
      };



      return factory;


    }])
    

    /*.factory('productsFactory', [
      '$location',
      '$rootScope',
      function ($location) {

      var products = [
          { id:'1', name:'product1', description:'Nerf Gun', price:'79.95'},
          { id:'2', name:'product2', description:'Water Gun', price:'24.95'},
          { id:'3', name:'product3', description:'Nerf Mega', price:'99.99'},
          { id:'4', name:'product4', description:'Nerf Mega', price:'99.99'},
          { id:'5', name:'product5', description:'Nerf Mega', price:'99.99'},
          { id:'6', name:'product6', description:'Nerf Mega', price:'99.99'},
          { id:'7', name:'product7', description:'Nerf Mega', price:'99.99'},
          { id:'8', name:'product8', description:'Nerf Mega', price:'99.99'},
          { id:'9', name:'product9', description:'Nerf Mega', price:'99.99'},
          { id:'10', name:'product10', description:'Nerf Mega', price:'99.99'},
          { id:'11', name:'product11', description:'Nerf Mega', price:'99.99'},
          { id:'12', name:'product12', description:'Nerf Mega', price:'99.99'},
          { id:'13', name:'product13', description:'Nerf Gun', price:'79.95'},
          { id:'14', name:'product14', description:'Nerf Gun', price:'79.95'},
          { id:'15', name:'product15', description:'Nerf Gun', price:'79.95'},
          { id:'16', name:'product16', description:'Nerf Gun', price:'79.95'},
          { id:'17', name:'product17', description:'Nerf Blaster', price:'124.45'},
          { id:'18', name:'product18', description:'Nerf Gun', price:'79.95'},
          { id:'19', name:'product19', description:'Nerf Gun', price:'79.95'},
          { id:'20', name:'product20', description:'Nerf Gun', price:'79.95'},
        ];

      var product = "My Product in factory variable";
      
      var factory = {};
      factory.getProducts = function () {
          return products;
      };

    return factory;

    }])*/

})();