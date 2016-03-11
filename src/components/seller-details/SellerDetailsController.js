"use strict";

angular.module("project3App").controller("SellerDetailsController",
function SellerDetailsController($scope, $routeParams, AppResource) {

	/*Vedis*/
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
	/*End Vedis*/

	/*Asa*/
	var sellerId = $routeParams.id;
	$scope.sellerDetails = 'no details on this seller';

	AppResource.getSellerDetails(parseInt(sellerId)) // TODO Should this be in ProductController ?? If so ...then how do 
								// we make two controllers work on one html...or maybe it should be with the product card stuff
		.success(function(data) {
			console.log("SELLER DETAIL");
			console.log(data);
			$scope.sellerDetails = data;

		}).error(function(){
			console.log("ERROR: Failed while fetching seller details.");
		});
	/*End Asa*/
});