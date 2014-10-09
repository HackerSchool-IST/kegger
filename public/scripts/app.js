'use strict';
/**
 * @ngdoc overview
 * @name bcBootstrapApp
 * @description
 * # bcBootstrapApp
 *
 * Main module of the application.
 */
var app = angular.module('keggerApp', []);
app.controller('cornersCtrl',['$scope','$http',function($scope,$http){
  $scope.itemTypes = ['cerveja','sangria','barril','barril-sangria','senha'];
  $scope.itemType = $scope.itemTypes[0];
  $scope.updateCounter = function(){
    $http({
      method:'GET',
      url: '/api/'+$scope.itemType
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
      url: '/api/'+$scope.itemType + '/'+value
    }).success(function(data){
      $scope.currentCount += value;

    }).error(function(data){
      console.log('-- error ---');
      console.log(data);
    })
  
  }
  $scope.updateCounter();

}])
