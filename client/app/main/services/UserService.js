/* global angular */

'use strict';
  
angular.module('myApp')
  
/**
 * 
 */
.factory('UserService', ['$http', '$rootScope', function($http, $rootScope){
        var service = {};
  
        service.Create = function(user) {
            return $http.post($rootScope.mockServerURL+'/user', user)
                    .then(_handleSuccess, _handleError('Error creating user'));
        };
        
        return service;
 
        function _handleSuccess(res) {
            return res.data;
        }
 
        function _handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }
]);