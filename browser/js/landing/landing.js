app.config(($stateProvider) => {
	$stateProvider.state('landing', {
		url: '/',
		templateUrl: 'js/landing/landing.html',
		controller: 'landingCtrl'
	})
})

app.controller('landingCtrl', ($scope, AuthService, $state) => {
	$scope.login = {};
	$scope.error = null;

	$scope.sendLogin = loginCredentials => {
		$scope.error = null;
		AuthService.login(loginCredentials)
		.then(() => {
			$state.go('searchbar')
		})
	}

})