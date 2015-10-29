/* global angular */

'use strict';

angular.module('myApp.authentication', []);

angular.module('myApp', [
  'angular-loading-bar',
  'ui.router',
  'ngCookies',
  'angularLoad',
  'myApp.topics',
  'myApp.authentication'
])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/404');

  $stateProvider
    .state("otherwise", { 
      url : '/404',
      templateUrl: "/app/main/views/404.html"
    })
    .state('main', {
      templateUrl: "/app/main/views/main.html"
    });
})

.run(function ($rootScope, $location, $cookieStore, $http, $uibModal) {
    //adresa mock serveru (stačí pak smazat)
    $rootScope.mockServerURL = "http://private-16e96f-forum6.apiary-mock.com";

    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    }

    //při přesměrování...
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in
        if ($location.path() !== '/login' && $location.path() !== '/registration' && !$rootScope.globals.currentUser) {
            $location.path('/login');
        }
    });
    
    /**
     * Otevře modal s danou chybovou hláškou.
     * @param {string} message zpráva
     */
    $rootScope.openErrorModal = function (message) {
      $rootScope.errorMessage = message;

      var modalInstance = $uibModal.open({
        templateUrl: 'myModalContent.html'
      });

      $rootScope.cancel = function () {
        modalInstance.dismiss('cancel');
      };
    };
 });