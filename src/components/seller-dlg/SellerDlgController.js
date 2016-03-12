"use strict";

angular.module("project3App").controller("SellerDlgController",
function SellerDlgController($scope) {

	$scope.newSeller = {
		name: "",
		category: "", // TODO MAKE SELECTABLE?? 
		imagePath: ""
	};

	$scope.onOk = function onOk(){
		// TODO VALIDATION
		// dont close if not valid !
		$scope.$close($scope.newSeller);
	};
	$scope.onCancel = function onCancel(){
		$scope.$dismiss();
	};
});