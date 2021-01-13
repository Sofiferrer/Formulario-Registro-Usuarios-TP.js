
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
        .catch((error) => console.log(error));
}

const addButton = document.getElementById('addButton');
addButton.addEventListener('click', addUser);