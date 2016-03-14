"use strict";
/* UNIT TESTS FOR SELLERs  CONTROLLER */

describe("SellerDlgController should be unit tested here, adding", function() {

	var sellerDlgController, scope, resource, cNotify;

	/* Our Angular App, now we can access the Controller */
	beforeEach(module("project3App"));

	var mockLocation = {
		path: function(p) {
		}
	};

	/* Inject: Get access */
	beforeEach(inject(function($controller, $rootScope, AppResource, centrisNotify){
		scope = $rootScope;
		scope.updating = undefined;
		resource = AppResource;
		cNotify = centrisNotify;
		
		scope.$dismiss = function(){};
		scope.$close = function(){};
		spyOn(cNotify, 'warning').and.callThrough();
		spyOn(cNotify, 'error').and.callThrough();
		spyOn(resource, 'getSellerDetails').and.callThrough();
		spyOn(scope, '$dismiss').and.callThrough();
		spyOn(scope, '$close').and.callThrough();

		sellerDlgController = $controller("SellerDlgController", { 
			$scope: 		scope,
			$location: 		mockLocation,
			AppResource: 	resource,
			centrisNotify: 	cNotify,
			});
		
	}));

	it("Setup variables should be defined.", function(){
		expect(sellerDlgController).toBeDefined();
		expect(scope).toBeDefined();
		expect(resource).toBeDefined();
		expect(cNotify).toBeDefined();
	});	

	it("adding with valid input should succeed", function(){
		scope.updating = undefined;
		scope.newSeller = {
			name: 		"Peter Seller",
			category: 	"category",
			imagePath: ""
		};
		// TODO check what happens here
		scope.onOk();
		expect(cNotify.warning).not.toHaveBeenCalled();
	});

	it("adding with valid imagePath should succeed", function(){
		scope.updating = undefined;
		scope.newSeller = {
			name: 		"Peter Seller",
			category: 	"category"//,
		//	imagePath: "asdsda"
		};
		// TODO check what happens here
		scope.onOk();
		expect(cNotify.warning).not.toHaveBeenCalled();
		//expect(cNotify.error).toHaveBeenCalled();
	});

	it("adding with valid imagePath should succeed", function(){
		scope.updating = undefined;
		scope.newSeller = {
			name: 		"Peter Seller",
			category: 	"category",
			imagePath: "https://http.cat/201"
		};
		scope.onOk();
		expect(cNotify.warning).not.toHaveBeenCalled();
	});

	it("adding with invalid input should give warning but keep dialog open", function(){
		scope.updating = undefined;
		scope.newSeller = {
			name : 		"A",
			category : 	undefined
		};

		scope.onOk();
		expect(cNotify.warning).toHaveBeenCalledWith("sellerDlg.InvalidInput");
		expect(scope.isOpen).toEqual(true);
	});

	it("adding with empty input should give warning but keep dialog open", function(){
		scope.newSeller = {
			name : 		"",
			category : 	""
		};

		scope.onOk();
		expect(cNotify.warning).toHaveBeenCalledWith("sellerDlg.InvalidInput");
		expect(scope.isOpen).toEqual(true);
	});

	it("adding with taken name should give warning, but keep dialog open", function(){

		scope.updating = undefined;
		scope.newSeller = {
			name: "Leirkeraverkstæði Lomma",
			category: "category"
		};
		scope.onOk();

		expect(cNotify.warning).toHaveBeenCalledWith("sellerDlg.NameTaken");
		expect(scope.isOpen).toEqual(true);
	});

	it("clicking cancel should close the dialog", function(){
		scope.onCancel();
		expect(scope.updating).toEqual(undefined);
		expect(scope.isOpen).toEqual(false);
	});

});


describe("SellerDlgController should be unit tested here, updating", function() {

	var sellerDlgController, scope, resource, cNotify;

	/* Our Angular App, now we can access the Controller */
	beforeEach(module("project3App"));

	var mockLocation = {
		path: function(p) {
		}
	};

		/* Inject: Get access */
	beforeEach(inject(function($controller, $rootScope, AppResource, centrisNotify){
		scope = $rootScope;
		scope.updating = 1;
		resource = AppResource;
		cNotify = centrisNotify;
		
		scope.$dismiss = function(){};
		scope.$close = function(){};
		spyOn(cNotify, 'warning').and.callThrough();
		spyOn(resource, 'getSellerDetails').and.callThrough();
		spyOn(scope, '$dismiss').and.callThrough();
		spyOn(scope, '$close').and.callThrough();

		sellerDlgController = $controller("SellerDlgController", { 
			$scope: 		scope,
			$location: 		mockLocation,
			AppResource: 	resource,
			centrisNotify: 	cNotify,
			});
		
	}));

	it("Setup variables should be defined.", function(){
		expect(sellerDlgController).toBeDefined();
		expect(scope).toBeDefined();
		expect(resource).toBeDefined();
		expect(cNotify).toBeDefined();
	});


	it("updating with valid input should not result in warning", function(){
		scope.newSeller = {
			name: "Seller",
			category: "Category"
		};

		scope.onOk();
		expect(cNotify.warning).not.toHaveBeenCalled();
		scope.updating = undefined;
	});

	it("updating with invalid input shold give warning, but keep dialog open", function(){
		scope.newSeller = {
			name: "",
			category: undefined
		};

		scope.onOk();
		expect(cNotify.warning).toHaveBeenCalledWith("sellerDlg.InvalidInput");
		expect(scope.isOpen).toEqual(true);
		scope.updating = undefined;
	});

	it("updating with a seller name aready in use shold give warning, but keep dialog open", function(){
		scope.newSeller = {
			name: "Leirkeraverkstæði Lomma",
			category: "Keramik"
		};

		scope.onOk();
		expect(cNotify.warning).toHaveBeenCalledWith("sellerDlg.NameTaken");
		expect(scope.isOpen).toEqual(true);
		scope.updating = undefined;
	});

	it("updating with a seller name aready in use shold NOT give warning if its the sellers own name", function(){
		scope.newSeller = {
			name: "Hannyrðaþjónusta Hannesar",
			category: "Fatnaður"
		};

		scope.onOk();
		expect(cNotify.warning).not.toHaveBeenCalledWith("sellerDlg.NameTaken");
		expect(scope.isOpen).toEqual(true);
		scope.updating = undefined;
	});

});