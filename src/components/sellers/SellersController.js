"use strict";

angular.module("project3App").controller("SellersController",
function SellersController($scope, $rootScope, $location, AppResource, SellerDlg, $translate, centrisNotify) {
	$scope.sellers 		= {};
	$rootScope.updating = undefined;
	
	/* GET FUNCTIONS */
	AppResource.getSellers()
		.success(function(data) {
			$scope.sellers = data;
		}).error(function() {
			centrisNotify.error("sellers.Messages.LoadFailed");
	});

	$scope.seeDetails = function(sellerID) {
		$location.path('sellers/' + sellerID);
	};

	/* POST AND UPDATE FUNCTIONS */
	/* When a new seller is submitted, the form is not there already */
	$scope.onAddSeller = function() {
		SellerDlg.show().then(function(newSeller) {
			AppResource.addSeller(newSeller)
				.success(function(data) {
					centrisNotify.success("sellers.Messages.SaveSucceeded");
				}).error(function() {
					centrisNotify.error("sellers.Messages.SaveFailed");
				});
		});
	};

	/* When a seller update is submitted, the form is not there already */
	$scope.onUpdateSeller = function (sellerId) {
		$rootScope.updating = sellerId;
		SellerDlg.show().then(function(updatedSeller) {
			updatedSeller = checkUpdates(sellerId, updatedSeller);
			AppResource.updateSeller(sellerId, updatedSeller)
				.success(function(data) {
					centrisNotify.success("sellers.Messages.UpdateSucceeded");
					$rootScope.updating = undefined;
				}).error(function() {
					centrisNotify.success("sellers.Messages.UpdateFailed");
				});
		});
	};

	/* HELPER FUNCTIONS */
	function checkUpdates(sellerId, updatedSeller) {
		var sellerBefore;
		AppResource.getSellerDetails(sellerId)
			.success(function(data) {
				sellerBefore = data;
		});
		// For those fields that were not modified, we keep the old values
		if(updatedSeller.name === "") {
			updatedSeller.name = sellerBefore.name;
		}
		if(updatedSeller.category === "") {
			updatedSeller.category = sellerBefore.category;
		}
		if(updatedSeller.imagePath === "") {
			updatedSeller.imagePath = sellerBefore.imagePath;
		}

		return updatedSeller;
	}

	$scope.testUpdates = function(id, seller) {
		return checkUpdates(id, seller);
	};
});

