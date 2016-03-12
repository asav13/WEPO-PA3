"use strict";
/* UNIT TESTS FOR SELLERs  CONTROLLER */

describe("SellersController should be unit tested here", function() {

	var sellersController, leScope, resource, sellerDlg;

	/* Our Angular App, now we can access the Controller */
	beforeEach(module("project3App"));

	var mockLocation = {
		path: function(p) {
		}
	};

		/* Inject: Get access */
	beforeEach(inject(function($controller, $rootScope, AppResource, SellerDlg){
		leScope = $rootScope.$new();
		resource = AppResource;
		sellerDlg = SellerDlg;
		spyOn(resource, 'getSellers').and.callThrough();
		spyOn(resource, 'getSellerDetails').and.callThrough();
		spyOn(resource, 'addSeller').and.callThrough();
		spyOn(resource, 'updateSeller').and.callThrough();
		spyOn(sellerDlg, 'show').and.callThrough();
		spyOn(mockLocation, "path");

		sellersController = $controller("SellersController", { 
			$scope: 		leScope,
			$location: 		mockLocation,
			AppResource: 	resource,
			SellerDlg: 		sellerDlg
			});
		
	}));

	/* TEST the setup */
	it("Setup variables should be defined.", function(){
		expect(sellersController).toBeDefined();
		expect(leScope).toBeDefined();
		expect(mockLocation).toBeDefined();
		expect(resource).toBeDefined();
		expect(sellerDlg).toBeDefined();
	});

	/* TEST for adding a new seller */
	it("The scope variable 'sellers' should include one more entry after the call.", function(){
		leScope.onAddSeller();
		expect(leScope.updating).toEqual(undefined);
		expect(sellerDlg.show).toHaveBeenCalled();
	});


	/* TEST for getting sellers */
	it("The scope variable 'sellers' should include one more entry after the call.", function(){
		expect(resource.getSellers).toHaveBeenCalled();
	});


	it("When onUpdateSeller is executed, some scope variables should change and sellerDlg.show be called", function(){
		var sellerBefore = leScope.sellers[0];

		expect(leScope.updating).toEqual(undefined);
		leScope.onUpdateSeller(sellerBefore.id);
		expect(leScope.updating).not.toEqual(undefined);
		expect(sellerDlg.show).toHaveBeenCalled();
//		expect(resource.updateSeller).toHaveBeenCalled();
	});

	it("", function(){
		leScope.seeDetails(1);
		expect(mockLocation.path).toHaveBeenCalled();
		expect(mockLocation.path).toHaveBeenCalledWith('sellers/' + 1);
	});

	/*it("check updates defiened", function(){
		sellersController.checkUpdates();
	})
*/


	/* Helper function tests*/

//	 it("Check updates should replace empty fields with old values", function(){
//	 	sellersController.checkUpdates;
//	 	expect(1).toEqual(1);
	// 	var sellerBefore = {
	// 		name: "A seller",
	// 		category: "some category",
	// 		imagePath: "somePath"
	// 	};

	// 	resource.addSeller(sellerBefore)
	// 		.success(function(data) {
	// 			sellerBefore = data;
	// 	});


	// 	var sellerAfter = {
	// 		name: "A Updated Seller"
	// 	};
	// 	sellerAfter = sellersController.checkUpdates(sellerBefore.id,sellerAfter);
	// 	expect(sellerAfter).toEqual(sellerBefore);

	 //});
});