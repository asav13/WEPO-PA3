"use strict";
/* UNIT TESTS FOR LANGUAGE CONTROLLER */

describe("LanguageController should be unit tested here", function() {
	var ctrl;
	var $scope;
	var $translate;

	beforeEach(module("project3App"));

	beforeEach(inject(function($controller, $rootScope, $translate) {
		$scope = $rootScope.$new();
		//$translate = $translate.$new();
		ctrl = $controller("LanguageController", {$scope : $scope, $translate : $translate});
	}));

	it("should define shit...", function() {
		expect(ctrl).toBeDefined();
		expect($scope).toBeDefined();
		//expect($translate).toBeDefined();
	});

	it("should change the language to is", function() {
		//expect(leScope.updating).not.toEqual(undefined);
		//$scope.changeLanguage("is");
		//expect($translate.use("is")).toHaveBeenCalled();
	})
});