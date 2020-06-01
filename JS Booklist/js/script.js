const bookNameInput = document.getElementById('book-name');
const bookPriceInput = document.getElementById('book-price');
const submitBtn = document.getElementById('submit-btn');
const table = document.querySelector('table');
const container = document.querySelector('.container');
const alertBox = document.querySelector('.alert-danger');

var books = [];
var storageBooks = JSON.parse(localStorage.getItem('books')) || [];

function generateID () {
  function uuidv4 () {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }

  return uuidv4();
}

function showTable () {
  table.style.display = 'table';
  alertBox.style.display = 'none';
}

function hideTable () {
  table.style.display = 'none';
  alertBox.style.display = 'block';
}

function init () {
  
  if (books.length !== 0 && storageBooks.length !== 0) {
    showTable();
    updateUI();
  } else {
    hideTable();
  }
}


function updateUI () {
  let output = '', sno = 1;

  // remove the current HTML from the table and add a new one
  table.innerHTML = `<table><tr><th>Sno</th><th>Book name</th><th>Book price</th><th>Actions</th></tr></table>`;

  books.forEach(book => {
    output = `<tr data-id="${book.id}"><td>${sno}</td><td>${book.name}</td><td>${book.price}</td><td><button class="delete-btn">&times;</button></td></tr>`;
    sno += 1;
    table.innerHTML += output;
  });
}

function addBook (e) {

 

  e.preventDefault();
  const book = {};

  if (bookNameInput.value !== '' && bookPriceInput.value !== '') {
    book.id = generateID();
    book.name = bookNameInput.value;
    book.price = bookPriceInput.value;

    if (table.style.display === 'none' && alertBox.style.display === 'block') {
      showTable();
    }

  } else {
    alert("Please enter the details of the book");
    return;
  }

  bookNameInput.value = bookPriceInput.value = '';
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
  updateUI();
}

function deleteBook (target) {
  target.parentElement.parentElement.remove();

  books = books.filter(book => book.id != target.parentElement.parentElement.getAttribute('data-id'));

  if (books.length === 0) {
    hideTable();
  }

  localStorage.setItem('books', JSON.stringify(books));
  updateUI();
}

submitBtn.addEventListener('click', addBook);
window.addEventListener('load', init);
table.addEventListener('click', e => {
  if (e.target.classList.contains('delete-btn')) {
    deleteBook(e.target);
  }
});