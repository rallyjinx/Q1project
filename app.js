$( document ).ready(function() {
    console.log( "ready!" );

//global variables
var asynonymous = ['on', 'some', 'the', 'a', 'an', 'me', 'i', 'you', 'this', 'that', 'these', 'those', 'my', 'your', 'his', 'her', 'hers', 'its', 'our',
                    'ours', 'their', 'theirs', 'whose', 'which', 'what', 'where', 'why', 'how', 'when', 'whichever', 'whatever', 'any', 'we', 'us', 'much',
                    'many', 'few', 'more', 'most', 'less', 'fewer', 'least', 'fewest', 'every', 'never', 'very', 'always', 'too', 'each', 'yes',
                    'almost', 'yours', 'mine', 'him', 'hers', 'he', 'she', 'it', 'is', 'was', 'and', 'with', 'without', 'in', 'if', 'also', 'but', 'though',
                    'although', 'could', 'would', 'should', 'couldn\'t', 'wouldn\'t', 'shouldn\'t', 'don\'t', 'won\'t', 'can\'t', 'didn\'t', 'knew', 'know',
                    'been', 'be', 'must', 'they', 'are', 'of', 'or', 'oh'];
var unchanged = {};
var obj = {};
var newlineLocation = [];
var punctRememberer = {};
var lineBreak = [];
var count = 0;
$('#counter').append(localStorage.getItem('count'));

//Submit button click handler
$('#submit').on('click', function(event) {
  event.preventDefault();
  let words = $('#input-box').val()
  // format input
  let wordArray = formatInput(words);
  wordCount = wordArray.length;
  for (var i = 0; i < wordArray.length; i++) {
    word = punctuation(wordArray[i], i);
    if (asynonymous.indexOf(word) === -1) {
      //call the API for that word
      callAPI(word, i);
    } else {
      //save the original word and index to be combined later with synonyms
      unchanged[i] = word;
    } //end if
  } //end for
}); //end submit click handler

//Clear button click handler
$('#clear').on('click', function() {
  localStorage.clear();
  location.reload();
});

//Reset button click handler
$('#reset').on('click', function() {
  location.reload();
});

//Format input to be readable by the API
function formatInput(rawInput) {
  newLine(rawInput);
  rawInput = rawInput.replace(/\s+/g, ' ').toLowerCase();
  let formattedInput = rawInput.split(' ').filter(function(el) {return el.length !== 0});
  return formattedInput;
}
//Find line breaks and remember where they are
function newLine(theInput) {
  theInput = theInput.split('\n');
  let temp;
  let loc = -1;
    for (var i = 0; i < theInput.length; i++) {
      if (theInput[i] !== "") {
        temp = theInput[i].split(' ');
        loc = loc + temp.length;
        newlineLocation.push(loc);
      } else {
        lineBreak.push(i);
      }
    }
  }
//Find punctuation and remember where it is
function punctuation(w, ind) {
  let punct = [',', '.', '?', '(', ')', '!', ':', ';', "\'", "\""];
  for (let i = 0; i < w.length; i++) {
    if (punct.indexOf(w[i]) > -1) {
       if (i === 0) {
         punctRememberer[ind] = w[i];
         w = w.slice(1, w.length);
       } else if (i === w.length-1) {
           //change VERBin' to VERBing
           if (w[i] === "\'") {
             w = w.slice(0, i);
             w = w + 'g';
           } else {
           punctRememberer[ind] = w[i];
           w = w.slice(0, i);
           }
       }
    }
  }
  return w;
} //end punctuation()

//Display text, adding line breaks and punctuation back in
function outputText(syn) {
    let str = ""
    let line = 0;
    for (var k in syn) {
      for (var x in punctRememberer) {
        if (x == k) {
          syn[k] = syn[k] + punctRememberer[x];
        }
      }
      for (var i = 0; i < newlineLocation.length; i++) {
        if (newlineLocation[i] == k) {
          syn[k] = syn[k] + '\n';
          line++;
        }
        if (lineBreak[i] === line) {
          syn[k] = '\n ' + syn[k];
          line++;
        }
      }
      str = str + " " + syn[k];
    }
    $('#outtext').val(str);
  //  $('#counter').append(localStorage.getItem('count'));
}

function counter() {
  str_count = localStorage.getItem("count");
  if (str_count == null || str_count == "null"){
    count = 0;
  } else {
    count = parseInt(str_count);
  }
  count++;
  localStorage.setItem("count", count);
}

function callAPI(word, index) {
  var synonyms = {};
  var $xhr = $.getJSON('http://words.bighugelabs.com/api/2/a88271c6246b036bed146df0b7463eac/' + word + '/json');
    counter();
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

      //Pick a random synonym and save to object
      let newWord = items[Math.floor(Math.random() * items.length)];
      obj[index] = newWord;
      //Combine synonyms and original words
      synonyms = Object.assign({}, obj, unchanged);
      //When done, output new lyrics onto screen
      if (Object.keys(synonyms).length === wordCount) {
        outputText(synonyms);
      }

     }); //end $xhr.done
     $xhr.fail(function(jqxhr, textStatus, error) {
       if ($xhr.status === 500) {
         alert("API call daily limit exceeded. Please try again in 24 hours.");
         return;
       }
        unchanged[index] = word;
        synonyms = Object.assign({}, obj, unchanged);
        //When done, output new lyrics onto screen
        if (Object.keys(synonyms).length === wordCount) {
          outputText(synonyms);
        }
      }); //end $xhr.fail
} //end callAPI
});
