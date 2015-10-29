/* global angular */

'use strict';

angular.module('myApp.topics', ['toastr', 'ngAnimate', 'ui.bootstrap'])

.config(function($stateProvider) {
  $stateProvider
    .state('main.home', {
      url: "",
      templateUrl: "/app/modules/topics/views/topics.html",
      controller: 'AllTopicsController'
    })
    .state('main.topics', {
      url: "/topics",
      templateUrl: "/app/modules/topics/views/topics.html",
      controller: 'AllTopicsController'
    })
    .state('main.topic', {
      url: "/topic/:topicId",
      templateUrl: "/app/modules/topics/views/topic.html",
      controller: 'TopicController'
    });
})

.run(function ($rootScope, angularLoad) {
    //indikátor, zda jsme na stránce s menu tématy
    $rootScope.allTopics = false;
})

/**
 * Zobrazení menu se všemi tématy.
 */
.controller('AllTopicsController', function($scope, $http, $rootScope, toastr) {
    $scope.dataLoadingg = true;
    
    /**
     * Načtení témat.
     */
    $http.get($rootScope.mockServerURL+'/topics').
    success(function(data, status) {
      if(status === 200){
        $scope.dataLoadingg = false;
        $scope.topics = data;
      }else{
        $rootScope.openErrorModal("Nepodařilo se načíst data ze serveru.");
      }
    }).
    error(function(data, status) {
      $rootScope.openErrorModal("Nepodařilo se načíst data ze serveru.");
    });
    
    /**
     * Uložení nového tématu.
     */
    $scope.save = function(newTopicName) {
        $http.post($rootScope.mockServerURL+'/topics', newTopicName).
        success(function(data, status) {
          if(status === 201){
            $scope.topics.push({"id": data.id, "name": newTopicName});
            toastr.success('Nové téma bylo úspěšně založeno.', 'Hotovo!');
          }else{
            $rootScope.openErrorModal("Nepodařilo se přidat téma.");
          }
        }).
        error(function(data, status) {
          $rootScope.openErrorModal("Nepodařilo se přidat téma.");
        });
    };
})

/**
 * Zobrazení příspěvků v daném tématu.
 */
.controller('TopicController', function($scope, $http, $stateParams, $rootScope, toastr) {
    /**
     * Načtení příspěvků v tématu.
     */
    $http.get($rootScope.mockServerURL+'/topics/'+$stateParams.topicId+'/posts').
    success(function(data, status) {
      if(status === 200){
        $scope.topic = data;
      }else{
        $rootScope.openErrorModal("Nepodařilo se načíst data ze serveru.");
      }
    }).
    error(function(data, status) {
      $rootScope.openErrorModal("Nepodařilo se načíst data ze serveru.");
    });
    
    /**
     * Uložení nového příspěvku.
     */
    $scope.save = function(newPost) {
        $http.post($rootScope.mockServerURL+'/topics/'+$stateParams.topicId+'/posts', newPost).
        success(function(data, status) {
          if(status === 201){
            $scope.topic = data;
            toastr.success('Nový příspěvek byl úspěšně přidán.', 'Hotovo!');
          }else{
            $rootScope.openErrorModal("Nepodařilo se přidat příspěvek.");
          }
        }).
        error(function(data, status) {
          $rootScope.openErrorModal("Nepodařilo se přidat příspěvek.");
        });
    };
});