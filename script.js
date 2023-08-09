// Configuración de Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyAtG0ak2il7dEz3B4wbuyGdRDHv79xhakk",
        authDomain: "datos-de-formulario-e0fcc.firebaseapp.com",
        projectId: "datos-de-formulario-e0fcc",
        storageBucket: "datos-de-formulario-e0fcc.appspot.com",
        messagingSenderId: "568148288147",
        appId: "1:568148288147:web:f76ed0d4a04a00efbf2366",
        measurementId: "G-QHCMHQ2172"
      };

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Obtener la instancia de Firestore
const db = firebase.firestore();

// Escuchar el evento de envío del formulario
document.getElementById('formulario').addEventListener('submit', (event) => {
  event.preventDefault();

  // Obtener los elementos del formulario
  const entradaNombre = document.getElementById('name');
  const errorNombre = document.getElementById('nameError');
  const emailEntrada = document.getElementById('email');
  const emailError = document.getElementById('emailError');
  const contrasenaEntrada = document.getElementById('password');
  const contrasenaError = document.getElementById('passwordError');

  // Validar el campo de nombre
  if (entradaNombre.value.trim() === '') {
    errorNombre.textContent = 'Por favor, introduce un nombre:';
    errorNombre.classList.add('error-message');
  } else {
    errorNombre.textContent = '';
    errorNombre.classList.remove('error-message');
    }

  // Validar el campo de email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailEntrada.value)) {
    emailError.textContent = 'Por favor, introduce un email válido';
    emailError.classList.add('error-message');
  } else {
    emailError.textContent = '';
    emailError.classList.remove('error-message');
    }

  // Validar el campo de contraseña
  const contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;
  if (!contrasenaPattern.test(contrasenaEntrada.value)) {
    contrasenaError.textContent = 'Por favor, introduce una contraseña de mínimo 8 carácteres y máximo 15, 1 mayúscula, 1 minúscula y 1 caracter especial:';
    contrasenaError.classList.add('error-message');
  } else {
    contrasenaError.textContent = '';
    contrasenaError.classList.remove('error-message');
    }

  // Si no hay errores en los campos, guardar los datos en Firestore
  if (!errorNombre.textContent && !emailError.textContent && !contrasenaError.textContent) {
        db.collection("users").add({
            nombre: entradaNombre.value,
            email: emailEntrada.value,
            password: contrasenaEntrada.value
        })
        .then((docRef) => {
      alert('El formulario se ha transmitido con éxito', docRef.id);
            document.getElementById('formulario').reset();
        })
        .catch((error) => {
            alert(error);
        });
    }
});