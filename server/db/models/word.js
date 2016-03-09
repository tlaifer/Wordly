'use strict'
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	word: {
		type: String, 
		required: true
	},
	definition: {
		type: [String],
		required: true
	},
	partOfSpeech: {
		type: String,
		required: true
	},
	date: {
		type: String
	}
});