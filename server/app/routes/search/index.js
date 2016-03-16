'use strict'
let router = require('express').Router(),
	request = require('request'),
	parseString = require('xml2js').parseString,
	key = require('../../../../keys/dictionary_keys.js') || '',
	dictPath = 'http://www.dictionaryapi.com/api/v1/references/collegiate/xml/',
	thesPath = 'http://www.dictionaryapi.com/api/v1/references/thesaurus/xml/';
module.exports = router;

router.route('/dictionary/:word')
	.get((req, res, next) => {
		let path = dictPath + req.params.word + '?key=' + key.dictionary;
		//api request to merriam webster
 		return request.get(path, (error, response, body) => {
 			if (!error && response.statusCode === 200) {
 				parseString(body, (err, result) => {
 					console.log('dictionary ', result);
 					res.status(200).send(result);
 				})
 			}
 		})
	})

router.route('/thesaurus/:word')
	.get((req, res, next) => {
		let path = thesPath + req.params.word + '?key=' + key.thesaurus;
		return request.get(path, (error, response, body) => {
			if (!error && response.statusCode === 200) {
				parseString(body, (err, result) => {
					console.log('thesaurus ',  result);
					res.status(200).send(result);
				})
			}
		})
	})

	