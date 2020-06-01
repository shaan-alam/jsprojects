const input = document.querySelector('#input');

input.addEventListener('keyup', e => {
    const name = e.target.value.toUpperCase();

    const items = document.querySelectorAll('ul li.list-group-item');

    items.forEach(item => {
        if(item.innerHTML.toUpperCase().indexOf(name) >= 0) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    })

})  