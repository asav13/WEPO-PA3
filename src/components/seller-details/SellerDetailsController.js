"use strict";

angular.module("project3App").controller("SellerDetailsController",
function SellerDetailsController($scope, $routeParams, AppResource, ProductDlg) {

	$scope.products 		= [];
	$scope.topTenProd 		= [];
	var sellerId 			= parseInt($routeParams.id);
	$scope.sellerDetails 	= 'no details on this seller';

	/* GET FUNCTIONS */

	AppResource.getSellerProducts(sellerId)
		.success(function(data) {
			$scope.products 	= data;
			$scope.topTenProd 	= new FindTopTen(data);
		}).error(function() {
			console.log("ERROR: Failed while fetching products.");
	});

	AppResource.getSellerDetails(sellerId)
		.success(function(data) {
			$scope.sellerDetails = data;
		}).error(function(){
			console.log("ERROR: Failed while fetching seller details.");
	});

	/* POST AND UPDATE FUNCTIONS */

	$scope.onAddProduct = function (){
		ProductDlg.show().then(function(newProduct) {
			AppResource.addSellerProduct(sellerId, newProduct)
			.success(function(data) {
				$scope.products.push(data);
			}).error(function() {
				console.log("ERROR: Failed when adding product.");
			});
		});
	};

	/* HELPER FUNCTIONS */

	/* Finding top 10 most sold products */
	function FindTopTen(data) {
		var dataArr 	= [];
		var topTenArr 	= [];
		dataArr 		= data;

		dataArr.sort(function(a, b) {
			return a.quantitySold - b.quantitySold;
		});

		for(var i = dataArr.length, j = 0; j < 10; i--, j++) {
			if(dataArr[i-1] !== undefined) {
				topTenArr[j] = dataArr[i-1];
			} else {
				break;
			}
		}
		return topTenArr;
	}
});