"use strict";
/* UNIT TESTS FOR SELLERs  CONTROLLER */

describe("SellersController should be unit tested here", function() {
	// TODO: add beforeEach/describe/it/etc. functions as appropriate!
	var sellersController, leScope, resource;

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
		spyOn(resource, 'getSellers').and.callThrough();

		sellersController = $controller("SellersController", { 
			$scope: 		leScope,
			$location: 		mockLocation,
			AppResource: 	resource
			});
		//spyOn(mockLocation, "path");
	}));

	/* TEST the setup */
	it("leScope and mockLocation should be defined.", function(){
		expect(leScope).toBeDefined();
		expect(mockLocation).toBeDefined();
	});

	/* TEST for adding a new seller */
	it("The scope variable 'sellers' should include one more entry after the call.", function(){
		var countBefore = leScope.sellers.length;
		leScope.onSubmitSeller();
		var countAfter = leScope.sellers.length;
		expect(countAfter).toEqual(countBefore + 1);
	});


		/* TEST for getting sellers */
	it("The scope variable 'sellers' should include one more entry after the call.", function(){
		expect(resource.getSellers).toHaveBeenCalled();
	});
});