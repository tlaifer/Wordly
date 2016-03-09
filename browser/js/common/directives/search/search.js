app.directive('searchbar', (addWordFactory) => {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/search/search.html',
		link: (scope) => {
			scope.search = addWordFactory.searchMerriamWebster;
			scope.searchInput = '';
		}
	}
})