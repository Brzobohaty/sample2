'use strict';
  
angular.module('myApp.authentication')

/**
 * Přihlášení uživatele
 */
.controller('LoginController', function ($scope, $location, AuthenticationService) {
    // reset login status
    AuthenticationService.ClearCredentials();

    /**
     * Přihlášení uživatele
     */
    $scope.login = function () {
        $scope.dataLoading = true;
        AuthenticationService.Login($scope.username, $scope.password, function(data, status, success) {
            if(success) {
                if(status === 204) {
                    AuthenticationService.SetCredentials($scope.username, $scope.password);
                    $location.path('/topics');
                } else {
                    $scope.error = "Nesprávné přihlašovací údaje.";
                    $scope.dataLoading = false;
                }
            } else {
                $scope.error = "Nelze se připojit k serveru.";
                $scope.dataLoading = false;
            }
        });
    };
});

