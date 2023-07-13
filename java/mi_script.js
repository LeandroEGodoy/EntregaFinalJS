$(document).ready(function() {
  var isRegistered = true; 
  
  if (!isRegistered) {
    window.location.href = "login.html";
  } else {
    $('#myModal').modal('show');

    $('#registroForm').submit(function(event) {
      event.preventDefault();

      var nombre = $('#nombre').val();
      var correo = $('#correo').val();
      var contrasena = $('#contrasena').val();

      if (nombre && correo && contrasena) {
        alert('Registro exitoso. Ahora puedes comprar productos.');
      } else {
        alert('Por favor, completa todos los campos del formulario.');
      }

      $('#myModal').modal('hide');
    });
  }
});
