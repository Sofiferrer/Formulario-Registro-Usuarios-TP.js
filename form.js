const url = new URL(window.location)
const id = url.searchParams.get('name');

const inputName = document.getElementById('name');
const inputEmail = document.getElementById('email');
const inputAddress = document.getElementById('address');
const inputPhone = document.getElementById('phone');

const validar = () => {
    const nombre = document.getElementById('name').value;
    const direccion = document.getElementById('address').value;
    const telefono = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const expEmail = /\w+@\w+\.+(com)$/;
    //const expPhone = /[0-9]/;

    if (nombre.length > 50) {
        alert("El nombre debe tener un max de 50 caracteres")
        return false;
    }
    if (!expEmail.test(email)) {
        alert("El formato del email es invalido");
        return false;
    }
    if (direccion.length > 60) {
        alert("La direccion debe tener un max de 60 caracteres")
        return false;
    }
    if (isNaN(telefono)) {
        alert("El telefono solo puede contener numeros, espacios o guion medio.");
        return false;
    } else {
        return true;
    }
}

const addUser = (event) => {
    event.preventDefault();

    if (validar()) {
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
}

const editUser = (event) => {
    event.preventDefault();

    if (validar()) {
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
    formFill(id);
    addButton.addEventListener('click', editUser);
} else {
    addButton.addEventListener('click', addUser);
}