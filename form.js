const url = new URL(window.location);
const id = url.searchParams.get('name');

const inputName = document.getElementById('name');
const inputEmail = document.getElementById('email');
const inputAddress = document.getElementById('address');
const inputPhone = document.getElementById('phone');

const validar = () => {
    const nombre = inputName.value;
    const direccion = inputAddress.value;
    const telefono = inputPhone.value;
    const email = inputEmail.value;
    const expEmail = /\w+@\w+\.+(com)$/;
    const expPhone = /^[0-9\s-]+$/;

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
    if (!expPhone.test(telefono)) {
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
            close();
        }).then(init);
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
            close();
        }).then(init);
    }
}

const closebutton = document.getElementById('close');

const close = () => {
    window.location = "pag.html";
}

closebutton.addEventListener('click', close)

const formFill = (id) => {
    fetch(`${base}users/${id}.json`)
        .then((response) => {
            return response.json()
        }).then((data) => {
            inputName.value = data.name
            inputEmail.value = data.email
            inputAddress.value = data.address
            inputPhone.value = data.phone
            var myModal = new bootstrap.Modal(document.getElementById('modaladd'), {
                keyboard: false
            })
            myModal.show()
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