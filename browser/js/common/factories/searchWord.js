app.factory('addWordFactory', $http => {
	let factory = {};
	let wordData;

	factory.searchDictionary = (word) => {
		return $http({
			method: 'GET',
			url: 'api/search/dictionary/' + word
		})
		.then(response => {
			return response.data;
		})
	};

	factory.searchThesaurus = (word) => {
		return $http({
			method: 'GET',
			url: 'api/search/thesaurus/' + word
		})
		.then( response => {
			return response.data;
		})
	};

	factory.getWordData = () => wordData;

	return factory;
});