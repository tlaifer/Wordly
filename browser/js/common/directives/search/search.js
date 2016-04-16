app.directive('searchBar', (addWordFactory) => {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/search/search.html',
		controller($scope, addWordFactory, dataFactory) {
			$scope.wordData = [];
			$scope.renderWord = [];
			$scope.word;
			$scope.searched = false;

			$scope.searchDict = (word) => {
				$scope.word = word;
				$scope.wordData = [];
				$scope.searched = true;
				return addWordFactory.searchDictionary(word)
						.then(data => {
							console.log('data: ', data);
							$scope.wordData = dataFactory.wordObjectParser(word, data);
							$scope.searched = true;
							console.log('defs', $scope.wordData);
							return data;
						});
			};

			// $scope.searchThesaurus = (word) => {
			// 	return addWordFactory.searchThesaurus(word)
			// 			.then(data => {
			// 				$scope.wordData = data;
			// 			})
			// }

			$scope.searchInput = '';
		}
	}
});