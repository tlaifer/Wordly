// app.directive('searchbar', (addWordFactory) => {
// 	return {
// 		restrict: 'E',
// 		templateUrl: 'js/common/directives/search/search.html',
// 		link: (scope) => {
// 			scope.wordData;

// 			scope.searchDict = (word) => {
// 				// return scope.wordData = angular.fromJson(scope.dummyDict);

// 				return addWordFactory.searchDictionary(word)
// 						.then(data => {
// 							scope.wordData = data;
// 						})
// 			};
// 			scope.searchThesaurus = (word) => {
// 				// return scope.wordData = angular.fromJson(scope.dummyThes);
				
// 				return addWordFactory.searchThesaurus(word)
// 						.then(data => {
// 							scope.wordData = data;
// 						})
// 			};
// 			scope.searchInput = '';

// 			//temporay dummy data in order to cirvumvent needless api requests
// 			scope.dummyDict = {"entry_list":{"$":{"version":"1.0"},"entry":[{"$":{"id":"hello"},"ew":["hello"],"hw":["hel*lo"],"sound":[{"wav":["hello001.wav"],"wpr":["hu-!lO"]}],"pr":["hə-ˈlō, he-"],"fl":["noun"],"in":[{"il":["plural"],"if":["hellos"]}],"et":[{"_":"alteration of ","it":["hollo"]}],"def":[{"date":["1877"],"dt":[{"_":":an expression or gesture of greeting ","un":["used interjectionally in greeting, in answering the telephone, or to express surprise"]}]}]},{"$":{"id":"hullo"},"ew":["hullo"],"hw":["hul*lo"],"sound":[{"wav":["hullo001.wav"],"wpr":["(+)hu-!lO"]}],"pr":["(ˌ)hə-ˈlō"],"cx":[{"cl":["chiefly British variant of"],"ct":["hello"]}]}]}};

// 			scope.dummyThes = {"entry_list":{"$":{"version":"1.0"},"entry":[{"$":{"id":"hello"},"term":[{"hw":["hello"]}],"fl":["noun"],"sens":[{"mc":["an expression of goodwill upon meeting"],"vi":[{"_":"we said our and got right down to business","it":["hellos"]}],"syn":["greeting, salutation, salute, welcome"],"rel":["ave, hail; amenities, civilities, pleasantries; regards, respects, wishes"],"ant":[{"_":"adieu, bon voyage, congé ( congee), farewell, Godspeed, good-bye ( good-by)","it":["also","or"]}]}]}]}};
// 		}
// 	}
// })

app.config(($stateProvider) => {

	$stateProvider.state('searchbar', {
		url: '/search',
		templateUrl: 'js/common/directives/search/search.html',
		controller: 'SearchBarCtrl'

	})
})
.controller('SearchBarCtrl', ($scope, addWordFactory) => {
	$scope.wordData;

	$scope.searchDict = (word) => {
		return addWordFactory.searchDictionary(word)
				.then(data => {
					$scope.wordData = data;
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