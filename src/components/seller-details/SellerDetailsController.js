"use strict";

angular.module("project3App").controller("SellerDetailsController",
function SellerDetailsController($scope, $rootScope, AppResource) {
	$scope.products = [];
	$scope.topTenProd = [];
	var id = 1;


	AppResource.getSellerProducts(id).success(function(data) {
function bla(a, b) {
						if(a.quantitySold < b.quantitySold) {
							return -1;
						} else {
							return 1;
						}}

		console.log("DATA");
		console.log(data);
		$scope.products = data;
					$scope.topTenProd = data;
					$scope.topTenProd.sort(bla);
	}).error(function() {
		console.log("ERROR...");
	});


});