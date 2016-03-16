var dummyDict = {"entry_list":{"$":{"version":"1.0"},"entry":[{"$":{"id":"hello"},"ew":["hello"],"hw":["hel*lo"],"sound":[{"wav":["hello001.wav"],"wpr":["hu-!lO"]}],"pr":["hə-ˈlō, he-"],"fl":["noun"],"in":[{"il":["plural"],"if":["hellos"]}],"et":[{"_":"alteration of ","it":["hollo"]}],"def":[{"date":["1877"],"dt":[{"_":":an expression or gesture of greeting ","un":["used interjectionally in greeting, in answering the telephone, or to express surprise"]}]}]},{"$":{"id":"hullo"},"ew":["hullo"],"hw":["hul*lo"],"sound":[{"wav":["hullo001.wav"],"wpr":["(+)hu-!lO"]}],"pr":["(ˌ)hə-ˈlō"],"cx":[{"cl":["chiefly British variant of"],"ct":["hello"]}]}]}};

var dummyThes = {"entry_list":{"$":{"version":"1.0"},"entry":[{"$":{"id":"hello"},"term":[{"hw":["hello"]}],"fl":["noun"],"sens":[{"mc":["an expression of goodwill upon meeting"],"vi":[{"_":"we said our and got right down to business","it":["hellos"]}],"syn":["greeting, salutation, salute, welcome"],"rel":["ave, hail; amenities, civilities, pleasantries; regards, respects, wishes"],"ant":[{"_":"adieu, bon voyage, congé ( congee), farewell, Godspeed, good-bye ( good-by)","it":["also","or"]}]}]}]}};

function dataParse (data) {
	var newWord = {};

	newWord.word = data.ew[0];
	newWord.partSpeech = data.fl[0];
	newWord.date = data.def[0].date[0];
	newWord.def = data.def[0].dt
	newWord.pronunciation = data.pr;

	console.log('my word: ', newWord);
	return newWord;
}

function Word (wordOBJ) {
	this.word = wordOBJ.word;
	this.def = wordOBJ.def;
	this.pronunciation = wordOBJ.pronunciation;
	this.partSpeech = wordOBJ.partSpeech;
}

var dummyEntry = dummyDict.entry_list.entry[0];

var hello = dataParse(dummyEntry);

var helloData = new Word(hello);
console.log('hello: ', helloData);

