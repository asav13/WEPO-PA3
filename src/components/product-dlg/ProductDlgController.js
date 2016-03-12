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
		console.log("in dlg");
		console.log($scope.newProduct);
		$scope.$close($scope.newProduct);
	};
	$scope.onCancel = function onCancel(){
		$scope.$dismiss();
	};
});