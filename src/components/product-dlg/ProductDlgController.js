"use strict";

angular.module("project3App").controller("ProductDlgController",
function ProductDlgController($scope, $rootScope, $routeParams, AppResource, centrisNotify) {
	setPlaceholders();
	var productPlaceholderImage = "src/components/product-dlg/productPlaceholder.jpg";	$scope.sellerId 			= parseInt($routeParams.id);

	$scope.onOk = function onOk(){
		$scope.isOpen = true;

		if($scope.newProduct 			=== undefined 	||
			$scope.newProduct.name 		=== undefined 	||
			$scope.newProduct.name 		=== "" 			||
			$scope.newProduct.price 	=== undefined 	||
			$scope.newProduct.price 	=== "") {

				centrisNotify.warning("productDlg.InvalidInput");
		} else {
			nameIsTaken($scope.newProduct.name, function taken(){
				centrisNotify.warning("productDlg.NameTaken");
			}, function available() {
				checkImage($scope.newProduct.imagePath, 
					function success() {
						$scope.$close($scope.newProduct);
						$scope.isOpen = false;
				}, function error() {
					if($scope.newProduct.imagePath === "") {
						$scope.newProduct.imagePath = productPlaceholderImage;
						$scope.$close($scope.newProduct);
						$scope.isOpen 					= false;
					} else {
						$rootScope.updating = undefined;
						centrisNotify.error("productDlg.ImageLoadFailed");
						$scope.$dismiss();
						$scope.isOpen 		= false;
					}
				});
			});
		}
	};

	$scope.onCancel = function onCancel() {
		$rootScope.updating = undefined;
		$scope.$dismiss();
		$scope.isOpen 		= false;
	};

	function setPlaceholders() {
		$scope.newProduct = {};
		if($rootScope.updating === undefined) {
			$scope.newProduct = {
				name: "",
				price: "",
				quantitySold: "0",
				quantityInStock: "0",
				imagePath: ""
			};
		} else {
			AppResource.getSellerProductDetails($rootScope.updating[0], $rootScope.updating[1])
				.success(function(data){
					$scope.newProduct.name 				= data.name;
					$scope.newProduct.price 			= data.price;
					$scope.newProduct.imagePath 		= data.imagePath;
					$scope.newProduct.quantitySold 		= data.quantitySold;
					$scope.newProduct.quantityInStock 	= data.quantityInStock;
			});
		}
	}

	function checkImage(url, success, error) {
		var img = new Image();
		img.onload = function() {
			success();
		};
		img.onerror = function() {
			error();
		};
		img.src = url;
	}

	function nameIsTaken(name, taken, available) {
		AppResource.getSellerProducts($scope.sellerId)
			.success(function(data) {
				for(var i = 0; i < data.length; i++) {
					if(data[i]['name'] === name) {
						if($rootScope.updating === undefined || $rootScope.updating[1] !== data[i].id) {
							taken();
							return;
						}
						break;
					}
				}
				available();
			});
	}
});