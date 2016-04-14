app.directive('login', (AuthService, $state) => {
	return {
		restrict: 'E',
		templateUrl: '/js/common/directives/login/login_template.html'
	}
});