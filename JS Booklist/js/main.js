class UI {
  constructor() {
    this.state = [];
    this.book_count = 0;
  }

  generateBookId() {
    function uuidv4() {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      );
    }

    return uuidv4();
  }

  addBookToState(book) {
    this.state.push(book);
    this.addBookToUI(book);
  }

  addBookToUI(book) {
    let output = `<tr><td>${++this.book_count}</td><td>${book.name}</td><td>${book.price}</td><td><button data-book="${book.id}" class="btn btn-danger delete">X</button></td></tr>`;

    table.innerHTML += output;
  }

  removeBookFromState(id) {

    this.book_count--;
    this.state = this.state.filter(elem => elem.id != id);
  }

  removeBookFromUI(event) {
    if (event.target.classList.contains("delete")) {
      event.target.parentElement.parentElement.remove();
      this.removeBookFromState(event.target.dataset.book);
    }
  }
}

const ui = new UI();

const book_name_input = document.querySelector("#book_name");
const book_price_input = document.querySelector("#book_price");
const submit_btn = document.querySelector("#submit_btn");
const table = document.querySelector("table");

submit_btn.addEventListener("click", () => {
  let book = {};

  if (book_name_input.value == "" || book_price_input.value == "") {
    alert("Please enter the complete details of the book");
  } else {
    book = {
      id: ui.generateBookId(),
      name: book_name_input.value,
      price: book_price_input.value
    };

    ui.addBookToState(book);
  }
});

window.addEventListener("click", event => ui.removeBookFromUI(event));
