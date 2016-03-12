"use strict";

angular.module("project3App").controller("ProductDlgController",
function ProductDlgController($scope, $rootScope, AppResource) {

	setPlaceholders();

	$scope.onOk = function onOk(){
		// TODO VALIDATION
		// dont close if not valid !

		$scope.$close($scope.newProduct);
	};
	$scope.onCancel = function onCancel(){
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
});