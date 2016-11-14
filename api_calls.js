function getSyn(word, callback) {
  $.getJSON('http://words.bighugelabs.com/api/2/a88271c6246b036bed146df0b7463eac/' + word + '/json', function (data) {
    var items = [];
    $.each( data, function( key, val ) {
      for (var i = 0; i < val.syn.length; i++) {
        items.push(val.syn[i])
      }
      let newWord = items[Math.floor(Math.random() * items.length)];
      synonyms.push(newWord);
    callback(newWord);
  }); //end getJSON
} //end getSyn()

var synArray = [];
function callback(nw) {
  synArray.push(nw);
}

$.getJSON('http://words.bighugelabs.com/api/2/a88271c6246b036bed146df0b7463eac/' + word + '/json', function(data) {
    var items = [];
  // console.log(data);
   $.each( data, function( key, val ) {
    //  console.log("key, val", key, val); //output : adjective Object { syn: Array[3], ant: Array[1], rel: Array[9], sim: Array[11] }
    //  console.log("synonyms", val.syn);
     for (var i = 0; i < val.syn.length; i++) {
       items.push(val.syn[i])
     }
    //items contains an array of synonyms
  //  console.log("items", items);
    //pick one randomly and save it somewhere
    let newWord = items[Math.floor(Math.random() * items.length)];
    //console.log("converted", word, "to", newWord);
    synonyms.push(newWord);       //can't access outside of call - need to do the callback function thingy
   });
}); //end getJSON

//add a while loop to keep track of things??? and make sure things don't go twice
$.each( data, function( key, val ) {
  console.log(word, key, val);
  let gotWord = false;
  while (gotWord === false) {
  if (val.syn.length > 0) {
  //  console.log("syn not empty", val.syn[i]);
    for (var i = 0; i < val.syn.length; i++) {
      items.push(val.syn[i]);
      console.log("syn", val.syn[i], i);
    }
    gotWord = true;
  } else if (val.sim.length > 0) {
//    console.log("sim not empty");
    for (var i = 0; i < val.sim.length; i++) {
      items.push(val.sim[i]);
      console.log("sim", val.sim[i], i);
    }
    gotWord = true;
    // let newWord = items[Math.floor(Math.random() * items.length)];
    // console.log(word, newWord);
    // callback(newWord);
  } else if (val.rel.length > 0) {   //if it has sim & rel it does both...
//    console.log("rel not empty");
    for (var i = 0; i < val.rel.length; i++) {
      items.push(val.rel[i]);
      console.log("rel", val.rel[i], i);
    }
    gotWord = true;
    // let newWord = items[Math.floor(Math.random() * items.length)];
    // console.log(word, newWord);
    // callback(newWord);
  } else {
    //word needs to be saved in unchanged...hmm, how to do that from here?
    // console.log(word, newWord);
    // callback(word);
    items.push(word);
    gotWord = true;
  }
} //end while
  let newWord = items[Math.floor(Math.random() * items.length)];
//  console.log(word, newWord);
  callback(newWord);
