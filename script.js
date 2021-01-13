const base = "https://tp3-js-1e38b-default-rtdb.firebaseio.com/";

/*inicializar tabla*/

const init = () => {
    fetch(`${base}users.json`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
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

        const tr = document.createElement('tr');
        const checkBox = document.createElement('input');
        checkBox.setAttribute('type', 'checkbox');
        const celda = document.createElement('td');
        tr.appendChild(celda);
        celda.appendChild(checkBox);

        for (let item in data[object]) {
            const td = document.createElement('td');
            td.innerHTML = data[object][item];
            tr.appendChild(td);
        }

        const botonEliminar = document.createElement('button');
        botonEliminar.addEventListener('click', () => {
            deleteUser(object);
        });
        botonEliminar.innerText = 'El';
        botonEliminar.setAttribute('class', 'btn btn-danger');
        const tdActions = document.createElement('td');
        tdActions.appendChild(botonEliminar);

        const botonEditar = document.createElement('button');
        botonEditar.addEventListener('click', () => {
            window.location = `form.html?name=${object}`;
        });
        botonEditar.innerText = 'Ed';
        botonEditar.setAttribute('class', 'btn btn-warning');
        tdActions.appendChild(botonEditar);
        tr.appendChild(tdActions);

        tbody.appendChild(tr);
    }
}
