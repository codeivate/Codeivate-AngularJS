'use strict';

angular.module('codeivateApp')
  .controller('MainCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.data = {};

    $scope.process = function() {
      $location.path('/' + $scope.data.name);
    };
  }]);

angular.module('codeivateApp')
  .controller('UserCtrl', ['$scope', '$timeout', '$routeParams', 'User', function ($scope, $timeout, $routeParams, User) {
    $scope.max = 100;
    $scope.user = [];
    $scope.languageDetails = [];

    (function updateUser() {
      User.jsonpQuery({username: $routeParams.username}, function (data) {
        $timeout(updateUser, 1000);
        $scope.user = data;

        // Evaluate the level
        var level = $scope.user.level;
        $scope.user.level = {};
        $scope.user.level.currentPeak = Math.floor(level);
        $scope.user.level.progress = Math.round(level % 1 * 100);

        // focus level
        var focus_level = $scope.user.focus_level;
        $scope.user.focus_level = {};
        $scope.user.focus_level.level = Math.floor(focus_level);
        $scope.user.focus_level.progress = Math.round(focus_level % 1 * 100);

        // best Streak
        $scope.user.best_streak = {};
        $scope.user.best_streak.hours = Math.floor($scope.user.max_streak / 3600);
        $scope.user.best_streak.minutes = Math.floor(($scope.user.max_streak - ($scope.user.best_streak.hours * 3600)) / 60);

        // total time
        $scope.user.total_time = {};
        $scope.user.total_time.hours = Math.floor($scope.user.time_spent / 3600);
        $scope.user.total_time.minutes = Math.floor(($scope.user.time_spent - ($scope.user.total_time.hours * 3600)) / 60);

        // Language graphs
        var exists = false;
        angular.forEach($scope.user.languages, function (language, languageIndex) {
          angular.forEach($scope.languageDetails, function (details) {
            if (details.name === languageIndex) {
              exists = true;

              if (details.currentLevel !== language.currentLevel) {
                details.currentLevel = Math.floor(language.level);
              }

              if (details.progress !== language.progress) {
                details.progress = Math.round(language.level % 1 * 100);
              }

              if (details.points !== language.points) {
                details.points = language.points;
              }
            }
          });

          if (exists === false) {
            $scope.languageDetails.push({
              'name': languageIndex,
              'currentLevel': Math.floor(language.level),
              'progress': Math.round(language.level % 1 * 100),
              'points': language.points
            });
          }
        });

      });
    })();

    $scope.itemsToArray = function (items) {
      var array = [];
      angular.forEach(items, function(item) {
        array.push(item);
      });
      return array;
    };
  }]);
