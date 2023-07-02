// DECLARO LAS CONSTANTES PARA QUE OBTENGA LOS ELEMENTOS DEL FORMULARIO EN EL LOGIN

const loginForm = document.getElementById('iniciosesion');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('login-button');

//AGREGO EVENTO CLICK AL BOTÓN DE INICIO DE SESIÓN 
loginButton.addEventListener('click', function(event) {
  event.preventDefault(); 

  const usuario = usernameInput.value;
  const password = passwordInput.value;


  // ESTE IF VALIDA EL USUARIO Y LA CONTRASEÑA
  if (usuario === 'hola' && password === 'tarola') {

    // SI CONCUERDA CON EL REGISTRO, USA EL SWAL.FIRE PARA LANZAR EL MENSAJE
    Swal.fire('¡Inicio de sesión exitoso!', 'Bienvenido ' + usuario + '!', 'success')
      .then(() => {
        
        //REDIRECCIONA AL INDEX.HTML LUEGO DE 1.5 SEGUNDOS
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1500);
      });
  } else {

    // SI EL REGISTRO NO CONCUERDA, DISPARA EL SIGUIENTE MENSAJE 
    Swal.fire('Error de inicio de sesión', 'Usuario o contraseña incorrectos', 'error');
  }

  // LIMPIA LOS CAMPOS DEL FORMULARIO 
  usernameInput.value = '';
  passwordInput.value = '';
});
