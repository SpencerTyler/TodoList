const addForm = document.querySelector(".todo form.add");
const itemsContainer = document.querySelector(".todo .items")

const savedListData = window.localStorage.getItem('todo-list');
const todoItems = savedListData ? JSON.parse(savedListData) : [];

for (const item of todoItems) {
    insertItemComponent(item);
}

function saveList() {
    const listData = JSON.stringify(todoItems);
    window.localStorage.setItem('todo-list', listData);
}

function getKey() {
    const date = new Date();
    return date.getTime().toString();
};

function insertItemComponent(item) {
    const itemElement = document.createElement('div');
    itemElement.className='item';
    itemElement.setAttribute('data-key', item.key)
    itemElement.innerHTML = `
        <input type="checkbox"/>
        <span class="title"></span>
        <button class="delete">Delete</button>
    `;

    const titleElement = itemElement.querySelector('.title');
    titleElement.textContent = item.title;

    if (item.done) {
        titleElement.classList.add('done');
    } else {
        titleElement.setAttribute('contenteditable', 'plaintext-only');
    }

    itemsContainer.append(itemElement);
}

function addItem(title) {
    const key = getKey();

    const newItem = {
        title,
        key,
        done: false,
    };

    todoItems.push(newItem);
    insertItemComponent(newItem);

    saveList();
};

function deleteItem(key) {
    const index = todoItems.findIndex((item) => item.key === key);
    todoItems.splice(index, 1);

    const itemElement = itemsContainer.querySelector(`.item[data-key="${key}"]`);
    itemElement.remove();

    saveList();
}

function checkItem(key) {
    const itemElement = itemsContainer.querySelector(`.item[data-key="${key}"]`);
    const isChecked = itemElement.querySelector('input[type="checkbox"]').checked;
    
    const item = todoItems.find((item) => item.key === key);
    item.done = isChecked;

    const titleElement = itemElement.querySelector('.title');
    if (isChecked) {
        titleElement.classList.add('done');
        titleElement.removeAttribute('contenteditable');
    } else {
        titleElement.classList.remove('done');
        titleElement.setAttribute('contenteditable', 'plaintext-only');
    };

    saveList();
}

function updateItem(key) {
    const itemElement = itemsContainer.querySelector(`.item[data-key="${key}"]`);
    const titleElement = itemElement.querySelector('.title');
    const itemText = titleElement.textContent;

    const item = todoItems.find((item) => item.key === key);
    item.title = itemText;

    saveList();
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

itemsContainer.addEventListener('keydown', (event) => {
    if (event.target.matches('.title')) {
        if (event.key === 'Enter') {
            event.preventDefault();
            event.target.blur();
        }
    }
});

itemsContainer.addEventListener('focusout', (event) => {
    if(event.target.matches('.title')) {
        const itemKey = event.target.closest('.item').getAttribute('data-key');
        updateItem(itemKey);
    }
});