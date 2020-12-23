
const baseUrl = "https://jsonbox.io/box_c093a2a33b0bd73bf2dc/";

const postItem = async (item) => {
    await fetch(baseUrl, {
        method: "POST",
        body: JSON.stringify({ description: item, done: "false" }),
        headers: {
            "Content-type": "application/json",
        },
    })
}

const updateItem = async (item, id) => {
    await fetch(`${baseUrl}${id}`, {
        method: "PUT",
        body: JSON.stringify({ description: item, done: "true" }),
        headers: {
            "Content-type": "application/json",
        },
    })
}

const createItemList = async () => {
    const result = await fetch(baseUrl);
    const json = await result.json();
    json.forEach(item => {
        taskToDom(item.description, item._id, item.done);
    });
}

const deleteItem = async (id) => {
    await fetch(`${baseUrl}${id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
        },
    })
}

const getLastItem = async () => {
    const result = await fetch(baseUrl);
    const json = await result.json();
    let lastItem = json[0];
    taskToDom(lastItem.description, lastItem._id);
}
