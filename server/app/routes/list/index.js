'use strict'
let router = require('express').Router(),
	List = require('mongoose').model('List');
module.exports = router;

router.route('/')
		.post((req, res, next) => {
			console.log(req.body);
			List.create(req.body)
				.then(list => {
					res.status(201).json(list);
				})
				.then(null, next);
		});