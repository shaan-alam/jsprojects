const launch = document.querySelector("#alert-launch");
const bg_overlay = document.querySelector('.alert-bg');
const body = document.querySelector('.alert-body');
const close = document.querySelector('.alert-header .alert-close');

const hideAlert = () => {
    bg_overlay.style.display = 'none';
    body.style.transform = 'scale(0)';
}

const showAlert = () => {
    bg_overlay.style.display = 'flex';
    body.style.transform = 'scale(1)';
}   


launch.addEventListener('click', e => {
    e.preventDefault(); 

    showAlert();
});


close.addEventListener('click', () => {
    hideAlert();
});
