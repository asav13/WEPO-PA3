"use strict";

angular.module("project3App").controller("SellerDlgController",
function SellerDlgController($scope, $rootScope, AppResource, centrisNotify) {

	setPlaceholders();
	var sellerPlaceholderImage = "src/components/seller-dlg/sellerPlaceholder.jpg";

	$scope.onOk = function onOk(){

		if($rootScope.newSeller 			=== undefined 	||
			$rootScope.newSeller.name 		=== undefined 	|| 
			$rootScope.newSeller.name		=== "" 			|| 
			$rootScope.newSeller.category 	=== undefined 	|| 
			$rootScope.newSeller.category 	=== "") {

				centrisNotify.error("sellers.Messages.SaveFailed");
				$scope.$dismiss();
		}

		checkImage($scope.newSeller.imagePath, function success(){
			$scope.$close($rootScope.newSeller);
		}, function error() {
			if($rootScope.newSeller.imagePath === ""){
				$rootScope.newSeller.imagePath = sellerPlaceholderImage;
				$scope.$close($rootScope.newSeller);
			} else {
				centrisNotify.error("sellerDlg.ImageLoadFailed");
				$scope.$dismiss();
			}
		});
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

