'use strict';
  
angular.module('myApp.authentication')

/**
 * Registrace uživatele
 */
.controller('RegistrationController', function ($scope, $location, UserService, toastr, AuthenticationService) {
    // reset login status
    AuthenticationService.ClearCredentials();

    /**
     * Registrace uživatele
     */
    $scope.register = function() {
        $scope.dataLoading = true;
        UserService.Create($scope.user)
            .then(function (response) {
                if (response.success) {
                    if(response.status === 201){
                        toastr.success('', 'Registration successful');
                        $location.path('/login');
                    }else{
                        toastr.error('', 'Registration error');
                        $location.path('/login');
                    }
                } else {
                    toastr.error(response.message, 'Chyba');
                    $scope.dataLoading = false;
                }
            });
    };
});

