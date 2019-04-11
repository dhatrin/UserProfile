var app;
(function () {
    'use strict'; 
    app = angular.module('userapp', ['ngFileUpload', 'ngRoute']);
    app.config(function ($routeProvider) {
        $routeProvider
            .when("/UserProfile", {
                templateUrl: "/EditUserProfile/UserProfile",
                controller: "UsersCtrl"
            });
          
    });
})();  
