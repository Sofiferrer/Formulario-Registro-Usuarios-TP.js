const url = new URL(window.location)
const id = url.searchParams.get('name');

const inputName = document.getElementById('name');
const inputEmail = document.getElementById('email');
const inputAddress = document.getElementById('address');
const inputPhone = document.getElementById('phone');

const addUser = (event) => {
    event.preventDefault();

    const user = {
        name: inputName.value,
        email: inputEmail.value,
        address: inputAddress.value,
        phone: inputPhone.value,
    }

    fetch(`${base}users.json`, {
        method: "POST",
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(user),
    }).then((response) => {
        return response.json()
    }).then((data) => {
        console.log(data)
    })
}

const editUser = (event) => {
    event.preventDefault();

    const user = {
        name: inputName.value,
        email: inputEmail.value,
        address: inputAddress.value,
        phone: inputPhone.value,
    }

    fetch(`${base}users/${id}.json`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(user),
    }).then((response) => {
        return response.json()
    }).then((data) => {
        console.log(data)
    })
}

const formFill = (id) => {
    fetch(`${base}users/${id}.json`)
        .then((response) => {
            return response.json()
        }).then((data) => {
            console.log(data);
            inputName.value = data.name
            inputEmail.value = data.email
            inputClave.value = data.password
        })
}

const addButton = document.getElementById('addButton');

if (id) {
    addButton.innerHTML = "Actualizar";
    cargarForm(id);
    addButton.addEventListener('click', editUser);
} else {
    addButton.addEventListener('click', addUser);
}