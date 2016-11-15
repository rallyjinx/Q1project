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

//from callback()
//loop?
//wordCount is the number of total words
//  console.log(wordCount);
// for (var i = 0; i < wordCount; i++) {
//   if (i === ind && ind!== synArray.length-1) {
//     synArray.splice(ind, 0, nws);
//   }
  // } else if (unchanged.indexOf(i) !== -1){
  //   synArray.splice(i, 0, unchanged[i]);
  // } else {
//   console.log(ind, synArray.length-1);
// }
//  }
//  console.log(unchanged);
//  console.log(synArray);

// from getSyn()
//arr.splice(index, 0, item); -> use this to insert new words into the new array
// callback(glad, 0);
// callback(gloomy, 1);
// callback(run, 2);
// callback(frog, 3);
//    console.log("after callback", obj);

//synArray[i] = obj[i] or unchanged[i]

// for (var j = 0; j < wordCount; j++) {
//   //for key === 0, add value to array at that index
//   //if the index exists in the object, add it to array
//   // ... how to check if it is already in the array at the correct location...
//   // without ruling out duplicate words, because songs
//   console.log(wordCount, j);
//   if (obj[j]) { //&& synArray[j] is empty is any of this even possible
//     console.log(obj[j] === true, "obj", obj[j], j);
//                 // false ...how to see if it exists
//   //  synArray.push(obj[j]); //stupid stupid stupid, you are not inserting things at any specific point...
//     synArray.splice(j, 0, obj[j]);
//     console.log(synArray);
//   } else if (unchanged[j]) {
//     console.log(unchanged[j] === true, "unchanged", unchanged[j], j);
//   //  synArray.push(unchanged[i]);
//     synArray.splice(j, 0, unchanged[i]);
//   }
//
// } //end for loop

// console.log("the end", synObj, unchanged);

// for (var key in obj) {
//   console.log(obj[key]);
//   if (synArray[key] !== obj[key]) {
//     synArray.splice(key, 0, obj[key]); //unless it already exists there, then replace???
//   }
// }
// for (var key in unchanged) {
//   console.log(unchanged[key]);
//   if (synArray[key] !== unchanged[key]) {
//     synArray.splice(key, 0, unchanged[key]);
//   }
// }

//  console.log("synonym array", synArray); //happens too many times...

//     console.log(items);
//     let newWord = items[Math.floor(Math.random() * items.length)];
//     console.log(newWord);
//     synonyms.push(newWord);
//     console.log(synonyms);
// //    console.log("new word", newWord);
//   callback(synonyms);
