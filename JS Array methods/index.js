const comments = [
  { text: 'Love this!', id: 21234234 },
  { text: 'Super good', id: 242342143 },
  { text: 'You are my best', id: 2354234 },
  { text: 'Ramen is my fav food ever', id: 97883787 },
  { text: 'Nice Nice Nice!', id: 978834587 }
];

// Some and Every checks
// Array.prototype.some() // is atlease one person above 19
 
const public = [
  { name: 'Shaan Alam', year: 2002 },
  { name: 'Lavi', year: 2002 },
  { name: 'Aishwarya', year: 1870 },
  { name: 'Scarlet Johanson', year: 1976 },
  { name: 'Robert Downey jr', year: 1989 },
  { name: 'Chris Hemsworth', year: 2020 }
];

// const isAdult = public.some(function(person) {
//   const currentYear = new Date().getFullYear();
//   if(currentYear - person.year >= 19) {
//     return true;
//   }
// });

// The ES6 way
const isAdult = public.some(person => 2020 - person.year >= 19);
// console.log(isAdult);


// Array.prototype.find() = similar to filter() method but instead of returning a subset of the original array it will return the first element it finds


// it will find the first person with the year 2002
const found = public.find(person => person.year === 2002);


// findIndex() - finds the index of an element in the array
const index = comments.findIndex(comment => comment.id === 242342143);

// comments.splice(index, 1);
// will delete the element at the index 'index' and will delete the number of elements in the second parameter


const newComments = [
  ...comments.slice(0, index),
  ...comments.slice(index + 1)
];

console.table(newComments);
