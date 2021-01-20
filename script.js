const base = "https://tp3-js-1e38b-default-rtdb.firebaseio.com/";


/*inicializar tabla*/

const init = () => {
    fetch(`${base}users.json`)
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            loadTable('tbl-users', data);
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

const loadTableRow = (tr, object) => {

    console.log(object);

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
    tdName.innerHTML = object.name;
    tdEmail.innerHTML = object.email;
    tdAddress.innerHTML = object.address;
    tdPhone.innerHTML = object.phone;
    tr.appendChild(tdName);
    tr.appendChild(tdEmail);
    tr.appendChild(tdAddress);
    tr.appendChild(tdPhone);

    const botonEditar = document.createElement('a');

    botonEditar.innerHTML = '<i class="fas fa-user-edit"></i>';
    botonEditar.setAttribute('class', 'btn-warning btn-edit');
    botonEditar.setAttribute('href', 'pag.html?name=' + object.id);
    const tdActions = document.createElement('td');
    tdActions.appendChild(botonEditar);

    const botonEliminar = document.createElement('button');
    botonEliminar.addEventListener('click', () => {
        deleteUser(object.id);
    });
    botonEliminar.innerHTML = '<i class="fas fa-trash-alt"></i>';
    botonEliminar.setAttribute('class', 'btn-danger btn-delete');
    tdActions.appendChild(botonEliminar);

    tr.appendChild(tdActions);
}


const loadTable = (tableId, data) => {
    const table = document.getElementById(tableId);
    const tbody = table.getElementsByTagName('tbody')[0];

    tbody.innerHTML = '';
    for (let objectId in data) {
        const tr = document.createElement('tr');
        data[objectId].id = objectId;
        loadTableRow(tr, data[objectId]);
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
            //console.log(inputFilter);
            // const tbody = document.getElementById("tbody");
            // tbody.innerHTML = "";

            let filteredData = {}

            for (let objectId in data) {

                if (data[objectId].name.includes(inputFilter)) {
                    filteredData[objectId] = data[objectId];
                }
                loadTable('tbl-users', filteredData);
            }
            console.log(filteredData)
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