"use strict";

angular.module("project3App").controller("SellersController",
function SellersController($scope, $rootScope, AppResource) {

	$scope.sellers = 'NONE';


	// TODO: load data from AppResource! Also, add other methods, such as to
	// add/update sellers etc.
	AppResource.getSellers().success(function(data){
		if(data){
			console.log("Info: Setting $scope.sellers.");
			$scope.sellers = data;
		}
	});
	

});