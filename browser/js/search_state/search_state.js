app.config(($stateProvider) => {

	$stateProvider.state('searchbar', {
		url: '/search',
		templateUrl: 'js/search_state/search_state_template.html',
		controller: 'SearchBarCtrl'

	})
})
.controller('SearchBarCtrl', ($scope, addWordFactory, dataFactory) => {
	$scope.wordData;
	$scope.word;

	$scope.searchDict = (word) => {
		$scope.word = word;
		return addWordFactory.searchDictionary(word)
				.then(data => {
					$scope.wordData = dataFactory.wordParse(word, data);
					$scope.word = '';
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