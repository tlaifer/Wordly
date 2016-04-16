app.factory('listFactory', ($http)=>{
	let factory = {};

	factory.createList = (listObj) => {
			return $http({
				method: 'POST',
				url: '/api/list',
				data: {
					creator: listObj.creator,
					title: listObj.title
				}
			})
			.then(response => {
				console.log('we have received the list: ', response.data);
				return response.data});
	};

	return factory;
})