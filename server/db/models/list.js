'use strict'
var mongoose = require('mongoose');

var schema = new mongoose.model({
	title: {
		type: String,
		required: true
	},
	words: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: word
	}]
})

mongoose.model('List', schema);
