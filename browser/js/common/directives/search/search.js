app.directive('searchbar', (addWordFactory) => {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/search/search.html',
		link: (scope) => {
			scope.searchDict = addWordFactory.searchDictionary;
			scope.searchThesauraus = addWordFactory.searchThesaurus;
			scope.searchInput = '';
		}
	}
})