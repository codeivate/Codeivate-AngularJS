'use strict';

var app = angular.module('codeivateApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  // 'ngAnimate'
]);

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // /users/:username
    .when('/:username', {
      templateUrl: 'views/user.html',
      controller: 'UserCtrl'
    })
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);

// app.config(['$locationProvider', function ($locationProvider) {
  // $locationProvider.html5Mode(true);
// }]);
