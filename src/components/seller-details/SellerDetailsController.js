"use strict";

angular.module("project3App").controller("SellerDetailsController",

function SellerDetailsController($scope, $rootScope, AppResource) {
	$scope.products = [];
	var id = 1;


	AppResource.getSellerProducts(id).success(function(data) {
		console.log("DATA");
		console.log(data);
		$scope.products = data;
	}).error(function() {
		console.log("ERROR...");
	});
});