"use strict";
/* UNIT TESTS FOR SELLERs  CONTROLLER */

describe("SellerDlgController should be unit tested here", function() {

	var sellerDlgController, leScope, resource;

	/* Our Angular App, now we can access the Controller */
	beforeEach(module("project3App"));

	var mockLocation = {
		path: function(p) {
		}
	};

		/* Inject: Get access */
	beforeEach(inject(function($controller, $rootScope, AppResource){
		leScope = $rootScope.$new();
		resource = AppResource;

//		spyOn(sellerDlgController, 'setPlaceholders');//.and.callThrough();


		sellerDlgController = $controller("SellerDlgController", { 
			$scope: 		leScope,
			$location: 		mockLocation,
			AppResource: 	resource
			});
		
	}));

	it("", function(){
		//leScope.onOk();
		

	});

/*
	it("setPlaceholders should be called when the dlg starts up", function(){
		expect(this.setPlaceholders).toHaveBeenCalled();
	});*/

});