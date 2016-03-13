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
		scope.changeLanguage("is");
		expect(translate.proposedLanguage()).toEqual("is");
	});

	it("should change the language to en", function() {
		scope.changeLanguage("en");
		expect(translate.proposedLanguage()).toEqual("en");
	});

	it("should fallback to english", function() {
		scope.changeLanguage("");
		expect(translate.proposedLanguage()).toEqual("en");
	});

});