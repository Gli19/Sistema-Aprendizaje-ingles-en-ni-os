
document.getElementById("btn__registrarse").addEventListener("click", register);
document.getElementById("btn__iniciar-sesion").addEventListener("click", iniciarSesion);


var cont_login_register =  document.querySelector('.contenedor__login-register');
var form_login = document.querySelector('.formulario__login');
var form_register = document.querySelector('.formulario__register');
var caja_trasera_login = document.querySelector('.caja__trasera-login');
var caja_trasera_register = document.querySelector('.caja__trasera-register');

function register(){

    form_register.style.display = "block";
    cont_login_register.style.left = "47%";
    form_login.style.display = "none";
    caja_trasera_register.style.opacity = "0";
    caja_trasera_login.style.opacity = "1";
}
function iniciarSesion(){
    form_register.style.display = "none";
    cont_login_register.style.left = "1rem";
    form_login.style.display = "block";
    caja_trasera_register.style.opacity = "1";
    caja_trasera_login.style.opacity = "0";
}