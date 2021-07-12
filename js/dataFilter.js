let stopWords = ["a", "able", "about", "above", "abst", "accordance", "according", "accordingly", "across", "act", "actually", "added", "adj", "affected", "affecting", "affects", "after", "afterwards", "again", "against", "ah", "all", "almost", "alone", "along", "already", "also", "although", "always", "am", "among", "amongst", "an", "and", "announce", "another", "any", "anybody", "anyhow", "anymore", "anyone", "anything", "anyway", "anyways", "anywhere", "apparently", "approximately", "are", "aren", "arent", "arise", "around", "as", "aside", "ask", "asking", "at", "auth", "available", "away", "awfully", "b", "back", "be", "became", "because", "become", "becomes", "becoming", "been", "before", "beforehand", "begin", "beginning", "beginnings", "begins", "behind", "being", "believe", "below", "beside", "besides", "between", "beyond", "biol", "both", "brief", "briefly", "but", "by", "c", "ca", "came", "can", "cannot", "can't", "cause", "causes", "certain", "certainly", "co", "com", "come", "comes", "contain", "containing", "contains", "could", "couldnt", "d", "date", "did", "didn't", "different", "do", "does", "doesn't", "doing", "done", "don't", "down", "downwards", "due", "during", "e", "each", "ed", "edu", "effect", "eg", "eight", "eighty", "either", "else", "elsewhere", "end", "ending", "enough", "especially", "et", "et-al", "etc", "even", "ever", "every", "everybody", "everyone", "everything", "everywhere", "ex", "except", "f", "far", "few", "ff", "fifth", "first", "five", "fix", "followed", "following", "follows", "for", "former", "formerly", "forth", "found", "four", "from", "further", "furthermore", "g", "gave", "get", "gets", "getting", "give", "given", "gives", "giving", "go", "goes", "gone", "got", "gotten", "h", "had", "happens", "hardly", "has", "hasn't", "have", "haven't", "having", "he", "hed", "hence", "her", "here", "hereafter", "hereby", "herein", "heres", "hereupon", "hers", "herself", "hes", "hi", "hid", "him", "himself", "his", "hither", "home", "how", "howbeit", "however", "hundred", "i", "id", "ie", "if", "i'll", "im", "immediate", "immediately", "importance", "important", "in", "inc", "indeed", "index", "information", "instead", "into", "invention", "inward", "is", "isn't", "it", "itd", "it'll", "its", "itself", "i've", "j", "just", "k", "keep", "keeps", "kept", "kg", "km", "know", "known", "knows", "l", "largely", "last", "lately", "later", "latter", "latterly", "least", "less", "lest", "let", "lets", "like", "liked", "likely", "line", "little", "'ll", "look", "looking", "looks", "ltd", "m", "made", "mainly", "make", "makes", "many", "may", "maybe", "me", "mean", "means", "meantime", "meanwhile", "merely", "mg", "might", "million", "miss", "ml", "more", "moreover", "most", "mostly", "mr", "mrs", "much", "mug", "must", "my", "myself", "n", "na", "name", "namely", "nay", "nd", "near", "nearly", "necessarily", "necessary", "need", "needs", "neither", "never", "nevertheless", "new", "next", "nine", "ninety", "no", "nobody", "non", "none", "nonetheless", "noone", "nor", "normally", "nos", "not", "noted", "nothing", "now", "nowhere", "o", "obtain", "obtained", "obviously", "of", "off", "often", "oh", "ok", "okay", "old", "omitted", "on", "once", "one", "ones", "only", "onto", "or", "ord", "other", "others", "otherwise", "ought", "our", "ours", "ourselves", "out", "outside", "over", "overall", "owing", "own", "p", "page", "pages", "part", "particular", "particularly", "past", "per", "perhaps", "placed", "please", "plus", "poorly", "possible", "possibly", "potentially", "pp", "predominantly", "present", "previously", "primarily", "probably", "promptly", "proud", "provides", "put", "q", "que", "quickly", "quite", "qv", "r", "ran", "rather", "rd", "re", "readily", "really", "recent", "recently", "ref", "refs", "regarding", "regardless", "regards", "related", "relatively", "research", "respectively", "resulted", "resulting", "results", "right", "run", "s", "said", "same", "saw", "say", "saying", "says", "sec", "section", "see", "seeing", "seem", "seemed", "seeming", "seems", "seen", "self", "selves", "sent", "seven", "several", "shall", "she", "shed", "she'll", "shes", "should", "shouldn't", "show", "showed", "shown", "showns", "shows", "significant", "significantly", "similar", "similarly", "since", "six", "slightly", "so", "some", "somebody", "somehow", "someone", "somethan", "something", "sometime", "sometimes", "somewhat", "somewhere", "soon", "sorry", "specifically", "specified", "specify", "specifying", "still", "stop", "strongly", "sub", "substantially", "successfully", "such", "sufficiently", "suggest", "sup", "sure	t", "take", "taken", "taking", "tell", "tends", "th", "than", "thank", "thanks", "thanx", "that", "that'll", "thats", "that've", "the", "their", "theirs", "them", "themselves", "then", "thence", "there", "thereafter", "thereby", "thered", "therefore", "therein", "there'll", "thereof", "therere", "theres", "thereto", "thereupon", "there've", "these", "they", "theyd", "they'll", "theyre", "they've", "think", "this", "those", "thou", "though", "thoughh", "thousand", "throug", "through", "throughout", "thru", "thus", "til", "tip", "to", "together", "too", "took", "toward", "towards", "tried", "tries", "truly", "try", "trying", "ts", "twice", "two", "u", "un", "under", "unfortunately", "unless", "unlike", "unlikely", "until", "unto", "up", "upon", "ups", "us", "use", "used", "useful", "usefully", "usefulness", "uses", "using", "usually", "v", "value", "various", "'ve", "very", "via", "viz", "vol", "vols", "vs", "w", "want", "wants", "was", "wasnt", "way", "we", "wed", "welcome", "we'll", "went", "were", "werent", "we've", "what", "whatever", "what'll", "whats", "when", "whence", "whenever", "where", "whereafter", "whereas", "whereby", "wherein", "wheres", "whereupon", "wherever", "whether", "which", "while", "whim", "whither", "who", "whod", "whoever", "whole", "who'll", "whom", "whomever", "whos", "whose", "why", "widely","will", "willing", "wish", "with", "within", "without", "wont", "words", "world", "would", "wouldnt", "www", "x", "y", "yes", "yet", "you", "youd", "you'll", "your", "youre", "yours", "yourself", "yourselves", "you've", "z", "zero"];


