app.factory('addWordFactory', $http => {
	let factory = {};
	let wordData;
	console.log('in word factory');
	factory.searchMerriamWebster = (word) => {
		return $http({
				method: 'GET',
				url: 'http://www.dictionaryapi.com/api/v1/references/collegiate/xml/' + word,
				params: {
					key: "94625c95-0669-4898-baf1-d40c675610d7"
				}
			})
			.then(result => {
				console.log('searched word', result.data);
				wordData = result.data;
			})
		}

	factory.searchMerriamWebsterBackend = (word) => {
		return $http({
			method: 'GET',
			url: 'api/search/' + word,
		})
		.then(response => {
			console.log('in the promise', response);
			return response.data;
		})
	}

	factory.getWordData = () => wordData;

	return factory;
})