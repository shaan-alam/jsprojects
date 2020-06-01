// // // // // match characters that occur one or more time

// // // // // to match character more than one time we use + operator
// // // // // for example

// // // // const spelling = 'mississippi';
// // // // // const regex = /ssi+/g;


// // // // // match characters that occur 0 or more times
// // // // // using a * keyword


// // // // // find characters with lazy matching
// // // // //  greedy match - would return the string with the longest length

// // // // // lazy match - would return the string with the smallest length

// // // // // for ex
// // // // let string = 'tatanic';
// // // // let regex = /t[a-z]*i/;
// // // // console.log(string.match(regex));

// // // // // lazy match example
// // // // // as soon as I get the first match of the letter after ? (in this case i), stop matching and return the string

// // // // regex = /t[a-z]*?i/;
// // // // console.log(string.match(regex));


// // // // const text = "<h1> I love programming </h1>";

// // // // const a = /<.*?>/;
// // // // console.log(text.match(a));


// // // // // regex challenge

// // // // let crowd = 'P1P2P3P4P5P6CCCP7P8P9';
// // // // let regex = /C+/g;

// // // // console.log(crowd.match(regex));


// // // // match beginning string patterns


// // // let string = "Cal and ricky both like racing";
// // // // to match the pattern from the beginning of the string
// // // // let cal = /^Cal/;
// // // // console.log(cal.test(string));

// // // // console.log(/^Cal/.test(string));

// // // let racing = /racing$/; // helps to test for a pattern at the end of the string

// // // // console.log(racing.test(string));


// // // // match all letters and numbers

// // // string = 'I love coding 123..';
// // // let regex = /\w/g;
// // // // console.log(string.match(regex));
// // // //  \w - A-Z, a-z, 0-9 and an underscore (_)

// // // // match everything but not a letter or number
// // // // \W - match everything but a letter or a number
// // // regex = /\W/g;

// // // // console.log(string.match(regex));


// // // // match all numbers
// // // // \d - will match all the numbers

// // // regex = /\d/g;
// // // // console.log(string.match(regex));

// // // // match all non-numbers
// // // // \D - match all non-numbers

// // // regex = /\D/g;
// // // // console.log(string.match(regex));

// // // // possible username

// // // const string = 'I love coding_.....12';
// // // const regex = /\W/g;
// // // console.log(string.match(regex));


// // // const string = 'I love coding 123';
// // // const regex = /\D/g;
// // // console.log(string.match(regex));


// // // ^string = used to search for string at the beginning without using ths [];
// // // string$ = used to search for the string at the end of the string
// // // \w - match all letters and numbers (alphanumeric) + _ ;
// // // \W - match all the non alpha numeric letters
// // // \d - match all the numbers
// // // \D - match all the non numbers
// // // \s - match all whitespace characters
// // // \S - match all non whitespaces chacracters


// // // possible restrict usernames

// // // Specify upper and lower number of matches

// // // {} are used to spedicfy the length of a particular character literal
// // // {} length is inclusive of the numbers
// // // {1,} - 1 to infinity

// // let string = 'Ohhhhhh no';
// // let regex = /Oh{3,6} no/gi;


// // // console.log(string.match(regex));

// // // specify only lower numbers 

// // // console.log(string.match(regex));

// // // specify the exact number of matches => {4} = quantifiers



// // check for all or none 

// // '?' checks for an optional character
// // u? => may or may not contain a 'u';


// let string = 'favorite';
// let regex = /favou?rite/g;

// // console.log(string.match(regex));

// // positive and negative look ahead
// // (?=) = positive lookahead
// // (?!) = positive lookahead


// let quit = 'qu';
// let noquit = 'qt';

// regex = /q(?=u)/; // if there is a "u" present beside the "q" then return "q" or else return null
// regex = /q(?!u)/g; // if there is no "u" present beside the "q" then return "q" or else return null


// console.log(noquit.match(regex)); //null


// const string = 'astrohfjdhdjfh21';
// const regex = /(?=\w{5})(?=\D*\d{2})/;

// console.log(string.match(regex));


// reuse pattern capture group

// we can resue the pattern group by using \1, \2, \3 etc
// the first match returned will be the regex match & second wil be the capture group match


// const name = "Shaan Alam 12334";

// const regex = /([A-Z]w+)\s([A-Z]\w+)\s\d+/;


// console.log(name.match(regex));
// console.log(regex.test(name));

console.log(future());
function future() {
  return `You will never have flying cars`
}