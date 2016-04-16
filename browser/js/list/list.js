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
		controller($scope, user, listFactory, $state){
			$scope.user = user;
			$scope.newList = {
				creator: user._id,
				title: null
			};

			$scope.createList = (list) => {
				listFactory.createList(list)
					.then((list) => {

					});
			};
		}
	});
});