document.addEventListener('DOMContentLoaded', function() {
  // Verificar si el usuario ya se registró previamente
  const registroPrevio = localStorage.getItem('registroCompletado');

  if (!registroPrevio) {
    // El usuario no se ha registrado previamente, mostrar el popup
    mostrarPopup("Bienvenido, para poder realizar compras regístrese");
  }
});

function mostrarPopup(mensaje) {
  // Crear el formulario de registro como un popup
  const popupDiv = document.createElement('div');
  popupDiv.classList.add('popup');
  popupDiv.innerHTML = `
    <span class="close" onclick="cerrarPopup()">&times;</span>
    <div class="popup-content">${mensaje}</div>
    <form id="registroForm">
      <input type="text" id="nombre" placeholder="Nombre" required>
      <input type="text" id="apellido" placeholder="Apellido" required>
      <input type="email" id="email" placeholder="Correo electrónico" required>
      <input type="password" id="contraseña" placeholder="Contraseña" required>
      <input type="password" id="confirmar-contraseña" placeholder="Confirmar contraseña" required>
      <button type="button" id="btnRegistrarse" onclick="registrarUsuario()">Registrarse</button>
      <button type="button" id="btnLimpiar" onclick="limpiarCampos()">Limpiar</button>
    </form>
  `;


  // Agregar el popup al cuerpo del documento
  document.body.appendChild(popupDiv);
}

function limpiarCampos() {
  document.getElementById('nombre').value = '';
  document.getElementById('apellido').value = '';
  document.getElementById('email').value = '';
  document.getElementById('contraseña').value = '';
  document.getElementById('confirmar-contraseña').value = '';
}

function cerrarPopup() {
  // Cerrar el popup al hacer clic en el botón de cerrar
  const popupDiv = document.querySelector('.popup');
  document.body.removeChild(popupDiv);
}

function registrarUsuario() {
  // Obtener los valores ingresados por el usuario
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const email = document.getElementById('email').value;
  const contraseña = document.getElementById('contraseña').value;
  const confirmarContraseña = document.getElementById('confirmar-contraseña').value;

  // Validar el formulario
  if (!validarRegistro(nombre, apellido, email, contraseña, confirmarContraseña)) {
    return; // Detener la ejecución si el formulario no es válido
  }


  if (emailRegistrado(email)) {
    alert('El email ingresado ya está registrado. Por favor, utiliza otro email.');
    return; 
  }

  guardarRegistro(nombre, apellido, email, contraseña);

  mostrarMensajeRegistroExitoso();

  resetFormulario();

  cerrarPopup();

  localStorage.setItem('registroCompletado', 'true');
}

function validarRegistro(nombre, apellido, email, contraseña, confirmarContraseña) {
  if (!nombre || !apellido || !email || !contraseña || !confirmarContraseña) {
    alert('Por favor, complete todos los campos.');
    return false;
  }

  if (contraseña !== confirmarContraseña) {
    alert('Las contraseñas no coinciden.');
    return false;
  }

  if (contraseña.length < 8) {
    alert('La contraseña debe tener al menos 8 caracteres.');
    return false;
  }

  // Validar el correo electrónico utilizando una expresión regular
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.match(emailPattern)) {
    alert('Por favor, ingrese un correo electrónico válido.');
    return false;
  }

  return true;
}

function emailRegistrado(email) {
  const correosRegistrados = ['usuario1@example.com', 'usuario2@example.com', 'usuario3@example.com'];
  return correosRegistrados.includes(email);
}

function guardarRegistro(nombre, apellido, email, contraseña) {
  // Crear un objeto con los datos del registro
  const registro = {
    nombre,
    apellido,
    email,
    contraseña
  };

  // Obtener el arreglo de registros almacenado en el localStorage o crear un nuevo arreglo si no existe
  let registrosGuardados = JSON.parse(localStorage.getItem('registros')) || [];

  // Agregar el nuevo registro al arreglo
  registrosGuardados.push(registro);

  // Almacenar el arreglo actualizado en el localStorage
  localStorage.setItem('registros', JSON.stringify(registrosGuardados));
}

function mostrarMensajeRegistroExitoso() {
  // Crear un mensaje de registro exitoso
  const mensajeDiv = document.createElement('div');
  mensajeDiv.classList.add('mensaje-registro');
  mensajeDiv.innerHTML = `
    <div class="mensaje-registro-content animate__animated animate__zoomIn">
      <h3>¡Su registro fue exitoso!</h3>
    </div>
  `;

  // Agregar el mensaje al cuerpo del documento
  document.body.appendChild(mensajeDiv);

  // Ocultar el mensaje después de 3 segundos
  setTimeout(() => {
    mensajeDiv.classList.add('animate__fadeOut');
    setTimeout(() => {
      document.body.removeChild(mensajeDiv);
    }, 1000);
  }, 3000);
}

function resetFormulario() {
  console.log('Formulario restablecido.');
}