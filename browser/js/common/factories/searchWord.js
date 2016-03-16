app.factory('addWordFactory', $http => {
	let factory = {};
	let wordData;
	factory.searchMerriamWebsterBackend = (word) => {
		return $http({
			method: 'GET',
			url: 'api/search/' + word,
		})
		.then(response => {
			return response.data;
		})
	}

	factory.getWordData = () => wordData;

	return factory;
})