"use strict";
/* UNIT TESTS FOR LANGUAGE CONTROLLER */

describe("LanguageController should be unit tested here", function() {
	var ctrl, scope, translate;

	beforeEach(module("project3App"));

	beforeEach(inject(function($controller, $rootScope, $translate) {
		scope = $rootScope.$new();
		translate = $translate;
		
		ctrl = $controller("LanguageController", {
			$scope : scope, 
			$translate : translate
		});
	}));

	it("settup variables should be defined", function() {
		expect(ctrl).toBeDefined();
		expect(scope).toBeDefined();
		expect(translate).toBeDefined();
	});

	it("navbar should be collapsed", function() {
		expect(scope.navbarCollapsed).toEqual(true);
	});

	it("should change the language to is", function() {
		expect(scope.languageInUse).not.toBeDefined();
		scope.changeLanguage("is");
		expect(scope.languageInUse).toEqual("is");
	});

	it("should change the language to en", function() {
		expect(scope.languageInUse).not.toBeDefined();
		scope.changeLanguage("en");
		expect(scope.languageInUse).toEqual("en");
	});

});