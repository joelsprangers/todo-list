

let userInput = document.querySelector('input[name="new-task"]');
let addInput = document.querySelector(".task-button");
let finishTask = document.querySelector('input[name="checked"]');
let taskList = document.querySelector(".task-list");
let deleteBin = document.querySelectorAll(".task-delete")

//probleem: zorgen dat de browser op tijd ververst.

const removeAllTasksFromDom = () => {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.lastChild);
    }
}

const refresh = () => {
    removeAllTasksFromDom();
    createItemList();
}

//pakt de input, resets het veld en zet het laatste json object in de dom
addInput.addEventListener("click", async () => {
    if (userInput.value != "") {
        await postItem(userInput.value);
        userInput.value = '';
        getLastItem();
    }
})

let taskToDom = (description, id, state) => {
    const listItem = document.createElement("li");
    const checkBox = document.createElement("input");
    const text = document.createElement("p");
    const bin = document.createElement("input");

    //class tags
    listItem.classList.add("task", "task__display");
    bin.classList.add("task-delete", "task-button");
    text.classList.add("text");

    if (state==="true") {
        text.classList.add("checked-task");
        checkBox.classList.add("checked-box");
    }

    //tags
    listItem.id = id;
    checkBox.type = "checkbox";
    checkBox.name = description;
    checkBox.id = id;

    text.name = "text";
    text.innerHTML = description;
    bin.type = "image";
    bin.src = "prullenbakje.png";
    bin.alt = "task-delete";
    bin.id = id;

    bin.addEventListener("click", async () => {
        await deleteItem(bin.id);
        refresh();
        //hier moet misschien alleen de li verversen, zodat de Dom opnieuw laadt via de json
    })

    checkBox.addEventListener("click", async () => {
        await updateItem(description, id);
        refresh();
    })

    text.addEventListener("click", async () => {
        // hiervoor moet ik van het textveld een inputveld maken geloof ik, maar dat laat ik voor nu even...
    })

    listItem.appendChild(checkBox);
    listItem.appendChild(text);
    listItem.appendChild(bin);
    taskList.appendChild(listItem);
}

refresh();

