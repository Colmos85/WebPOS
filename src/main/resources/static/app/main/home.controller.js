(function(){
  'use strict';

  angular.module('myApp.controllers')
  
    .controller('homeCtrl', [
      '$rootScope',
      '$log',
      '$state',
      '$timeout',
      '$location',
      'menu',
      function ($rootScope, $log, $state, $timeout, $location, menu/*, AuthService*/) {

        var vm = this;
        
        vm.test = "This is a test string";

        //vm.user = AuthService.user;

        //functions for menu-link and menu-toggle
        vm.isOpen = isOpen;
        vm.toggleOpen = toggleOpen;
        vm.autoFocusContent = false;
        vm.menu = menu;

        vm.status = {
          isFirstOpen: true,
          isFirstDisabled: false
        };


        function isOpen(section) {
          return menu.isSectionSelected(section);
        }

        function toggleOpen(section) {
          menu.toggleSelectSection(section);
        }

      }])

    .controller("titleController", function($rootScope, $log, $state, $timeout, $location, $scope, $interval, AuthService) {
        
        $scope.activeRegister = "Main Register";
        $scope.username = AuthService.user.firstName;

        var tick = function() {
            $scope.clock = Date.now();
        }
        tick();
        $interval(tick, 1000);

        $scope.$on('LoginSuccessful', function() {
          $scope.username = AuthService.user.firstName;
        });
        $scope.$on('LogoutSuccessful', function() {
          $scope.username = null;
        });
        $scope.logout = function() {
          AuthService.user = null;
          $rootScope.$broadcast('LogoutSuccessful');
          $state.go('login');
        };
    })

    .controller("sidebarController", function($scope, $mdSidenav, AuthService) {
        $scope.controllerName = "sidebarController";
        $scope.showMobileMainHeader = true;
        $scope.openSideNavPanel = function() {
            $mdSidenav('left').open();
        };
        $scope.closeSideNavPanel = function() {
            $mdSidenav('left').close();
        };
    })
})();