"use strict";

angular.module("project3App").controller("SellerDetailsController",
function SellerDetailsController($scope, $rootScope, $routeParams, AppResource, ProductDlg, centrisNotify) {

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
			centrisNotify.error("products.Messages.LoadFailed");
	});

	AppResource.getSellerDetails(sellerId)
		.success(function(data) {
			$scope.sellerDetails = data;
		}).error(function(){
			centrisNotify.error("product.Messages.GetSellerDetailsFailed");
	});

	/* POST AND UPDATE FUNCTIONS */

	$scope.onAddProduct = function (){
		ProductDlg.show().then(function(newProduct) {
			AppResource.addSellerProduct(sellerId, newProduct)
			.success(function(data) {
				centrisNotify.success("products.Messages.SaveSucceeded");
				$scope.products.push(data);
				$scope.topTenProd = new FindTopTen($scope.products);
			}).error(function() {
				centrisNotify.error("products.Messages.SaveFailed");
			});
		});
	};

	$scope.onUpdateSellerProduct = function (productId) {
		productId = parseInt(productId);
		$rootScope.updating = [];
		$rootScope.updating[0] = sellerId;
		$rootScope.updating[1] = productId;

		ProductDlg.show().then(function(updatedProduct) {
			updatedProduct = checkUpdates(productId, updatedProduct);
			updatedProduct['id'] = productId;
			AppResource.updateSellerProduct(sellerId, productId, updatedProduct)
				.success(function(data) {
					centrisNotify.success("products.Messages.UpdateSucceeded");
					$rootScope.updating = undefined;
				}).error(function() {
					centrisNotify.error("products.Messages.UpdateFailed");
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