"use strict";

// DOM ELEMENTS
let addToCartButton = document.querySelectorAll("#addtocart");
let stockGrid = document.querySelector(".row");
let cart_size = document.querySelector(".cart-size");
let cart_window = document.querySelector(".modal-content .container .row");
let remove_from_cart = document.querySelectorAll("#removefromcart");
let cart_footer = document.querySelector(".footer");
let total_price = document.querySelector("#price-placeholder");

console.log(Math.random().toString(36).substring(2));

function loadData() {
  let data = [];

  const xhr = new XMLHttpRequest();
  xhr.open("GET", "../data/stock.json", true);

  xhr.onload = function() {
    if (this.status == 200) {
      let output = JSON.parse(this.responseText);
      for (let i = 0; i < output.length; i++) {
        data[i] = output[i];
      }
    }
  };

  xhr.send();
  return data;
}

function updateStockUI() {
  // Update UI

  stock.forEach(elem => {
    let output = `
    <div class="col-3" data-id=${elem.id}>
      <div class="card m-2" style="width: 18rem;">
          <img class="card-img-top p-4" src="${elem.avatar}" alt="Card image cap">
          <div class="card-body">
              <h4 class="card-title">${elem.name}</h4>
              <p class="card-text">${elem.description}</p>
              <div class="actions">
                  <button class="btn btn-sm btn-primary" id="addtocart">Add to cart</button>
              </div>
          </div>
      </div>                
  </div>
    `;

    stockGrid.innerHTML += output;
  });
}

function updateCartUI() {
  // Updating the cart
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart_size.innerHTML = !cart ? 0 : cart.length;
  let output = "";

  if (cart.length > 0) {
    cart.forEach(item => {
      output += `
      <div class="col-3" data-id="${item.id}">
        <div class="card m-2" style="width: 18rem;">
            <img class="card-img-top p-4" src="${item.avatar}" alt="Card image cap">
            <div class="card-body">
                <h4 class="card-title">Keyboard</h4>
                <p class="card-text">${item.description}</p>
                <div class="actions d-flex">
                    <button class="btn btn-sm btn-danger" id="removefromcart">&times; Remove</button>
                    <input type="number" id="item-quantity" data-id="${item.id}" class="form-control w-25 ml-auto" value="${item.Quantity}" title="Quantity">
                </div>
            </div>
        </div>                
    </div>
      `;
    });

    cart_window.innerHTML = output;
    cart_footer.style.display = "block";

    const total = getTotalPrice();
    total_price.innerHTML = total;
  } else {
    cart_window.innerHTML = `<div class="alert alert-danger container text-center">Your cart is empty</div>`;
    cart_footer.style.display = "none";
  }
}

function getTotalPrice() {
  let total = 0;
  cart.forEach(item => {
    total += item.Quantity * item.price;
  });

  return total;
}

function removeFromCart(id) {
  const new_cart = cart.filter(item => item.id != id);

  localStorage.setItem("cart", JSON.stringify(new_cart));
  localStorage.setItem("cart-size", new_cart.length);

  // updating the cart UI
  updateCartUI();

  // show the alert
  swal({
    title: "Sucess!",
    text: "The item has been successfully removed from your cart!",
    icon: "success"
  });
}

// add to cart button funcionality
function addToCart(identity) {
  const item = stock.filter(Item => Item.id === identity);

  // check if the item is already present
  if (cart.filter(item => item.id === identity).length > 0) {
    // if the item is already present then increment its quantity property by 1
    cart.forEach(item => {
      if (item.id === identity) {
        item.Quantity = item.Quantity + 1;
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
  } else {
    cart.push(item[0]);
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("cart-size", cart.length);

    // update the cart UI and the cart length
    updateCartUI();
    cart_size.innerHTML = cart.length;
  }

  swal({
    title: "Success!",
    text: "Your item has been successfully added to your cart!",
    icon: "success"
  });
}

function changeItemQuantity(item_id, quantity) {

  cart.forEach(item => {
    if(item.id === item_id) {
      item.Quantity = Number(quantity);
    }
  });

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();

}

// STOCK AND CART HERE VARIABLES HERE
let stock = loadData();
let cart = [];

window.addEventListener("load", () => {
  updateStockUI();
  updateCartUI();
});

document.addEventListener("click", e => {
  if (e.target.id === "addtocart") {
    addToCart(
      e.target.parentElement.parentElement.parentElement.parentElement.getAttribute(
        "data-id"
      )
    );
  }
});

document.addEventListener("click", e => {
  if (e.target.id === "removefromcart") {
    removeFromCart(
      e.target.parentElement.parentElement.parentElement.parentElement.getAttribute(
        "data-id"
      )
    );
  }
});

document.addEventListener('change', e => {
  if(e.target.id === 'item-quantity') {
    changeItemQuantity(e.target.getAttribute('data-id'), e.target.value);
  }
})


fetch('https://www.potterapi.com/v1/sortingHat')
.then(res => res.json())
.then(res => console.log(res));