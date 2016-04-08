app.factory('dataFactory', () => {
	
	let factory = {};
	
	// retrieves strings of all definitions from the mess of json returned from the backend
	factory.definitionParser = (defObject) => {
		var mappedDefs = [];
		if (defObject.def[0].sl && defObject.def[0].sl.indexOf('obsolete') >= 0) return 'obsolete';

		defObject.def[0].dt.forEach(function(definition){
			if (typeof definition  === 'string') mappedDefs.push(definition);
			else if (definition._ !== undefined && definition._.length > 2) {
				var defStr = definition._;
				//some of merrriam webster subdefinitions are stored as values to the '_' key
				//furthermore, some of these subdefinition strings end with a colon (": ") in order to display examples
				//this if statement checks and deletes the colon before trimming the string
				if (defStr[defStr.length-1] === ':') {
					defStr = defStr.slice(0, -1);
				}
				defStr = defStr.trim();
				mappedDefs.push(defStr);
			}
			else if (definition._ !== undefined && definition._.length <= 2) {
				if (typeof definition.sx[0] === 'string') {
					if (definition.sx.length === 1) mappedDefs.push(definition.sx[0]);
					else  mappedDefs.push(definition.sx.join(', '));
				}
				else if (typeof definition.sx[0] === 'object') {
					var trimmedSubDef = definition.sx[0]._.trim();
					mappedDefs.push(trimmedSubDef);
				}
			}
		})
		mappedDefs = mappedDefs.filter(function(def){return def !== ':'});
		return mappedDefs;
	};

	//returns an array of definition-outline objects
	factory.wordOutline = (guide) => {
		var outline = {};
		var nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
		if (!guide || !guide.length) return undefined;
		for (var i = 0; i < guide.length; i++) {
			// check if definition has multiple subdefinitions
			if (guide[i].length > 1) {
				//create new array within the outline to hold subdefitions a, b, c....
				var subDef = guide[i].split(' ');
				var keyRef;

				if (!outline[subDef[0]]) {
					keyRef = subDef[0];
					
				}
				else {
					keyRef = subDef[0] + '.1';
				}
				
				outline[keyRef] = [];
				outline[keyRef].push(subDef[1]);

				//loop to push all subefinitions to this array
				var go = true;
				for (var j = i + 1; j < guide.length; j++) {
					if (go) {
						if (guide[j].length === 1 && nums.indexOf(guide[j]) < 0) {
							outline[keyRef].push(guide[j]);
						}

						else if (guide[j].length !== 1 || nums.indexOf(guide[j]) > -1) {
							go = false;
							i = j -1;
						}
					}
				}
			}
			else if (guide[i].length === 1 && nums.indexOf(guide[i]) > 0) {
				var keyRef;

				if (!outline[guide[i]]) {
					keyRef = guide[i];
					
				} else {
					keyRef = guide[i] + '.1';
				}

				outline[keyRef] = 'Def' + keyRef;
			}
		}
		return outline;
	};

	factory.WordOutlineDef = (guide, defs) => {
		var outline = {};
		var nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
		if (!guide && defs) {
			console.log('undefined guide def: ', defs);
			return defs;
		}
		else if (!guide) return undefined;
		for (var i = 0; i < guide.length; i++) {
			// check if definition has multiple subdefinitions
			if (guide[i].length > 1) {
				//create new array within the outline to hold subdefitions a, b, c....
				var subDef = guide[i].split(' ');
				var keyRef;

				if (!outline[subDef[0]]) {
					keyRef = subDef[0];
					
				}
				else {
					keyRef = subDef[0] + '.1';
				}
				
				outline[keyRef] = [];
				outline[keyRef].push(defs.splice(0, 1)[0]);

				//loop to push all subefinitions to this array
				var go = true;
				for (var j = i + 1; j < guide.length; j++) {
					if (go) {
						if (guide[j].length === 1 && nums.indexOf(guide[j]) < 0) {
							outline[keyRef].push(defs.splice(0, 1)[0]);
						}

						else if (guide[j].length !== 1 || nums.indexOf(guide[j]) > -1) {
							go = false;
							i = j-1;
						}
					}
				}
			}
			else if (guide[i].length === 1) {
				var keyRef;

				if (!outline[guide[i]]) {
					keyRef = guide[i];
					
				}
				else {
				// temporarily disabled... if the for loop encounters a new definition altogether, simply return
				//Once basic rendering is figured out, the outline and fullRender functions will be reworked to accomodate distinct definitions
					keyRef = guide[i] + '.1';
					// outline[keyRef] = WordOutline(guide.slice(i));
					// return outline;
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
			if (entry.ew[0].toLowerCase() === word.toLowerCase()) {
				var newDef = factory.definitionParser(entry);
				var result = factory.WordOutlineDef(entry.def[0].sn, newDef);
				if (newDef !== 'obsolete') wordArr.push(result);			
			}
		})
		return wordArr;
	};

	// returns an object containing defintions arrays and respective outlines for the definitions
	factory.wordParse = (word, data) => {
		var toParse = data.entry_list.entry,
			wordObject = [];

		//temporary response, will build function to display search suggestions
		if (toParse === undefined) return "That word doesn't seem to exist!";

		toParse.forEach(function(entry) {
			if (entry.ew[0] === word) {
				var newDef = factory.definitionParser(entry),
					outline = factory.wordOutline(entry.def[0].sn),
					newEntry = {};
				if (newDef !== 'obsolete') {
					newEntry.outline = outline;
					newEntry.definitions = newDef;
					newEntry.defCount = newDef.length;
					wordObject.push(newEntry);
				}
			}
		})

		return wordObject;
	};

	return factory;

});