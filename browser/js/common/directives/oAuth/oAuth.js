app.directive('oauth', () => {
	return {
		scope: {
			serviceProvider: '@',
			image: '@'
		},
		restrict: 'E',
		templateUrl: 'js/common/directives/oAuth/oAuth.html'
	}
});
