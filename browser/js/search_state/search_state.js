app.config(($stateProvider) => {

	$stateProvider.state('searchbar', {
		url: '/search',
		templateUrl: 'js/search_state/search_state_template.html',
		controller: 'SearchBarCtrl'

	})
})
.controller('SearchBarCtrl', ($scope, addWordFactory, dataFactory) => {
	$scope.wordData = [];
	$scope.word;
	$scope.searched = false;

	$scope.searchDict = (word) => {
		$scope.word = word;
		return addWordFactory.searchDictionary(word)
				.then(data => {
					console.log('data: ', data);
					$scope.wordData = dataFactory.getDefinitionsOne(word, data);
					$scope.searched = true;
				})
	};

	$scope.searchThesaurus = (word) => {
		return addWordFactory.searchThesaurus(word)
				.then(data => {
					$scope.wordData = data;
				})
	}

	$scope.searchInput = '';

});