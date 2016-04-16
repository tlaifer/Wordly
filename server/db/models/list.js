'use strict'
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	title: {
		type: String,
		required: true
	},
	words: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Word'
	}]
})

mongoose.model('List', schema);
