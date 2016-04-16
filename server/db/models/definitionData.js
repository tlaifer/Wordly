'use strict'
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
		date: {
			type: String
		},
		definitions: [{
			type: String
		}],
		partSpeech: {
			type: String
		}
});

mongoose.model('definitionData', schema);