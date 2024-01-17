const addForm = document.querySelector(".todo form.add");
const itemsContainer = document.querySelector(".todo .items")

const todoItems = [];

function getKey() {
    const date = new Date();
    return date.getTime().toString();
};

function addItem(title) {
    const key = getKey();

    todoItems.push({
        title,
        key,
        done: false,
    });

    const itemElement = document.createElement('div');
    itemElement.className='item';
    itemElement.setAttribute('data-key', key)
    itemElement.innerHTML = `
        <input type="checkbox"/>
        <span class="title"></span>
        <button class="delete">Delete</button>
    `;

    itemElement.querySelector('.title').textContent = title;

    itemsContainer.append(itemElement);
};

function deleteItem(key) {
    const index = todoItems.findIndex((item) => item.key === key);
    todoItems.splice(index, 1);

    const itemElement = itemsContainer.querySelector(`.item[data-key="${key}"]`);
    itemElement.remove();
}

function checkItem(key) {
    const itemElement = itemsContainer.querySelector(`.item[data-key="${key}"]`);
    const isChecked = itemElement.querySelector('input[type="checkbox"]').checked;
    
    const item = todoItems.find((item) => item.key === key);
    item.done = isChecked;

    const titleElement = itemElement.querySelector('.title');
    if (isChecked) {
        titleElement.classList.add('done');
    } else {
        titleElement.classList.remove('done');
    };
}

addForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const todoInput = event.target.elements['todoItem'];
    const value = todoInput.value;

    if (!value) {
        return;
    }

    todoInput.value = '';
    addItem(value);
});

itemsContainer.addEventListener('click', (event) => {
    if (event.target.matches('button.delete')) {
        const itemKey = event.target.closest('.item').getAttribute('data-key');
        deleteItem(itemKey);
        return true;
    }
});

itemsContainer.addEventListener('input', (event) => {
    if (event.target.matches('input[type="checkbox"]')) {
        const itemKey = event.target.closest('.item').getAttribute('data-key');
        checkItem(itemKey);
    }
})