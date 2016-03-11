"use strict";

angular.module("project3App").controller("SellersController",
function SellersController($scope, $location, AppResource) {

	$scope.sellers = 'No sellers';
	$scope.aNewSellerHasBeenAdded = false;

	AppResource.getSellers()
		.success(function(data) {
			console.log("DATA");
			console.log(data);
			$scope.sellers = data;
		}).error(function() {
			console.log("ERROR: Failed getting sellers.");
			// TODO check why this gets called billion times when error 
	});

	$scope.seeDetails = function(sellerID) {
		$location.path('sellers/' + sellerID);
	};

	/* When a new seller is submitted, the form is not there already */
	$scope.onSubmitSeller = function (){
		var mockSeller = { // TODO replace for seller from form
			id: 99,
			name: "New Seller",
			category: "somecat",
			imagePath: "someimg"
		};
		
		AppResource.addSeller(mockSeller)
			.success(function(data) {
				$scope.aNewSellerHasBeenAdded = true;
				console.log("added seller");
				console.log(data);
			}).error(function() {
				console.log("ERROR: Failed adding seller.");
			});
	};


	/* When a seller update is submitted, the form is not there already */
	$scope.onUpdateSeller = function (){
		var mockUpdatedSeller = { // TODO replace for seller from form
			id: 999,
			name: "Tester Seller updated",
			category: "Tester cat updated",
			imagePath: "updated img"
		};
		
		AppResource.updateSeller(999, mockUpdatedSeller)
			.success(function(data) {
				console.log("added seller");
				console.log(data);
			}).error(function() {
				console.log("ERROR: Failed adding seller.");
			});
	};
});

