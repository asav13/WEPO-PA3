"use strict";

angular.module("project3App").controller("SellersController",
function SellersController($scope, AppResource) {

	$scope.sellers = 'No sellers';
	$scope.aNewSellerHasBeenAdded = false;

	// TODO: load data from AppResource! Also, add other methods, such as to
	// add/update sellers etc.
	AppResource.getSellers()
		.success(function(data) {
			console.log("DATA");
			console.log(data);
			$scope.sellers = data;
		}).error(function() {
			console.log("ERROR: Failed getting sellers.");
			// TODO check why this gets called billion times when error 
	});

	$scope.onSubmitSeller = function (){
		var mockSeller = { // TODO replace for seller from form
			id: 99,
			name: "New Seller",
			category: "somecat",
			imagePath: "someimg"
		}
		
		AppResource.addSeller(mockSeller)
			.success(function(data) {
				$scope.aNewSellerHasBeenAdded = true;
				console.log("added seller");
				console.log(data);
			}).error(function() {
				console.log("ERROR: Failed adding seller.");
			});
	};
});