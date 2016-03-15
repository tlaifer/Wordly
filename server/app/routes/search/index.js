'use strict'
let router = require('express').Router();
let request = require('request');
module.exports = router;

router.route('/:word')
	.get((req, res, next) => {
		let domain = 'http://www.dictionaryapi.com/api/v1/references/collegiate/xml/';
		let key = "94625c95-0669-4898-baf1-d40c675610d7";
		let word = req.params.word;
		let path = domain + word + '?key=' + key;
		//api request to merriam webster
 		return request.get(path, (error, response, body) => {
 			if (!error && response.statusCode === 200) {
 				res.status(200).send(body);
 			}
 		})
	})

	