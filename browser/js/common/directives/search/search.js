app.directive('searchbar', (addWordFactory) => {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/search/search.html',
		link: (scope) => {
			scope.wordData;
			scope.searchDict = (word) => {
				return addWordFactory.searchDictionary(word)
						.then(data => {
							scope.wordData = data;
						})
			};
			scope.searchThesaurus = (word) => {
				return addWordFactory.searchThesaurus(word)
						.then(data => {
							scope.wordData = data;
						})
			};
			scope.searchInput = '';
		}
	}
})