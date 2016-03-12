"use strict";

angular.module("project3App").controller("ProductDlgController",
function ProductDlgController($scope) {

	$scope.newProduct = {
		name: "",
		price: "",
		quantitySold: "",
		quantityInStock: "",
		imagePath: ""
	};

	$scope.onOk = function onOk(){
		// TODO VALIDATION
		// dont close if not valid !
		$scope.$close($scope.newProduct);
	};
	$scope.onCancel = function onCancel(){
		$scope.$dismiss();
	};
});