const buildTargetCount = (data) => {
	let table = {};
	for(row of data){
		[row.t_1,row.t_2,row.t_3,row.t_4,row.t_5,row.t_6].forEach((target) => {
			if(target !== 'NA'){
				addItemToJsonCount(table,target);
			}
		})
	}
	let arr = [];
	Object.keys(table).forEach((key) => {
		arr.push({
			target : key,
			count : table[key]
		})
	})
	arr.sort((a,b) => { return b.count - a.count; })
	return arr;
}

const addItemToJsonCount = (obj,item) => {
	if(obj.hasOwnProperty(item)){
		obj[item] += 1;
	}else{
		obj[item] = 1;
	}
	return obj;
}

const buildDateCount = (data) => {
	let table = {};
	for(row of data){
		let year = row.date.split('-')[0];
		let month = row.date.split('-')[1]
		addItemToJsonCount(table,`${year}-${month}-15`);
	}
	let arr = [];
	Object.keys(table).forEach((key) => {
		arr.push({
			date : key,
			count : table[key]
		})
	})
	arr.sort((a,b) => { return b.date - a.date; })
	return arr;
}

const buildDateCountByDay = (data) => {
	let table = {};
	for(row of data){
		addItemToJsonCount(table,row.date);
	}
	let arr = [];
	Object.keys(table).forEach((key) => {
		arr.push({
			date : key,
			count : table[key]
		})
	})
	arr.sort((a,b) => { return b.date - a.date; })
	return arr;
}

const buildWordCount = (data) => {
	let table = {};
	for(row of data){
		[row.i_1,row.i_2,row.i_3,row.i_4,row.i_5,row.i_6].forEach((insult) => {
			if(insult !== 'NA'){
				insult.replace(/[^0-9A-Za-z ]/g,"").replace(/\s{2,}/g," ").toLowerCase().split(' ').forEach((word) => {
					if(!stopWords.includes(word) && isNaN(word)){
						addItemToJsonCount(table,word);
					}
				})
			}
		})
	}
	let arr = []
	Object.keys(table).forEach((key) => {
		arr.push({
			word : key,
			count : table[key]
		});
	})
	arr.sort((a,b) => { return b.count - a.count; })
	return arr;
}


