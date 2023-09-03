const addButton = document.querySelector('#add');
const inputVal = document.querySelector("input");
let newTask = document.querySelector("#newTask");
if (localStorage.length) {
    for (let id of Object.keys(localStorage)) {
        let div = document.createElement('div');
        let del = document.createElement('button');
        div.className = 'task'
        del.innerText = 'Delete';
        del.className = 'del';
        let [date, value] = localStorage.getItem(id).split(',');
        div.innerHTML = `<div class="inner"><span>Created on:${date}</span>
        <hr> <li>${value}</li></div>`
        div.id = id;
        div.appendChild(del);
        newTask.appendChild(div)
        del.addEventListener('click', () => {
            div.remove();
            localStorage.removeItem(id);
        })
    }
}
addButton.addEventListener('click', () => {
    if (!inputVal.value.trim().length)
        alert("Hey! Please enter the task!!!");
    else {
        let id = self.crypto.randomUUID()
        let div = document.createElement('div');
        div.className = 'task'
        let del = document.createElement('button');
        del.innerText = 'Delete';
        del.className = 'del';
        let date = new Date().toLocaleDateString();
        div.innerHTML = `<div class="inner"><span>Created on:${date}</span>
   <hr> <li>${inputVal.value}</li></div>`
        localStorage.setItem(id, [date, inputVal.value]);
        div.id = id;
        div.appendChild(del);
        newTask.appendChild(div)
        del.addEventListener('click', () => {
            div.remove();
            localStorage.removeItem(div.id);
        })
    }
})