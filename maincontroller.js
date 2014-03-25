app.controller("MainController", function($scope, $http, $location){

    //TODO pull this from drupal
    var username = "paul";



    $http.jsonp('http://codeivate.com/users/'+username+'.json?callback=JSON_CALLBACK ').success(function(data) {
        var language;
        var languageDetails;
        $scope.languages = data.languages;
        delete data.languages;

        //process languages for graphs etc
        for (language in $scope.languages) {
            languageDetails = $scope.languages[language];
            languageDetails.name = language;
            languageDetails.currentLevel = Math.floor(languageDetails.level);
            languageDetails.progress = Math.round(languageDetails.level%1*100);
        }

        $scope.platforms = data.platforms;
        delete data.platforms;

        $scope.codeivate = data;

        var level = $scope.codeivate.level;

        $scope.codeivate.level = {};
        $scope.codeivate.level.level = Math.floor(level);
        $scope.codeivate.level.progress = Math.round(level%1*100);

        var focus_level = $scope.codeivate.focus_level;

        $scope.codeivate.focus_level = {};
        $scope.codeivate.focus_level.level = Math.floor(focus_level);
        $scope.codeivate.focus_level.progress = Math.round(focus_level%1*100);

        //For debug purposes
        console.log('user details', $scope.codeivate);
        console.log('platform details', $scope.platforms);
        console.log('languages', $scope.languages);

    });


});


//TODO: needs work
app.filter('orderObjectBy', function(){
 return function(input, attribute) {
    if (!angular.isObject(input)) return input;

    var array = [];
    for(var objectKey in input) {
        array.push(input[objectKey]);
    }

    array.sort(function(a, b){
        a = parseInt(a[attribute]);
        b = parseInt(b[attribute]);
        return a - b;
    });
    return array;
 }
});



//TODO: implement later
/**
     var poll = function() {
        $timeout(function() {
            $scope.value++;
            poll();
        }, 1000);
    };
   poll();
    $.getJSON("http://codeivate.com/users/paul.json?callback=?",function(d){console.dir(d);});
   **/
