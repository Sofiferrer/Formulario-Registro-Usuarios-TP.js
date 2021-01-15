/*Nombre (Máximo 50 carácteres)
Dirección (Máximo 60 carácteres)
Telefono (Solo números, espacios y/o guiones medios. Validar el formato utilizando expresiones regulares)
Email (Validar el formato utilizando expresiones regulares)
Al hacer click en el botón guardar, primero se debe validar que los campos sean válidos. En caso afirmativo, hacer un POST a la ruta /users enviando el objeto con las 4 propiedades (fullname, email, address, phone).*/

const validar = () => {

    const nombre = document.getElementById('name').value;
    const direccion = document.getElementById('address').value;
    const telefono = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const expresion = /\w+@\w+\.+[a-z]/;

    if (nombre.length > 50) {
        alert("El nombre debe tener un max de 50 caracteres")
        return false;
    }
    if (direccion.length > 60) {
        alert("La direccion debe tener un max de 60 caracteres")
        return false;
    }
    if (isNaN(telefono)) {
        alert("El telefono solo puede contener numeros, espacios o guion medio.");
        return false;
    }
    if (!expresion.test(email)) {
        alert("el formato es invalido");
        return false;
    }
}