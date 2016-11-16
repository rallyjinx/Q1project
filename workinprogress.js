// Make an object of the synonyms
var synObj = {};
function callback(nws, ind) {
  synObj[ind] = nws;
  return synObj;
} //end callback

var unchanged = {};
var wordCount = 1;
function getSyn(word, index, callback) {
  //console.log("word", word);

//  $.getJSON('http://words.bighugelabs.com/api/2/a88271c6246b036bed146df0b7463eac/' + word + '/json', function (data) {
//  $.getJSON('http://words.bighugelabs.com/api/2/28b3aeb788f1c24f4a1e1771b32ab1bb/' + word + '/json', function (data) {
  // data = {"adjective":{"syn":["felicitous","glad","well-chosen"],"ant":["unhappy"],"rel":["felicitous","glad","cheerful","content","contented","elated","euphoric","joyful","joyous"],
  // "sim":["felicitous","blessed","blissful","bright","fortunate","golden","halcyon","laughing","prosperous","riant","willing"]}}
//  data = dance
data = {} //for word = told
// data = {"adjective":{"ant":["unhappy"],"rel":["felicitous","glad","cheerful","content","contented","elated","euphoric","joyful","joyous"],
// "sim":["felicitous","blessed","blissful","bright","fortunate","golden","halcyon","laughing","prosperous","riant","willing"]}}
var items = [];
if (jQuery.isEmptyObject(data)) {
  unchanged[index] = word;
} else {
for (var key in data) {
  console.log("data[key]", data[key].syn);
  if (typeof data[key].syn !== 'undefined') {
    for (var i = 0; i < data[key].syn.length; i++) {
      items.push(data[key].syn[i]);
    }
  } else if (typeof data[key].sim !== 'undefined') {
    for (var i = 0; i < data[key].sim.length; i++) {
      items.push(data[key].sim[i]);
    }
  } else if (typeof data[key].rel !== 'undefined') {
    for (var i = 0; i < data[key].rel.length; i++) {
      items.push(data[key].rel[i]);
    }
  } else { //this part unnecessary with initial if???
//      console.log('wtf');
    console.log(unchanged);
    items.push(word);
    }
}
  let newWord = items[Math.floor(Math.random() * items.length)];
  var obj = {};
  var synonyms = {};
  obj = callback(newWord, index);
  console.log(obj, unchanged);
  synonyms = Object.assign({}, obj, unchanged);
//    console.log(synonyms);

//output new lyrics onto screen
console.log(synonyms, Object.keys(synonyms).length, wordCount)
if (Object.keys(synonyms).length === wordCount) {
//      console.log(synonyms, Object.keys(synonyms).length, wordCount);
  //iterate over keys and display
  let str = ""
  for (var k in synonyms) {
  //  $('#output').append('<p id="outtext">'k'</p>');
    str = str + " " + synonyms[k];
//    $("p").append(synonyms[k]);
  }
//  $('#outtext').append(str);
  console.log(str);
}
}


//}); //end getJSON - closure
} //end getSyn

getSyn("happy", 1, callback);
