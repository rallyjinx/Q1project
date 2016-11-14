$( document ).ready(function() {
    console.log( "ready!" );
});

//global variables
var asynonymous = ['on', 'the', 'a', 'an', 'me', 'I', 'you', 'this', 'that', 'these', 'those', 'my', 'your', 'his', 'her', 'hers', 'its', 'our',
                    'ours', 'their', 'theirs', 'whose', 'which', 'what', 'where', 'why', 'how', 'when', 'whichever', 'whatever', 'any', 'we', 'us', 'much',
                    'many', 'few', 'more', 'most', 'less', 'fewer', 'least', 'fewest', 'every', 'never', 'very', 'always', 'too', 'so', 'each', 'yes',
                    'almost'];
var unchanged = {};
var synonyms = [];
var synArray = [];

//when the submit button is clicked
$('#submit').on('click', function(event) {
  event.preventDefault();
  console.log('submit button clicked!');

  //save text in textarea as a string.slice()
  let words = $('#input-box').val()
  //get rid of extra whitespace
  words = words.replace(/\s+/g, ' ');
  //split textarea input words into array
  let wordArray = words.split(' ');

  //iterate over each word in the array
  for (var i = 0; i < wordArray.length; i++) {
    let word = wordArray[i];
  //  console.log(word);

    //strip punctuation (AND SAVE???)
    word = punctuation(word);

    //check that the word is not in the asynonymous list
    if (asynonymous.indexOf(word) === -1) {
      //make the API call, if success increment the API call counter
      getSyn(word, callback);
//     function getSyn(word, callback) {
//    change:  var fullname = "default";
//     $.getJSON('http://words.bighugelabs.com/api/2/a88271c6246b036bed146df0b7463eac/' + word + '/json', function (jsonData) {
//  change:       fullname = jsonData.firstname + " " + jsonData.lastname;
//  change:       callback(fullname);
//     });
// }


//       $.getJSON('http://words.bighugelabs.com/api/2/a88271c6246b036bed146df0b7463eac/' + word + '/json', function(data) {
//           var items = [];
//         // console.log(data);
//          $.each( data, function( key, val ) {
//           //  console.log("key, val", key, val); //output : adjective Object { syn: Array[3], ant: Array[1], rel: Array[9], sim: Array[11] }
//           //  console.log("synonyms", val.syn);
//            for (var i = 0; i < val.syn.length; i++) {
//              items.push(val.syn[i])
//            }
//           //items contains an array of synonyms
//         //  console.log("items", items);
//           //pick one randomly and save it somewhere
//           let newWord = items[Math.floor(Math.random() * items.length)];
//           //console.log("converted", word, "to", newWord);
//           synonyms.push(newWord);       //can't access outside of call - need to do the callback function thingy
//          });
//       }); //end getJSON
    } else {
      //if the word is in the asynonymous list, save word, [i] so that we know (roughly) where to put it back
      unchanged[word] = i;
    } //end if-else
  } //end for loop
//  console.log("synonym array", synArray);
}); //end submit click handler

var synArray = [];
function callback(nws) {
//  console.log("callback function", nws);
  //synArray.push(nw);
}


function punctuation(w) {
  //strip punctuation and SAVE WHERE IT IS TO PUT IT BACK????

  let punct = [',', '.', '?', '(', ')', '!', ':', ';', "\'", "\""];
  let index;

  for (let i = 0; i < w.length; i++) {

    if (punct.indexOf(w[i]) > -1) {
      //save the word (w) and the index of the punctuation (i) - won't work because new word could be different length
      //how to remember that there is a word with punctuation?
       if (i === 0) {
         w = w.slice(1, w.length);
        // console.log("sliced",  w);
       } else if (i === w.length-1) {
         w = w.slice(0, i);
      //   console.log("sliced",  w);
       }
    }
  }
  return w;
} //end punctuation()


function getSyn(word, callback) {
  //console.log("word", word);

  //$.getJSON('http://words.bighugelabs.com/api/2/a88271c6246b036bed146df0b7463eac/' + word + '/json', function (data) {
  $.getJSON('http://words.bighugelabs.com/api/2/28b3aeb788f1c24f4a1e1771b32ab1bb/' + word + '/json', function (data) {
    var items = [];
    console.log(data);
    $.each( data, function( key, val) { //data = Object {noun: Object, verb: Object}
      console.log(word, key, val);
        if (val.syn.length > 0) {
        //  console.log("syn not empty", val.syn[i]);
          for (var i = 0; i < val.syn.length; i++) {
            items.push(val.syn[i]);
          //  console.log("syn", val.syn[i], i);
          }
        } else if (val.sim.length > 0) {
      //    console.log("sim not empty");
          for (var i = 0; i < val.sim.length; i++) {
            items.push(val.sim[i]);
        //    console.log("sim", val.sim[i], i);
          }
          // let newWord = items[Math.floor(Math.random() * items.length)];
          // console.log(word, newWord);
          // callback(newWord);
        } else if (val.rel.length > 0) {   //if it has sim & rel it does both...
      //    console.log("rel not empty");
          for (var i = 0; i < val.rel.length; i++) {
            items.push(val.rel[i]);
      //      console.log("rel", val.rel[i], i);
          }
          // let newWord = items[Math.floor(Math.random() * items.length)];
          // console.log(word, newWord);
          // callback(newWord);
        } else {
          //word needs to be saved in unchanged...hmm, how to do that from here?
          // console.log(word, newWord);
          // callback(word);
          items.push(word);
        }
        let newWord = items[Math.floor(Math.random() * items.length)];
      //  console.log(word, newWord);
        callback(newWord);


  //     console.log(items);
  //     let newWord = items[Math.floor(Math.random() * items.length)];
  //     console.log(newWord);
  //     synonyms.push(newWord);
  //     console.log(synonyms);
  // //    console.log("new word", newWord);
  //   callback(synonyms);
  });
  }); //end getJSON
} //end getSyn()
