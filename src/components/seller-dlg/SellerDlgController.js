"use strict";

angular.module("project3App").controller("SellerDlgController",
function SellerDlgController($scope, $rootScope, AppResource, centrisNotify) {

	setPlaceholders();
	var sellerPlaceholderImage = "src/components/seller-dlg/sellerPlaceholder.jpg";

	$rootScope.onOk = function onOk() {
		$scope.isOpen = true;

		if($scope.newSeller 			=== undefined 	||
			$scope.newSeller.name 		=== undefined 	|| 
			$scope.newSeller.name		=== "" 			|| 
			$scope.newSeller.category 	=== undefined 	|| 
			$scope.newSeller.category 	=== "") {

				centrisNotify.warning("sellerDlg.InvalidInput");
		} else {

			nameIsTaken($scope.newSeller.name, function taken() {
				centrisNotify.warning("sellerDlg.NameTaken");
			}, function available() {
				checkImage($scope.newSeller.imagePath, 
					function success() {
						$scope.$close($scope.newSeller);
						$scope.isOpen = false;
				}, function error() {
					if($scope.newSeller.imagePath === "") {
						$scope.newSeller.imagePath = sellerPlaceholderImage;
						$scope.$close($scope.newSeller);
						$scope.isOpen = false;
					} else {
						$rootScope.updating = undefined;
						centrisNotify.error("sellerDlg.ImageLoadFailed");
						$scope.$dismiss();
						$scope.isOpen = false;
					}
				});
			});
		}
	};

	$scope.onCancel = function onCancel() {
		$rootScope.updating = undefined;
		$scope.$dismiss();
		$scope.isOpen = false;
	};

	function setPlaceholders() {

		$scope.newSeller = {};
		if($rootScope.updating === undefined) {
			$scope.newSeller = {
				name: "",
				category: "",
				imagePath: ""
			};
		} else {
			AppResource.getSellerDetails($rootScope.updating)
				.success(function(data) {
					$scope.newSeller.name = data.name;
					$scope.newSeller.category = data.category;
					$scope.newSeller.imagePath = data.imagePath;
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
		AppResource.getSellers()
			.success(function(data) {
				for(var i = 0; i < data.length; i++) {
					if(data[i]['name'] === name) {
						if($rootScope.updating === undefined || $rootScope.updating !== data[i].id) {
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

