"use strict";

angular.module("project3App").controller("SellerDetailsController",
function SellerDetailsController($scope, $routeParams, AppResource) {

	/*Vedis*/
	$scope.products = [];
	$scope.topTenProd = [];
	//var sellerId = $routeParams.id;
	var sellerId = 1;
	$scope.sellerDetails = 'no details on this seller';

	AppResource.getSellerProducts(sellerId).success(function(data) {
		$scope.products = data;
		$scope.topTenProd = FindTopTen(data);
	}).error(function() {
		console.log("ERROR...");
	});

	AppResource.getSellerDetails(parseInt(sellerId))
	// TODO Should this be in ProductController ?? If so ...then how do 
	// we make two controllers work on one html...or maybe it should be with the product card stuff
		.success(function(data) {
			//console.log("SELLER DETAIL");
			//console.log(data);
			$scope.sellerDetails = data;
		}).error(function(){
			console.log("ERROR: Failed while fetching seller details.");
		});

	function FindTopTen(data) {
		var dataArr 	= [];
		var topTenArr 	= [];
		dataArr 		= data;

		dataArr.sort(function(a, b) {
			return a.quantitySold - b.quantitySold;
		});

		for(var i = dataArr.length, j = 0; j < 10; i--, j++) {
			topTenArr[j] = dataArr[i-1];
		}

		return topTenArr;
	}
});