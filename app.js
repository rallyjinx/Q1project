$( document ).ready(function() {
    console.log( "ready!" );
});

//global variables
var asynonymous = ['on', 'some', 'the', 'a', 'an', 'me', 'i', 'you', 'this', 'that', 'these', 'those', 'my', 'your', 'his', 'her', 'hers', 'its', 'our',
                    'ours', 'their', 'theirs', 'whose', 'which', 'what', 'where', 'why', 'how', 'when', 'whichever', 'whatever', 'any', 'we', 'us', 'much',
                    'many', 'few', 'more', 'most', 'less', 'fewer', 'least', 'fewest', 'every', 'never', 'very', 'always', 'too', 'each', 'yes',
                    'almost', 'yours', 'mine', 'him', 'hers', 'he', 'she', 'it', 'is', 'was', 'and', 'with', 'without', 'in', 'if', 'also', 'but', 'though',
                    'although', 'could', 'would', 'should', 'couldn\'t', 'wouldn\'t', 'shouldn\'t', 'don\'t', 'won\'t', 'can\'t', 'didn\'t', 'knew', 'know',
                    'been', 'be', 'must', 'they', 'are', 'of'];

var unchanged = {};
var obj = {};
var counter = 0;
var nearLimit = 800;
var limit = 1000;


//Submit button click handler
$('#submit').on('click', function(event) {
  event.preventDefault();
  let words = $('#input-box').val()
  // format input
  console.log(typeof words);
  let wordArray = formatInput(words);
  wordCount = wordArray.length;
  for (var i = 0; i < wordArray.length; i++) {
    word = punctuation(wordArray[i]);
    if (asynonymous.indexOf(word) === -1) {
      //make the API call, if success increment the imaginary API call counter
      callAPI(word, i);
    } else {
      //if the word is in the asynonymous list, save word, index so it can be put back
      unchanged[i] = word;
    } //end if
  } //end for
}); //end submit click handler

var newlineLocation = [];
function formatInput(rawInput) {
  newLine(rawInput);
  rawInput = rawInput.replace(/\s+/g, ' ').toLowerCase();
  let formattedInput = rawInput.split(' ').filter(function(el) {return el.length !== 0});
  return formattedInput;
}

function newLine(theInput) {
  theInput = theInput.split('\n');
  let temp;
  let loc = -1;
  for (var i = 0; i < theInput.length; i++) {
    temp = theInput[i].split(' ');
    loc = loc + temp.length;
    newlineLocation.push(loc);
  }
  console.log(newlineLocation);

  }


function punctuation(w) {
  //strip punctuation and SAVE WHERE IT IS TO PUT IT BACK????
  let punct = [',', '.', '?', '(', ')', '!', ':', ';', "\'", "\""];
  for (let i = 0; i < w.length; i++) {
    if (punct.indexOf(w[i]) > -1) {
       if (i === 0) {
         w = w.slice(1, w.length);
       } else if (i === w.length-1) {
         w = w.slice(0, i);
       }
    }
  }
  return w;
} //end punctuation()

function outputText(syn) {
    let str = ""
    for (var k in syn) {
      for (var i = 0; i < newlineLocation.length; i++) {
        if (newlineLocation[i] == k) {
          syn[k] = syn[k] + '<br>'
        }
      }
      str = str + " " + syn[k];
    }
    $('#outtext').append(str);
    $('#counter').append(counter); //might this need to be localStorage instead? and cleared...
}

function callAPI(word, index) {
  var synonyms = {};
  var $xhr = $.getJSON('http://words.bighugelabs.com/api/2/28b3aeb788f1c24f4a1e1771b32ab1bb/' + word + '/json');
    counter++;
    $xhr.done(function(data) {
      var items = [];
      for (var key in data) {
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
        }
      } //end for

      let newWord = items[Math.floor(Math.random() * items.length)];
      obj[index] = newWord;
      synonyms = Object.assign({}, obj, unchanged);

    // output new lyrics onto screen
      if (Object.keys(synonyms).length === wordCount) {
        outputText(synonyms);
      }

     }); //end $xhr.done
     $xhr.fail(function(jqxhr, textStatus, error) {
        unchanged[index] = word;
        synonyms = Object.assign({}, obj, unchanged);
        // output new lyrics onto screen
        if (Object.keys(synonyms).length === wordCount) {
          outputText(synonyms);
        }
      }); //end $xhr.fail
} //end callAPI
