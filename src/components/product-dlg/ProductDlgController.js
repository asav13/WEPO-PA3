"use strict";

angular.module("project3App").controller("ProductDlgController",
function ProductDlgController($scope, $rootScope, AppResource, centrisNotify) {

	setPlaceholders();
	var productPlaceholderImage = "src/components/product-dlg/productPlaceholder.jpg";

	$scope.onOk = function onOk(){

		if($scope.newProduct 			=== undefined 	||
			$scope.newProduct.name 		=== undefined 	|| 
			$scope.newProduct.name 		=== "" 			||
			$scope.newProduct.price 	=== undefined 	|| 
			$scope.newProduct.price 	=== "") {

				centrisNotify.warning("productDlg.InvalidInput");
		} else {

			checkImage($scope.newProduct.imagePath, function success(){
				$scope.$close($rootScope.newProduct);
			}, function error() {
				if($rootScope.newProduct.imagePath === ""){
					$rootScope.newProduct.imagePath = productPlaceholderImage;
					$scope.$close($rootScope.newProduct);
				} else {
					$rootScope.updating = undefined;
					centrisNotify.error("productDlg.ImageLoadFailed");
					$scope.$dismiss();
				}
			});
		}
	};
	
	$scope.onCancel = function onCancel(){
		$rootScope.updating = undefined;
		$scope.$dismiss();
	};

	function setPlaceholders(){

		$rootScope.newProduct = {};
		if($rootScope.updating === undefined){
			$rootScope.newProduct = {
				name: "",
				price: "",
				quantitySold: "0",
				quantityInStock: "0",
				imagePath: ""
			};
		} else {
			AppResource.getSellerProductDetails($rootScope.updating[0], $rootScope.updating[1])
				.success(function(data){
					$rootScope.newProduct.name 		= data.name;
					$rootScope.newProduct.price 	= data.price;
					$rootScope.newProduct.imagePath = data.imagePath;
					$rootScope.newProduct.quantitySold = data.quantitySold;
					$rootScope.newProduct.quantityInStock = data.quantityInStock;

			}).error(function(){
				console.log("ERROR: Failed while fetching product to update.");
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
});