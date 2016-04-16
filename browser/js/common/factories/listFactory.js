app.factory('listFactory', ($http)=>{
	let factory = {};

	factory.createList = (name) => {
			return $http({
				method: 'POST',
				url: '/api/list',
				data: {title: name}
			})
			.then(response => {
				console.log('we have received the list: ', response.data);
				return response.data});
	};

	return factory;
})