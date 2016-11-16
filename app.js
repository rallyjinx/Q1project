$( document ).ready(function() {
    console.log( "ready!" );
});

//global variables
var asynonymous = ['on', 'some', 'the', 'a', 'an', 'me', 'i', 'you', 'this', 'that', 'these', 'those', 'my', 'your', 'his', 'her', 'hers', 'its', 'our',
                    'ours', 'their', 'theirs', 'whose', 'which', 'what', 'where', 'why', 'how', 'when', 'whichever', 'whatever', 'any', 'we', 'us', 'much',
                    'many', 'few', 'more', 'most', 'less', 'fewer', 'least', 'fewest', 'every', 'never', 'very', 'always', 'too', 'each', 'yes',
                    'almost', 'yours', 'mine', 'him', 'hers', 'he', 'she', 'it', 'is', 'was', 'and', 'with', 'without', 'in', 'if', 'also', 'but', 'though',
                    'although', 'could', 'would', 'should', 'couldn\'t', 'wouldn\'t', 'shouldn\'t', 'don\'t', 'won\'t', 'can\'t', 'didn\'t', 'knew', 'know',
                    'been', 'be', 'must', 'they', 'of'];
var unchanged = {};

//when the submit button is clicked
$('#submit').on('click', function(event) {
  event.preventDefault();

  //save text in textarea as a string.slice()
  let words = $('#input-box').val()
  //get rid of extra whitespace
  words = words.replace(/\s+/g, ' ');
  words = words.toLowerCase();
  //split textarea input words into array
  let wordArray = words.split(' ');

  wordCount = wordArray.length-1;

  //iterate over each word in the array
  for (var i = 0; i < wordArray.length; i++) {
    let word = wordArray[i];
  //  console.log("word from entered text, index", word, "-", i);

    //strip punctuation (AND SAVE???)
    word = punctuation(word);

    //check that the word is not in the asynonymous list
    if (asynonymous.indexOf(word) === -1) {
      //make the API call, if success increment the API call counter
      getSyn(word, i, callback);

    } else {
      //if the word is in the asynonymous list, save word, index so it can be put back
      unchanged[i] = word;
    //  console.log(unchanged);
    } //end if-else
  } //end for loop
}); //end submit click handler

// Make an object of the synonyms
var synObj = {};
function callback(nws, ind) {
  synObj[ind] = nws;
  return synObj;
} //end callback

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


function getSyn(word, index, callback) {
  //console.log("word", word);
  // var jqxhr = $.getJSON( "example.json", function() {
  //   console.log( "success" );
  // })
  //   .done(function() {
  //     console.log( "second success" );
  //   })
  //   .fail(function() {
  //     console.log( "error" );
  //   })
  //   .always(function() {
  //     console.log( "complete" );
  //   });
  $.getJSON('http://words.bighugelabs.com/api/2/a88271c6246b036bed146df0b7463eac/' + word + '/json', function (data) {
//  $.getJSON('http://words.bighugelabs.com/api/2/28b3aeb788f1c24f4a1e1771b32ab1bb/' + word + '/json', function (data) {

    //need to check for 404 error here, or status === 200 :p
    console.log(word, data);
  //  console.log(jQuery.isEmptyObject(data), word, data);

      var items = [];
    for (var key in data) {
  //    console.log("data[key]", data[key], "word", word);
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
      } else {
  //      console.log('wtf');
  //      console.log(unchanged);
        items.push(word);
        }
      }
      let newWord = items[Math.floor(Math.random() * items.length)];
      var obj = {};
      var synonyms = {};
      obj = callback(newWord, index);
//      console.log(obj, unchanged);
      synonyms = Object.assign({}, obj, unchanged);
  //    console.log(synonyms);

    //output new lyrics onto screen
//    console.log(synonyms, Object.keys(synonyms).length, wordCount)
    if (Object.keys(synonyms).length === wordCount) {
//      console.log(synonyms, Object.keys(synonyms).length, wordCount);
      //iterate over keys and display
      let str = ""
      for (var k in synonyms) {
      //  $('#output').append('<p id="outtext">'k'</p>');
        str = str + " " + synonyms[k];
    //    $("p").append(synonyms[k]);
      }
      $('#outtext').append(str);

    }

//    $.each( data, function( key, val) { //data = Object {noun: Object, verb: Object}
//    console.log("key", key, "val", val, "data", data);
//         if (typeof val.syn !== undefined || val.syn.length > 0) {
//         //  console.log("syn not empty", val.syn[i]);
//           for (var i = 0; i < val.syn.length; i++) {
//           //  console.log("syn", val.syn[i]);
//             items.push(val.syn[i]);
//           }
//         } else if (typeof val.sim !== undefined || val.sim.length > 0) {
//           for (var i = 0; i < val.sim.length; i++) {
//       //      console.log("sim", val.sim[i]);
//             items.push(val.sim[i]);
//           }
//         } else if (typeof val.rel !== undefined || val.rel.length > 0) {   //if it has sim & rel it does both...
//           for (var i = 0; i < val.rel.length; i++) {
//       //      console.log("rel", val.rel[i]);
//             items.push(val.rel[i]);
//           }
//         } else {
//     //      console.log('wtf');
//           items.push(word);
//         }
//     //    console.log("items", items);
//         let newWord = items[Math.floor(Math.random() * items.length)];
//
//         var obj = {};
//         var synonyms = {};
//
//         obj = callback(newWord, index);
//   //      console.log(obj, unchanged);
//         synonyms = Object.assign({}, obj, unchanged);
//     //    console.log(synonyms);
//
//       //output new lyrics onto screen
// //      console.log(obj, Object.keys(synonyms).length, wordCount)
//       if (Object.keys(synonyms).length === wordCount) {
//   //      console.log(synonyms, Object.keys(synonyms).length, wordCount);
//         //iterate over keys and display
//         let str = ""
//         for (var k in synonyms) {
//         //  $('#output').append('<p id="outtext">'k'</p>');
//           str = str + " " + synonyms[k];
//       //    $("p").append(synonyms[k]);
//         }
//         $('#outtext').append(str);
//
//       }
//    }); //end $.each - closure

  }); //end getJSON - closure
} //end getSyn()
