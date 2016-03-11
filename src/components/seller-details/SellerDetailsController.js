"use strict";

angular.module("project3App").controller("SellerDetailsController",
function SellerDetailsController($scope, $routeParams, AppResource) {



	var sellerId = $routeParams.id;
	$scope.sellerDetails = 'no details on this seller';

	AppResource.getSellerDetails(parseInt(sellerId)) // TODO Should this be in ProductController ?? If so ...then how do 
								// we make two controllers work on one html...or maybe it should be with the product card stuff
		.success(function(data) {
			console.log("SELLER DETAIL");
			console.log(data);
			$scope.sellerDetails = data;

		}).error(function(){

		});

});