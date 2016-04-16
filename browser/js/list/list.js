app.config( function ($stateProvider) {
	$stateProvider.state('list', {
		url: '/list',
		templateUrl: 'js/list/list.html',
		data: {
			authenticate: true
		},
		resolve: {
			user(AuthService){
				return AuthService.getLoggedInUser()
						.then((user) => {
							return user
					});
			}
		},
		controller($scope, user, listFactory){
			$scope.user = user;
			$scope.listName;
			$scope.createList = listFactory.createList;
		}
	});
});