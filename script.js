const base = "https://tp3-js-1e38b-default-rtdb.firebaseio.com/";

/*inicializar tabla*/

const init = () => {
    fetch(`${base}users.json`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
        });
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

        for (let item in data[object]) {
            const td = document.createElement('td');
            td.innerHTML = data[object][item];
            tr.appendChild(td);
        }

        const botonEliminar = document.createElement('button');
        botonEliminar.addEventListener('click', () => {
            deleteUser(object);
        });
        botonEliminar.innerText = 'Eliminar';
        botonEliminar.setAttribute('class', 'btn btn-danger');
        const tdElim = document.createElement('td');
        tdElim.appendChild(botonEliminar);
        tr.appendChild(tdElim);

        const botonEditar = document.createElement('button');
        botonEditar.addEventListener('click', () => {
            window.location = `form.html?name=${object}`;
        });
        botonEditar.innerText = 'Editar';
        botonEditar.setAttribute('class', 'btn btn-warning');
        const tdEdit = document.createElement('td');
        tdEdit.appendChild(botonEditar);
        tr.appendChild(tdEdit);

        tbody.appendChild(tr);
    }
}
