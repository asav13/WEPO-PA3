"use strict";

angular.module("project3App").controller("SellerDlgController",
function SellerDlgController($scope, $rootScope, AppResource) {

	setPlaceholders();

	$scope.onOk = function onOk(){
		// TODO VALIDATION
		// dont close if not valid !
		$scope.$close($rootScope.newSeller);
	};
	$scope.onCancel = function onCancel(){
		$scope.$dismiss();
	};

	function setPlaceholders(){
		$rootScope.newSeller = {};
		if($rootScope.updating === undefined){
			$rootScope.newSeller = {
				name: "",
				category: "", // TODO MAKE SELECTABLE?? 
				imagePath: ""
			};
		} else {
			AppResource.getSellerDetails($rootScope.updating)
				.success(function(data){
					$rootScope.newSeller.name = data.name;
					$rootScope.newSeller.category = data.category;
					$rootScope.newSeller.imagePath = data.imagePath;
			}).error(function(){
				console.log("ERROR: Failed while fetching user to update.");
			});
		}
	}
});

