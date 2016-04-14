app.factory('dataFactory', () => {
	let factory = {};

	factory.wordObjectParser = function (word, data) {
		var searchData = data.entry_list.entry,
			wordId,
			wordObjects = [];
			
		searchData.forEach(function(entry) {
			wordId = entry.ew[0];
			if (wordId === word) {
				var definitionData = factory.definitionGetter(entry);
				if (definitionData !== 'empty') wordObjects.push(definitionData);
			}
		})
		return wordObjects;
	};

	factory.definitionGetter = function (defData) {
		var definitionArr = defData.def[0],
			definitionObj = {},
			definitions = [];
		if (definitionArr.sl && definitionArr.sl.indexOf('obsolete') >= 0) return 'obsolete';
		definitionArr.dt.forEach(function (definition, index, array){
			//traverse definition arrays and return all necessary definition strings
			if (typeof definition  === 'string' && definition !== "") {
				definition = factory.colonSplice(definition);
				definition = definition.trim();
				definitions.push(definition);
			}
			else if (typeof definition === 'object' && definition._ !==  undefined) {
				var underscoreDefArr = factory.underscoreWordParse(definition);
				definitions = definitions.concat(underscoreDefArr);
			}
		});
		//get date info 
		if (definitionArr.date !== undefined) definitionObj.date = definitionArr.date[0];
		//get part of speech
		if (defData.fl !== undefined) definitionObj.partSpeech = defData.fl[0];		
		
		// remove duplicate definitions 
		function removeDups (arr) {
			var result = [];
			arr.forEach(function(el){
				if (result.indexOf(el) < 0 && el !== "") result.push(el);
			})
			return result;
		};

		definitions = removeDups(definitions);

		// make sure that definition array isn't empty
		if (definitions.length > 0) {
			definitionObj.definitions = definitions;
			return definitionObj;
		}
		else {
			return 'empty';
		}	
	};

	factory.underscoreWordParse = function (underscoreStr) {
		var underscoreDefs = [];
		if (underscoreStr._.length > 2) {
			var defUnderscore = underscoreStr._;
			if (underscoreStr.fw !== undefined) defUnderscore += underscoreStr.fw.join(' ');
			defUnderscore = factory.colonSplice(defUnderscore)
			defUnderscore = defUnderscore.trim();
			underscoreDefs.push(defUnderscore);
		}
		else if (underscoreStr._.length <= 2) {
			var sxArray = underscoreStr.sx;
			if (typeof sxArray[0] === 'object') {
				var trimmedSubDef = sxArray[0]._.trim();
				underscoreDefs.push(trimmedSubDef);
			}
			else if (typeof sxArray[0] === 'string' && sxArray.length === 1) {
				var cleanStr = factory.colonSplice(sxArray[0]);
				underscoreDefs.push(cleanStr);
			} 
			else {
				underscoreDefs.push(sxArray.join(', '));
			}
		}
		return underscoreDefs;
	};

	factory.colonSplice = function (str) {
		while (str.indexOf(':') !== -1) {
			var colonToSlice = str.indexOf(':');
			str = factory.stringSplice(str, colonToSlice, 1)
		}
		return str;
	};

	factory.stringSplice = function (str, index, count, add) {
	  return str.slice(0, index) + (add || "") + str.slice(index + count);
	};

	return factory;

});