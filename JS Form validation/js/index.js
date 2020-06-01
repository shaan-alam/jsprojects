"use strict";

class Form {
  constructor() {
    this.state = { score: 0, full_name: '', email: '', password: '', birth_date: '' };
  }

  validateName() {
    const error = document.querySelector('#error-fullname');

    // Validating the full name
    if(full_name.value === '') {
      full_name.classList.add('red-border');
      error.classList.add('active');
    } else {
      full_name.classList.add('success');
      full_name.classList.remove('red-border');
      error.classList.remove('active');

      // Store the values
      this.state.full_name = full_name.value;
      this.state.score = this.state.score + 1;
    }

  }

  validateEmail() {
    const error = document.querySelector('#error-email');
    const email_add = email.value;
    
    // Validating the email
    if(email_add === '' || email_add.indexOf('@') < 0 || email_add.indexOf(' ') > 0 || email_add[email_add.length - 1] === '@') {
      email.classList.add('red-border');
      error.innerHTML = 'Please enter a valid Email';
      error.classList.add('active');
    } else {
      email.classList.add('success');
      email.classList.remove('red-border');
      error.classList.remove('active');  
      
      this.state.email = email_add.trim();
      this.state.score = this.state.score + 1;    
    }
  }

  validatePassword() {
    const error = document.querySelector('#error-password');

    if(password.value !== confirm_password.value || password.value.length < 8) {
      error.innerHTML = password.value.length > 8 ? "The two passwords do not match!" : "The lenght of passwords should be more than 8 chars!";
      error.classList.add('active');
      password.classList.add('red-border');
      confirm_password.classList.add('red-border');
    } else {
      error.innerHTML = '';
      error.classList.remove('active');
      password.classList.remove('red-border');
      confirm_password.classList.remove('red-border');
      password.classList.add('success');
      confirm_password.classList.add('success');

      this.state.score = this.state.score + 1;
      this.state.password = password.value;
    }
  }

  validateAge() {
    const error = document.querySelector('#error-birth-date');

    if(!birth_date.value) {
      error.innerHTML = "Please fill your birth date",
      error.classList.add('active');
      birth_date.classList.add('red-border');
    } else {
      const year = Number(birth_date.value.split('-')[0]);  
      const currentYear = new Date().getFullYear();

      if(Number(currentYear - year) < 18) {
        error.innerHTML = 'Sorry! Your are not 18+';
        error.classList.add('active');
        birth_date.classList.add('red-border');
      } else {
        this.state.score = this.state.score + 1;
        this.state.birth_date = birth_date.value;
  
        error.classList.remove('active');
        birth_date.classList.remove('red-border');
        birth_date.classList.add('success');
      }
    }



    
  }

  startValidation() {

    // To validate the first name & last name
    if(!this.state.full_name) this.validateName();

    // To validate the email entered 
    if(!this.state.email) this.validateEmail();

    // To validate the password
    if(!this.state.password) this.validatePassword();

    // Validate age
    if(!this.state.birth_date) this.validateAge();

    if(this.state.score === 4) {
      
      // Fire off a modal
      swal({
        title: "Confirmation",
        text: `Please check if the information below is correct......
          Full Name : ${this.state.full_name},
          Email : ${this.state.email}, 
          Birth Date : ${this.state.birth_date} (YYYY-MM-DD)
        `,
        buttons: ['Go back & Edit', 'Continue'],
        icon: 'info'
      })
      .then(value => {
        if(value) {

          swal({
            title: 'Success',
            icon: 'success',
            text: "You have been succesfully registered to the site!"
          })

        }
      })

    } else {
      swal({
        title: "Error",
        text: "Please fill in all the information!!",
        icon: "error"
      })
    }

  }

}

// DOM Elements

const full_name = document.querySelector('#fullname');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirm_password = document.querySelector('#confirm-password');
const birth_date = document.querySelector('#birth-date');
const submit = document.querySelector('#submit');

const form = new Form();

submit.addEventListener('click', e => {
  e.preventDefault();

  form.startValidation();
});
