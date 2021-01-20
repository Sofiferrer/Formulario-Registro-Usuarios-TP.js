const base = "https://tp3-js-1e38b-default-rtdb.firebaseio.com/";


/*inicializar tabla*/

const init = () => {
    fetch(`${base}users.json`)
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            createTable(data);
        })
};
init();

const deleteUser = (id) => {
    fetch(`${base}users/${id}.json`, {
        method: "DELETE"
    }).then((response) => {
        console.log(response);
        return response.json()
    }).then((data) => {
        console.log(data)
    }).then(init);
}

const createTable = (data) => {
    const tbody = document.getElementById("tbody");
    tbody.innerHTML = "";
    for (let object in data) {
        //console.log(data);
        const tr = document.createElement('tr');
        const checkBox = document.createElement('input');
        checkBox.setAttribute('type', 'checkbox');
        checkBox.setAttribute('class', 'checks');
        const celda = document.createElement('td');
        tr.appendChild(celda);
        celda.appendChild(checkBox);
        const tdName = document.createElement('td');
        const tdEmail = document.createElement('td');
        const tdAddress = document.createElement('td');
        const tdPhone = document.createElement('td');
        tdName.innerHTML = data[object].name;
        tdEmail.innerHTML = data[object].email;
        tdAddress.innerHTML = data[object].address;
        tdPhone.innerHTML = data[object].phone;
        tr.appendChild(tdName);
        tr.appendChild(tdEmail);
        tr.appendChild(tdAddress);
        tr.appendChild(tdPhone);

        const botonEditar = document.createElement('a');

        botonEditar.innerHTML = '<i class="fas fa-user-edit"></i>';
        botonEditar.setAttribute('class', 'btn-warning btn-edit');
        botonEditar.setAttribute('href', 'pag.html?name=' + object);
        const tdActions = document.createElement('td');
        tdActions.appendChild(botonEditar);

        const botonEliminar = document.createElement('button');
        botonEliminar.addEventListener('click', () => {
            deleteUser(object);
        });
        botonEliminar.innerHTML = '<i class="fas fa-trash-alt"></i>';
        botonEliminar.setAttribute('class', 'btn-danger btn-delete');
        tdActions.appendChild(botonEliminar);

        tr.appendChild(tdActions);
        tbody.appendChild(tr);
    }
}


const filterButton = document.getElementById('filterButton');

const filter = (event) => {
    event.preventDefault();

    fetch(`${base}users.json`)
        .then(response => response.json())
        .then(data => {
            const inputFilter = document.getElementById('filtro').value;
            console.log(inputFilter);

            for (let object in data) {
                const empleados = data[object];

                if (empleados.name.includes(inputFilter)) {

                    console.log(empleados);
                    createTable([empleados]);
                }
            }
        })
}

filterButton.addEventListener('click', filter);


const check = () => {
    let selectAll = document.getElementById('selectAll').checked;
    let checks = document.querySelectorAll('checks');

    if (selectAll) {
        alert('seleccionado');
        checks.setAttribute('')
    }
}

selectAll.addEventListener('click', check);