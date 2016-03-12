"use strict";

angular.module("project3App").controller("SellerDetailsController",
function SellerDetailsController($scope, $rootScope, $routeParams, AppResource, ProductDlg) {

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
				$scope.topTenProd = new FindTopTen($scope.products);
			}).error(function() {
				console.log("ERROR: Failed when adding product.");
			});
		});
	};

	$scope.onUpdateSellerProduct = function (productId) {
		var MOCKPRODUCTID = parseInt(7);
		$rootScope.updating = [];
		$rootScope.updating[0] = sellerId;
		$rootScope.updating[1] = MOCKPRODUCTID;

		ProductDlg.show().then(function(updatedProduct) {
			updatedProduct = checkUpdates(MOCKPRODUCTID, updatedProduct);
			updatedProduct['id'] = MOCKPRODUCTID;
			AppResource.updateSellerProduct(sellerId, MOCKPRODUCTID, updatedProduct)
				.success(function(data) {
					// Now we update
					AppResource.getSellerProducts(sellerId)
							.success(function(data2) {
								$scope.products 	= data2;
							}).error(function() {
								console.log("ERROR: Failed while fetching products.");
						});
					// Nothing to do here, updates on its own
					$rootScope.updating = undefined;
				}).error(function() {
					console.log("ERROR: Failed updating product.");
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

	function checkUpdates(productId, updatedProduct) {
		var productBefore;
		AppResource.getSellerProductDetails(sellerId, productId)
			.success(function(data){
				productBefore = data;
		});
		// For those fields that were not modified, we keep the old values
		if(updatedProduct.name === ""){
			updatedProduct.name = productBefore.name;
		}
		if(updatedProduct.price === ""){
			updatedProduct.price = productBefore.category;
		}
		if(updatedProduct.imagePath === ""){
			updatedProduct.imagePath = productBefore.imagePath;
		}

		return updatedProduct;
	}
});