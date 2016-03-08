app.config( function ($stateProvider) {
	$stateProvider.state('words', {
		url: '/words',
		templateUrl: 'js/words/words_template.html'
	});
});