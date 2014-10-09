'use strict';
/**
 * @ngdoc overview
 * @name bcBootstrapApp
 * @description
 * # bcBootstrapApp
 *
 * Main module of the application.
 */
var app = angular.module('keggerApp', ['ngRoute']);

app.config(['$routeProvider',
  function($routeProvider) {
      $routeProvider.
        when('/', {
                templateUrl: 'views/corners.html',
                controller: 'cornersCtrl'
              }).
        when('/admin', {
                templateUrl: 'views/admin.html',
                controller: 'adminCtrl'
        }).
        otherwise({
                redirectTo: '/'
              });
    }]);

app.controller('cornersCtrl',['$scope','$http',function($scope,$http){
  $scope.itemTypes = types;
  $scope.itemType = $scope.itemTypes[0];
  $scope.updateCounter = function(){
    $http({
      method:'GET',
      url: 'api/'+$scope.itemType
    }).success(function(data){
      $scope.currentCount = data.count;
    }).error(function(data){
      console.log('-- error ---');
      console.log(data);
    })
  };
  $scope.setItem = function(value){
    $http({
      method:'POST',
      url: 'api/'+$scope.itemType + '/'+value
    }).success(function(data){
      $scope.currentCount += value;

    }).error(function(data){
      console.log('-- error ---');
      console.log(data);
    })
  
  }
  $scope.updateCounter();

}]);

app.controller('adminCtrl',['$scope','$http',function($scope,$http){
  $scope.itemTypes = types;
  $scope.itemType = $scope.itemTypes[0];
  $scope.itemsList = [];

  $scope.refreshList = function(){
    $http({
      method:'GET',
      url: 'api/all/'+$scope.itemType
    }).success(function(data){
      $scope.itemsList =data;

    }).error(function(data){
      console.log('-- error ---');
      console.log(data);
    });
  };
  $scope.refreshList();
  
  $scope.remove = function(id){
  $scope.itemsList[id].removing=true;
    $http({
      method:'DELETE',
      url: 'api/remove/'+$scope.itemsList[id]._id
    }).success(function(data){
      $scope.itemsList.splice(id,1);
    }).error(function(data){
  $scope.itemsList[id].failed=true;
      console.log('-- error ---');
      console.log(data);
    });
  
  }
  
}]);
