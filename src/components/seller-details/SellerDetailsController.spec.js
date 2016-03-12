"use strict";

/* UNIT TESTS FOR SELLER DETAILS CONTROLLER */

describe("SellerDetailsController should be unit tested here", function() {
	// TODO: add beforeEach/describe/it/etc. functions as appropriate!
		var sellerDetailsController, leScope, resource, productDlg;

	/* Our Angular App, now we can access the Controller */
	beforeEach(module("project3App"));

	var mockLocation = {
		path: function(p) {
			//....shouldn't I do something here ??
		}
	};

	/* Inject: Get access */
	beforeEach(inject(function($controller, $rootScope, AppResource, ProductDlg){
		leScope = $rootScope.$new();
		resource = AppResource;
		productDlg = ProductDlg;
		spyOn(resource, 'getSellerDetails').and.callThrough();
		spyOn(resource, 'getSellerProducts').and.callThrough();
		spyOn(productDlg, 'show').and.callThrough();

		sellerDetailsController = $controller("SellerDetailsController", { 
			$scope: 		leScope,
			$location: 		mockLocation,
			AppResource: 	resource,
			ProductDlg: 	productDlg
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
	it("getSellerDetails should be called as the page is entered", function(){
		expect(resource.getSellerDetails).toHaveBeenCalled();
	});

	/* TEST for getting sellers details */
	it("getSellerProducts should be called as the page is entered", function(){
		expect(resource.getSellerProducts).toHaveBeenCalled();
		//expect(resource.getSellerDetails).toHaveBeenCalledWith(); // THE ID
	});

	it("add new product ", function(){
		leScope.onAddProduct();
		expect(productDlg.show).toHaveBeenCalled();
	});

	it("update product", function(){
		leScope.onUpdateSellerProduct();
		expect(productDlg.show).toHaveBeenCalled();
	});

});