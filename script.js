const base = "https://5fff0177a4a0dd001701b49e.mockapi.io/";

/*inicializar tabla*/

const init = () => {
    fetch(`${base}users.json`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
        });
};
init();
