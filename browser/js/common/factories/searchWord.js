app.factory('addWordFactory', $http => {
	let factory = {};
	let wordData;
	console.log('in word factory');
	factory.searchMerriamWebster = (word) => {
		return $http({
			method: 'GET',
			url: 'http://www.dictionaryapi.com/api/v1/references/collegiate/xml/' + word + '?key=94625c95-0669-4898-baf1-d40c675610d7',
			// headers: {'key': '94625c95-0669-4898-baf1-d40c675610d7'},
		})
		.then(result => {
			console.log('searched word', result.data);
			wordData = result.data;
		})
	}

	factory.getWordData = () => wordData;

	return factory;
})