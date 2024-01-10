const addForm = document.querySelector(".todo .add");

addForm.addEventListener('submit', (event) => {
    event.preventDefault();

    console.log(event);
})