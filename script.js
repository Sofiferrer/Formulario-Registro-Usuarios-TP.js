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


