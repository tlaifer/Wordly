app.config(($stateProvider) => {
	$stateProvider.state('home', {
		url: '/',
		templateUrl: 'js/home/home.html',
		controller: 'homeCtrl'
	})
});

app.controller('homeCtrl', ($scope, AuthService, $state) => {
	

});