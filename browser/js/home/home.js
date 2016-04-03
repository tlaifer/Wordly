app.config(($stateProvider) => {
	$stateProvider.state('home', {
		url: '/',
		templateUrl: 'js/home/home.html',
		controller: 'homeCtrl'
	})
})

app.controller('homeCtrl', ($scope, AuthService, $state) => {
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