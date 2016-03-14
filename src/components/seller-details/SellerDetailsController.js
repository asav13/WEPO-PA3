"use strict";

angular.module("project3App").controller("SellerDetailsController",
function SellerDetailsController($scope, $rootScope, $routeParams, $location, AppResource, ProductDlg, centrisNotify) {
	var sortValue;
	var sellerId 			= parseInt($routeParams.id);
	$scope.products 		= [];
	$scope.topTenProd 		= [];
	$scope.sellerDetails 	= 'no details on this seller';
	$scope.noProducts 		= false;

	$scope.dropdown = {
		title: 	"products.Dropdown.Title ",
		value1: "products.Dropdown.value1",
		value2: "products.Dropdown.value2",
		value3: "products.Dropdown.value3",
		value4: "products.Dropdown.value4"
};

	/* GET FUNCTIONS */
	AppResource.getSellerProducts(sellerId)
		.success(function(data) {
			$scope.products 	= data;
			$scope.topTenProd 	= new FindTopTen(data);

			if(data.length === 0) {
				$scope.noProducts = true;
			} else {
				$scope.noProducts = false;
			}
		}).error(function() {
			centrisNotify.error("products.Messages.LoadFailed");
	});

	AppResource.getSellerDetails(sellerId)
		.success(function(data) {
			$scope.sellerDetails = data;
		}).error(function() {
			centrisNotify.error("products.Messages.GetSellerDetailsFailed");
	});

	/* POST AND UPDATE FUNCTIONS */
	$scope.onAddProduct = function() {
		ProductDlg.show().then(function(newProduct) {
			AppResource.addSellerProduct(sellerId, newProduct)
			.success(function(data) {
				centrisNotify.success("products.Messages.SaveSucceeded");
				$scope.products.push(data);
				$scope.topTenProd = new FindTopTen($scope.products);
				$scope.noProducts = false;
				$scope.selectedValue(sortValue);
			}).error(function() {
				centrisNotify.error("products.Messages.SaveFailed");
				$location.path('/');
			});
		});
	};

	$scope.onUpdateSellerProduct = function(productId) {
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
					$scope.selectedValue(sortValue);
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

	$scope.testUpdates = function(id, prod) {
		return checkUpdates(id, prod);
	};

	/* ORDERBY FUNCTIONS */
	$scope.selectedValue = function(value) {
		sortValue = value;
		switch(value) {
			case 1:
				$scope.dropdown.title = $scope.dropdown.value1;
				$scope.products.sort(function(a, b) {
					var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
					if(nameA > nameB) {
						return 1;
					} else {
						return -1;
					}
				});
				$scope.topTenProd.sort(function(a, b) {
					var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
					if(nameA > nameB) {
						return 1;
					} else {
						return -1;
					}
				});
				break;
			case 2:
				$scope.dropdown.title = $scope.dropdown.value2;
				$scope.products.sort(function(a, b) {
					var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
					if(nameA < nameB) {
						return 1;
					} else {
						return -1;
					}
				});
				$scope.topTenProd.sort(function(a, b) {
					var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
					if(nameA < nameB) {
						return 1;
					} else {
						return -1;
					}
				});
				break;
			case 3:
				$scope.dropdown.title = $scope.dropdown.value3;
				$scope.products.sort(function(a, b) {
					return b.price - a.price;
				});
				$scope.topTenProd.sort(function(a, b) {
					return b.price - a.price;
				});
				break;
			case 4:
				$scope.dropdown.title = $scope.dropdown.value4;
				$scope.products.sort(function(a, b) {
					return a.price - b.price;
				});
				$scope.topTenProd.sort(function(a, b) {
					return a.price - b.price;
				});
				break;
			default:
				$scope.dropdown.title = "Order by";
				$scope.products.sort(function(a, b) {
					return a.id - b.id;
				});
		}
	};
});