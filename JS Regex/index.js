// // // // // // // Using the test method - Will test for the presence of the regex in the string

// // // // // // // Will work for spaces too

// // // // // // // let sentence = 'I love coding';

// // // // // // // let regex = /coding/;
// // // // // // // console.log(regex.test(sentence));  => true

// // // // // // // let sentence = 'I love coding';
// // // // // // // let regex = /ing/;

// // // // // // // console.log(regex.test(sentence));

// // // // // // // Matching literal string

// // // // // // // test() method is case sensitive
// // // // // // // const str = 'Somewhere Waldo is hiding in the text';
// // // // // // // const regex = /Waldo/;

// // // // // // // can test for multiple literals using the pipe keyword

// // // // // // // let string = 'James has a pet cat';
// // // // // // // let regex = /Cat | cat | pet | Pet | bird/;

// // // // // // // console.log(regex.test(string));

// // // // // // // ignoring case using test() method using flag i
// // // // // // // let string = 'freeCodeCamp';
// // // // // // // let regex = /FREECODECAMP/i;

// // // // // // // console.log(regex.test(string));

// // // // // // // Extracting strings from the original string
// // // // // // let string = `Please extract 'coding' from this sentence`;
// // // // // // let word = /Coding/i;

// // // // // // let result = string.match(word);

// // // // // // console.log(result);


// // // // // let string = 'cabABbBc';
// // // // // let regex = /ab*c/i;

// // // // // console.log(regex.test(string));

// // // // // console.log(string.match(regex));

// // // // // let waldoIsHiding = 'Somewhere waldo is hiding in this text';
// // // // // let regex = /waldo/i;

// // // // // console.log(waldoIsHiding.match(regex));

// // // // // extract matches

// // // // let string = 'I love coding';
// // // // let regex = /coding/i;

// // // // // console.log(string.match(regex));

// // // // // finding more than one match

// // // // let test = 'Repeat Repeat repeat';
// // // // regex = /Repeat/ig;

// // // // // console.log(test.match(regex));

// // // // // Matching anything with wildcard period -> . => period operator only extracts one extra character from the string


// // // // let humStr = "I'll hum a song Hurry";
// // // // let hugeStr = "Bear hug";

// // // // regex = /hu./ig;

// // // // // console.log(humStr.match(regex));
// // // // // console.log(hugeStr.match(regex));


// // // // // finding more than single character with multiple possibilities

// // // // regex = /b[aiu]g/;  // will search for big, bag, bug, one of [aiu];



// // // // string = "Beware of bugs in the above code; I have proved it correct";

// // // // regex = /[aeiou]/gi;

// // // // console.log(string.match(regex));



// // // let string = 'I love coding & Love readin too';
// // // let regex = /love/;
// // // let regex1 = /love/ig;


// // // console.log(typeof string.match(regex)); // return an object
// // // console.log(typeof string.match(regex1)); // return an array


// // // const str = 'hug hurry';

// // // const regex = /...../;

// // // console.log(str.match(regex));


// // // finding more than single characters with multiple possibilities


// // // // Match range of letters of the alphabet
// // // let string = 'the 0123456789quick brown fox jumps over the lazy dog';
// // // let regex = /[0-9a-z]/ig;  //matching with more than one ranges

// // // let result = string.match(regex).sort();

// // // console.log(result);


// // // Matching more than one charaacyter [not specified];
// // // let string = '3 blind mice.';
// // // let regex = /[^0-9aeiou .]/ig;

// // // console.log(string.match(regex));


// // const string = 'abracadabrabc';
// // const regex = /[^abc]/g; // search only for 'a','b', 'c'  in the string

// // console.log(string.match(regex));


// // using capture groups to search and replace

// let string = 'The sky is silver';
// let regex = /silver/;

// string = string.replace(regex, 'Blue');
// console.log(string);
 
// let string = 'This sandwich is good';
// let regex = /good/;

// string = string.replace(regex, 'Okey-dokey');
// console.log(string);

// remove white space from start and end
// let hello = '       hello, world !        ';
// let regex = /^\s+|\s+$/g;

// hello = hello.replace(regex, '');
// console.log(hello);

