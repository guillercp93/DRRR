'use strict';

var app = angular.module('DRRR', ["ngMaterial", "ngMessages"]);

app.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('docs-dark').dark();
});
app.factory('AuthFactory', ['$http', function($http) {
    return {
        login: function(u, p) {
            return $http.post('/auth/login/', 'username='+u+'&password='+p)
                    .then(function(data) {
                        console.log('==========>',data);
                    }).error(function(err) {
                        console.log('====e=====>', err);
                    });
        }
    };
}]);

app.controller('loginController', ['$scope', 'AuthFactory', function($scope, AuthFactory) {
    $scope.login = function() {
        var user = $scope.user;
        AuthFactory.login(user.username, user.password);
    };
}]);