const buildNodeLinksWords = (data, wordCountList, range = [0,50]) => {
	let wordCountSmall = wordCountList.splice(range[0],range[1]).map((d) => {return d.word;})
	let nodes = [];
	let links = [];
	let insultSet = new Set();
	for(row of data){
		addAInsult(row,insultSet,wordCountSmall);
	}
	let linksJson = {};
	for(insult of insultSet){
		addToLinksJson(linksJson,insult);
	}
	filterLinks(5,linksJson);
	buildNodesArr(nodes,linksJson);
	buildLinksArr(links,linksJson);
	removeDuplications(links);
	condenseLinks(links);
	removeDuplicateNodes(nodes);
	return {nodes:nodes,links:links};
}

const addAInsult = (row,insultSet,wordCountSmall) => {
	[row.i_1,row.i_2,row.i_3,row.i_4,row.i_5,row.i_6].forEach((insult) => {
		if(insult !== 'NA'){
			for(word of insult.replace(/[^0-9A-Za-z ]/g,"").replace(/\s{2,}/g," ").toLowerCase().split(' ')){
				if(wordCountSmall.includes(word)){
					let strippedInsult = insult.replace(/[^0-9A-Za-z ]/g,"").replace(/\s{2,}/g," ").toLowerCase().split(' ').filter((word) => {
						return !stopWords.includes(word) && isNaN(word);
					}).join(' ')
					insultSet.add(strippedInsult);
				}
			}
		}
	})
}

const addToLinksJson = (jason,insult) => {
	const insultArr = insult.split(' ')
	for(let i = 0; i < insultArr.length - 1; i++){
		for(let j = i + 1; j < insultArr.length; j++){
			if(jason.hasOwnProperty(insultArr[i])){
				if(jason[insultArr[i]].hasOwnProperty(insultArr[j])){
					jason[insultArr[i]][insultArr[j]] += 1;
				}else{
					jason[insultArr[i]][insultArr[j]] = 1;
				}
				
			}else{
				jason[insultArr[i]] = {};
				jason[insultArr[i]][insultArr[j]] = 1;
			}
		}
	}
}

const buildNodesArr = (nodesArr,jason) => {
	Object.keys(jason).forEach((key) => {
		nodesArr.push({id: key, group:1, radius:1})
		Object.keys(jason[key]).forEach((subKey) => {
			if(!checkIfPresent(nodesArr,subKey)){
				nodesArr.push({id:subKey,group:1, radius: 1})
			}
		})
	})
}

const checkIfPresent = (arr,node) => {
	for(let i = 0; i < arr.length; i++){
		if(arr[i].id == node){
			return true;
		}
	}
	return false;
}

const buildLinksArr = (linksArr, jason) => {
	Object.keys(jason).forEach((outerKey) => {
		Object.keys(jason[outerKey]).forEach((innerKey) => {
			linksArr.push({source: outerKey, target:innerKey, value: jason[outerKey][innerKey]});
		})
	})
}

const filterLinks = (min,jason) => {
	Object.keys(jason).forEach((outerKey) => {
		Object.keys(jason[outerKey]).forEach((innerKey) => {
			if(jason[outerKey][innerKey] < min){
				delete jason[outerKey][innerKey];
			}
		})
		if(jQuery.isEmptyObject(jason[outerKey])){
			delete jason[outerKey];
		}
	})
}

const condenseLinks = (links) => {
	let indexToRemove = [];
	for(let i = 0; i < links.length - 1; i++){
		for(let j = i; j < links.length; j++){
			if(areLinkSame(links[i],links[j])){
				links[i].value += links[j].value;
				indexToRemove.push(j);
			}
		}
	}
	indexToRemove.sort((a,b) => {return b - a ;})
	// console.log(indexToRemove);
	for(index of indexToRemove){
		links.splice(index,1);
	}
}

const removeDuplications = (links) => {
	let indexToRemove = [];
	for(let [index, value] of links.entries()){
		if(value.source == value.target){
			indexToRemove.push(index);
		}
	}
	indexToRemove.sort((a,b) => {return b - a;})
	// console.log(indexToRemove);
	for(index of indexToRemove){
		links.splice(index,1);
	}
}

const areLinkSame = (a,b) => {
	return a.source == b.target && b.source == a.target;
}

const removeDuplicateNodes = (nodes) => {
	// console.log(nodes);
	let indexToRemove = [];
	for(let i = 0; i < nodes.length - 1; i++){
		for(let j = i + 1; j < nodes.length; j++){
			if(nodes[i].id === nodes[j].id){
				indexToRemove.push(j);
			}
		}
	}

	for(let i = 0; i < nodes.length; i++){
		if(nodes[i].id === "wall"){
			indexToRemove.push(i);
			break;
		}
	}

	indexToRemove.sort((a,b) => {return b - a;})

	// console.log(indexToRemove);
	for(index of indexToRemove){
		nodes.splice(index,1);
	}
}