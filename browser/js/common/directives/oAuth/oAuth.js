app.directive('oauth', () => {
	return {
		scope: {
			serviceProvider: '@',
			imageUrl: '@'
		},
		restrict: 'E',
		templateUrl: 'js/common/directives/oAuth/oAuth.html'
	}
})