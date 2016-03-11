"use strict";

/* UNIT TESTS FOR SELLER DETAILS CONTROLLER */

describe("SellerDetailsController should be unit tested here", function() {
	// TODO: add beforeEach/describe/it/etc. functions as appropriate!
		var sellerDetailsController, leScope, resource;

	/* Our Angular App, now we can access the Controller */
	beforeEach(module("project3App"));

	var mockLocation = {
		path: function(p) {
			//....shouldn't I do something here ??
		}
	};

	/* Inject: Get access */
	beforeEach(inject(function($controller, $rootScope, AppResource){
		leScope = $rootScope.$new();
		resource = AppResource;
		spyOn(resource, 'getSellerDetails').and.callThrough();
		spyOn(resource, 'getSellerProducts').and.callThrough();

		sellerDetailsController = $controller("SellerDetailsController", { 
			$scope: 		leScope,
			$location: 		mockLocation,
			AppResource: 	resource
			});
		spyOn(mockLocation, "path");
	}));

	/* TEST the test setup */
	it("leScope and mockLocation should be defined.", function(){
		expect(sellerDetailsController).toBeDefined();
		expect(leScope).toBeDefined();
		expect(mockLocation).toBeDefined();
		expect(resource).toBeDefined();
	});

	/* TEST for getting sellers details as the seller details page is entered */
	it("The scope variable 'sellers' should include one more entry after the call.", function(){
		expect(resource.getSellerDetails).toHaveBeenCalled();
		//expect(resource.getSellerDetails).toHaveBeenCalledWith(); // THE ID
	});

	/* TEST for getting sellers details */
	it("The scope variable 'sellers' should include one more entry after the call.", function(){
		expect(resource.getSellerProducts).toHaveBeenCalled();
		//expect(resource.getSellerDetails).toHaveBeenCalledWith(); // THE ID
		console.log("LOOKATME");
		console.log(mockLocation.path);
	});

});