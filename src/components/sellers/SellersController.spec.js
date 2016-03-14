"use strict";
/* UNIT TESTS FOR SELLERs  CONTROLLER */

describe("SellersController should be unit tested here", function() {

	var sellersController, scope, resource, cNotify;

	/* Our Angular App, now we can access the Controller */
	beforeEach(module("project3App"));

	var mockLocation = {
		path: function(p) {
		}
	};

	var mockSellerDlg = {
		show: function() {
			return {
				then: function(fn){
					fn({name:"mockSeller", category: "mockCategory"});
				}
			};
		}
	};

	/* Inject: Get access */
	beforeEach(inject(function($controller, $rootScope, AppResource, SellerDlg, centrisNotify) {
		scope 		= $rootScope.$new();
		resource 	= AppResource;
		cNotify 	= centrisNotify;

		spyOn(resource, 'getSellers').and.callThrough();
		spyOn(resource, 'getSellerDetails').and.callThrough();
		spyOn(resource, 'addSeller').and.callThrough();
		spyOn(resource, 'updateSeller').and.callThrough();
		spyOn(mockSellerDlg, 'show').and.callThrough();
		spyOn(mockLocation, "path");
		spyOn(cNotify, "error").and.callThrough();


		sellersController = $controller("SellersController", {
			$scope: 		scope,
			$location: 		mockLocation,
			AppResource: 	resource,
			SellerDlg: 		mockSellerDlg,
			centrisNotify: 	cNotify
		});
	}));

	/* TEST the setup */
	it("Setup variables should be defined.", function() {
		expect(sellersController).toBeDefined();
		expect(scope).toBeDefined();
		expect(mockLocation).toBeDefined();
		expect(resource).toBeDefined();
		expect(mockSellerDlg).toBeDefined();
	});

	/* TEST for getting sellers */
	it("getSellers should have been called and succeeded", function() {
		expect(resource.getSellers).toHaveBeenCalled();
		expect(cNotify.error).not.toHaveBeenCalled();
	});

	/* TEST for adding a new seller */
	it("The scope variable 'sellers' should include one more entry after the call.", function() {
		scope.onAddSeller();
		expect(scope.updating).toEqual(undefined);
	//	expect(mockSellerDlg.show).toHaveBeenCalled();
	});

	it("When onUpdateSeller is executed, some scope variables should change and sellerDlg.show be called", function() {
		var sellerBefore = scope.sellers[0];
		expect(scope.updating).toEqual(undefined);
		scope.onUpdateSeller(sellerBefore.id);
		expect(mockSellerDlg.show).toHaveBeenCalled();
	});

	it("it should set the ending of the path to sellers/1", function() {
		scope.seeDetails(1);
		expect(mockLocation.path).toHaveBeenCalledWith('sellers/' + 1);
	});

	it("when updating sellers the helper function should replace empty values with the old ones",function() {
		var updatedSeller1 = {
			name: 		"Updated name",
			category: 	"Updated category",
		};
		var updatedSeller2 = {
			name: 		"",
			category: 	"",
			imagePath: 	""
		};

		var afterCheck = scope.testUpdates(1,updatedSeller1);
		expect(afterCheck.name).toEqual(updatedSeller1.name);
		expect(afterCheck.category).toEqual(updatedSeller1.category);

		var afterCheck2 =scope.testUpdates(1,updatedSeller2);
		expect(afterCheck2.name).not.toEqual("");
		expect(afterCheck2.category).not.toEqual("");
	});
});

describe("SellersController should be unit tested here, failing loads", function() {

	var sellersController, scope, resource, cNotify;

	/* Our Angular App, now we can access the Controller */
	beforeEach(module("project3App"));

	var mockLocation = {
		path: function(p) {
		}
	};

	var mockSeller = {name:"mockSeller", category: "mockCategory"};

	var mockSellerDlg = {
		show: function() {
			return {
				then: function(fn){
					fn(mockSeller);
				}
			};
		}
	};

	/* Inject: Get access */
	beforeEach(inject(function($controller, $rootScope, AppResource, SellerDlg, centrisNotify) {
		scope 							= $rootScope.$new();
		resource 						= AppResource;
		resource.successLoadSellers 	= false;
		resource.successAddSeller 		= false;
		resource.successUpdateSeller 	= false;
		cNotify 						= centrisNotify;

		spyOn(resource, 'getSellers').and.callThrough();
		spyOn(resource, 'getSellerDetails').and.callThrough();
		spyOn(resource, 'addSeller').and.callThrough();
		spyOn(resource, 'updateSeller').and.callThrough();
		spyOn(mockSellerDlg, 'show').and.callThrough();
		spyOn(mockLocation, "path");
		spyOn(centrisNotify, 'error').and.callThrough();

		sellersController = $controller("SellersController", { 
			$scope: 		scope,
			$location: 		mockLocation,
			AppResource: 	resource,
			SellerDlg: 		mockSellerDlg,
			cNotify: 		centrisNotify
			});
		
	}));

	/* TEST the setup */
	it("Setup variables should be defined.", function() {
		expect(sellersController).toBeDefined();
		expect(scope).toBeDefined();
		expect(mockLocation).toBeDefined();
		expect(resource).toBeDefined();
		expect(mockSellerDlg).toBeDefined();
		expect(cNotify).toBeDefined();
	});


	it("getSellers should have been called and failed, resulting in error message", function() {
		expect(resource.getSellers).toHaveBeenCalled();
		expect(cNotify.error).toHaveBeenCalledWith("sellers.Messages.LoadFailed");
	});

	it("when onAddSeller is called and successAddSeller is false, it should result in error message", function() {
		scope.onAddSeller();
		expect(mockSellerDlg.show).toHaveBeenCalled();
		expect(cNotify.error).toHaveBeenCalledWith("sellers.Messages.SaveFailed");
	});

	it("when onUpdateSeller is called and successUpdateSeller is false, it should result in error message", function() {
		scope.onUpdateSeller();
		expect(mockSellerDlg.show).toHaveBeenCalled();
		expect(cNotify.error).toHaveBeenCalled();
	});

});