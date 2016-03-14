"use strict";
/* UNIT TESTS FOR SELLERs  CONTROLLER */

describe("SellerDlgController should be unit tested here, adding", function() {

	var sellerDlgController, leScope, resource, cNotify;

	/* Our Angular App, now we can access the Controller */
	beforeEach(module("project3App"));

	var mockLocation = {
		path: function(p) {
		}
	};

	/* Inject: Get access */
	beforeEach(inject(function($controller, $rootScope, AppResource, centrisNotify){
		leScope = $rootScope;
		leScope.updating = undefined;
		resource = AppResource;
		cNotify = centrisNotify;
		
		leScope.$dismiss = function(){};
		leScope.$close = function(){};
		spyOn(cNotify, 'warning').and.callThrough();
		spyOn(resource, 'getSellerDetails').and.callThrough();
		spyOn(leScope, '$dismiss').and.callThrough();
		spyOn(leScope, '$close').and.callThrough();

		sellerDlgController = $controller("SellerDlgController", { 
			$scope: 		leScope,
			$location: 		mockLocation,
			AppResource: 	resource,
			centrisNotify: 	cNotify,
			});
		
	}));

	it("adding with valid input should succeed", function(){
		leScope.updating = undefined;
		leScope.newSeller = {
			name: 		"Peter Seller",
			category: 	"category",
			imagePath: "https://http.cat/201"
		};
		// TODO check what happens here
		leScope.onOk();
		expect(cNotify.warning).not.toHaveBeenCalled();
	});


	it("adding with invalid input should give warning but keep dialog open", function(){
		leScope.updating = undefined;
		leScope.newSeller = {
			name : 		"A",
			category : 	undefined
		};

		leScope.onOk();
		expect(cNotify.warning).toHaveBeenCalledWith("sellerDlg.InvalidInput");
		expect(leScope.isOpen).toEqual(true);
	});

	it("adding with empty input should give warning but keep dialog open", function(){
		leScope.newSeller = {
			name : 		"",
			category : 	""
		};

		leScope.onOk();
		expect(cNotify.warning).toHaveBeenCalledWith("sellerDlg.InvalidInput");
		expect(leScope.isOpen).toEqual(true);
	});

	it("adding with taken name should give warning, but keep dialog open", function(){

		leScope.updating = undefined;
		leScope.newSeller = {
			name: "Leirkeraverkstæði Lomma",
			category: "category"
		};
		leScope.onOk();

		expect(cNotify.warning).toHaveBeenCalledWith("sellerDlg.NameTaken");
		expect(leScope.isOpen).toEqual(true);
	});

	it("clicking cancel should close the dialog", function(){
		leScope.onCancel();
		expect(leScope.updating).toEqual(undefined);
		expect(leScope.isOpen).toEqual(false);
	});

});


describe("SellerDlgController should be unit tested here, updating", function() {

	var sellerDlgController, leScope, resource, cNotify;

	/* Our Angular App, now we can access the Controller */
	beforeEach(module("project3App"));

	var mockLocation = {
		path: function(p) {
		}
	};

		/* Inject: Get access */
	beforeEach(inject(function($controller, $rootScope, AppResource, centrisNotify){
		leScope = $rootScope;
		leScope.updating = 1;
		resource = AppResource;
		cNotify = centrisNotify;
		
		leScope.$dismiss = function(){};
		leScope.$close = function(){};
		spyOn(cNotify, 'warning').and.callThrough();
		spyOn(resource, 'getSellerDetails').and.callThrough();
		spyOn(leScope, '$dismiss').and.callThrough();
		spyOn(leScope, '$close').and.callThrough();

		sellerDlgController = $controller("SellerDlgController", { 
			$scope: 		leScope,
			$location: 		mockLocation,
			AppResource: 	resource,
			centrisNotify: 	cNotify,
			});
		
	}));


	it("updating with valid input should not result in warning", function(){
		leScope.newSeller = {
			name: "Seller",
			category: "Category"
		};

		leScope.onOk();
		expect(cNotify.warning).not.toHaveBeenCalled();
		leScope.updating = undefined;
	});

	it("updating with invalid input shold give warning, but keep dialog open", function(){
		leScope.newSeller = {
			name: "",
			category: undefined
		};

		leScope.onOk();
		expect(cNotify.warning).toHaveBeenCalledWith("sellerDlg.InvalidInput");
		expect(leScope.isOpen).toEqual(true);
		leScope.updating = undefined;
	});

	it("updating with a seller name aready in use shold give warning, but keep dialog open", function(){
		leScope.newSeller = {
			name: "Leirkeraverkstæði Lomma",
			category: "Keramik"
		};

		leScope.onOk();
		expect(cNotify.warning).toHaveBeenCalledWith("sellerDlg.NameTaken");
		expect(leScope.isOpen).toEqual(true);
		leScope.updating = undefined;
	});

	it("updating with a seller name aready in use shold NOT give warning if its the sellers own name", function(){
		leScope.newSeller = {
			name: "Hannyrðaþjónusta Hannesar",
			category: "Fatnaður"
		};

		leScope.onOk();
		expect(cNotify.warning).not.toHaveBeenCalledWith("sellerDlg.NameTaken");
		expect(leScope.isOpen).toEqual(true);
		leScope.updating = undefined;
	});

});