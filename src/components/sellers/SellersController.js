"use strict";

angular.module("project3App").controller("SellersController",
function SellersController($scope, $location, AppResource, SellerDlg) {

	$scope.sellers = 'No sellers';

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
	$scope.onAddSeller = function (){

		/*TESTING MODULES*/
		SellerDlg.show().then(function(newSeller) { //this seller is what we get from the dlg controller close() !
			console.log("INFO: Inside SellerDlg.show().then function, in sellers controller.");
		});


		var mockSeller = { // TODO replace for seller from form
			name: "New Seller",
			category: "somecat",
			imagePath: "https://http.cat/201"
		};
		
		AppResource.addSeller(mockSeller)
			.success(function(data) {
				// Nothing to do here, updates on its own
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
			imagePath: "https://http.cat/201"
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

