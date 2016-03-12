"use strict";

angular.module("project3App").controller("SellerDlgController",
function SellerDlgController($scope, $rootScope, AppResource) {

	setPlaceholders();
	var sellerPlaceholderImage = "http://www.kirkerholidays.com/sites/default/files/styles/person_listing_image/public/default_images/person-placeholder.jpg?itok=bsq7f9IC";

	$scope.onOk = function onOk(){

		if($rootScope.newSeller 			=== undefined 	||
			$rootScope.newSeller.name 		=== undefined 	|| 
			$rootScope.newSeller.name		=== "" 			|| 
			$rootScope.newSeller.category 	=== undefined 	|| 
			$rootScope.newSeller.category 	=== "") {

				console.log("ERROR: TODO, notify");
				$scope.$dismiss();
		}
		if($rootScope.newSeller.imagePath === ""){
			$rootScope.newSeller.imagePath = sellerPlaceholderImage;
		}
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
				category: "",
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

