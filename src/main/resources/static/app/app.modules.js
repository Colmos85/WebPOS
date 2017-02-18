(function(){
  'use strict';

  angular.module('common.services', []);
  angular.module('myApp.auth.module', ['ui.bootstrap',
    'ngMessages','ngMaterial']);
  angular.module('myApp.controllers', ['common.directives']);
  angular.module('common.directives', ['common.services']);
  angular.module('myApp.products.module', ['ui.bootstrap',
    'ngMessages','ngMaterial']);
  angular.module('myApp.cashier.module', ['ui.bootstrap',
    'ngMessages','ngMaterial']);
})();  
  