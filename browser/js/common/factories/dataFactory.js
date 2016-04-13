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
			wordObjects.push(definitionData);
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
	// get outline for rendering
	if (definitionArr.sn !== undefined) definitionObj.renderGuide = factory.formatOutline(definitionArr.sn);
	console.log('outline formatted: ', definitionObj.renderGuide);

	definitionObj.definitions = definitions;
	return definitionObj;
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

factory.formatOutline = function (outline) {
	var i = outline.length;
	while (i--) {
		if (typeof outline[i] === 'object') {
			if (outline[i]._ && outline[i]._.length > 1) {
				var pieces = outline[i]._.split(" ");
				outline.splice(i, 1, pieces[0], pieces[1]);
				i++;
			}
			else if (outline[i]._) {
				var saved = outline[i]._;
				outline.splice(i, 1, saved);
			}
			else {
				outline.splice(i, 1);
			}
		}
		else if (outline[i] && outline[i].length > 1) {
			var pieces = outline[i].split(" ");
			outline.splice(i, 1, pieces[0], pieces[1]);
		}
	}
	outline = outline.filter(function(element){
		return element !== undefined;
	})
	return outline;
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

factory.WordOutlineDef = (guide, defs) => {
	var outline = {},
	 	nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	for (var i = 0; i < guide.length; i++) {
		// check if definition has multiple subdefinitions
		if (!isNaN(+guide[i]) && isNaN(+guide[i+1])) {
			//create new array within the outline to hold subdefitions a, b, c....
			var subDef = guide[i]
			var keyRef;

			if (!outline[subDef]) {
				keyRef = subDef;
				outline[keyRef] = [];
				outline[keyRef].push(defs.splice(0, 1)[0]);

				//loop to push all subefinitions to this array
				var go = true;
				for (var j = i + 1; j < guide.length; j++) {
					if (go) {
						if (isNaN(+guide[j])) {
							outline[keyRef].push(defs.splice(0, 1)[0]);
						}

						else if (!isNaN(+guide[j])) {
							go = false;
							i = j-1;
						}
					}
				}
			}
			// if the outline object already has a key value pair, return an array of two outline objects
			else if (outline[subDef]) {
				var returnArray = [outline];
				returnArray.push(factory.WordOutlineDef(guide.slice(i), defs));
				return returnArray;
			}
		}
		else if (!isNaN(+guide[i])) {
			var keyRef;
			if (!outline[guide[i]]) {
				keyRef = guide[i];	
			}
			else if (outline[guide[i]] !== undefined) {
			// if the outline object already has a key value pair, return an array of two outline objects
				var returnArray = [outline];
				returnArray.push(factory.WordOutlineDef(guide.slice(i), defs));
				return returnArray;
			}
			outline[keyRef] = defs.splice(0,1)[0];
		}
	}
	return outline;
};

factory.getDefinitionsOne = (word, data) => {
	var toManipulate = data.entry_list.entry,
		wordArr = [];
	toManipulate.forEach(function(entry) {
		if (entry.ew !== undefined && entry.ew[0] === word) {
			var newDef = factory.definitionGetter(entry);
			if (newDef.renderGuide === undefined && newDef) wordArr.push(newDef.definitions);
			else if (newDef !== undefined && newDef !== 'obsolete') {
				var result = factory.WordOutlineDef(newDef.renderGuide, newDef.definitions);
				wordArr = wordArr.concat(result);	
			}		
		}
	})
	return wordArr;
};

	return factory;

});