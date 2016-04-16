'use strict'
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	word: {
		type: String, 
		required: true
	},
	definitions: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'definitionData'
	}]
});

mongoose.model('Word', schema);