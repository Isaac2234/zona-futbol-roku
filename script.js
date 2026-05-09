// 1. Importamos Firebase directamente desde sus servidores (CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// 2. Tu configuración exacta de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB6NyfhIPkJyiNyaSaKRYHSrBSsj6dcr6E",
  authDomain: "web-video-caster-95002.firebaseapp.com",
  projectId: "web-video-caster-95002",
  storageBucket: "web-video-caster-95002.firebasestorage.app",
  messagingSenderId: "530037251852",
  appId: "1:530037251852:web:c98abc75313478439ef329",
  measurementId: "G-98X0DL1W66"
};

// 3. Inicializamos Firebase, Analytics y Authentication
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// 4. Lógica del botón de registro
const btnRegister = document.getElementById('btn-register');

btnRegister.addEventListener('click', (e) => {
    // Evitamos que el formulario recargue la página por defecto
    e.preventDefault();

    // Obtenemos los valores de los inputs del HTML
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const mensaje = document.getElementById('mensaje');

    // Validación sencilla antes de enviar
    if(email === "" || password === "") {
        mensaje.textContent = "Por favor, llena ambos campos.";
        mensaje.style.color = "orange";
        // Limpiamos estilos por si había un mensaje de éxito previo
        mensaje.style.backgroundColor = "transparent";
        mensaje.style.border = "none";
        mensaje.style.padding = "0";
        return;
    }

    // Enviamos a Firebase
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Éxito: el usuario se creó. Mostramos el mensaje con la palomita.
            mensaje.innerHTML = '<i class="fas fa-check-circle" style="color: #28a745; font-size: 1.5em; vertical-align: middle; margin-right: 8px;"></i> ¡Toma captura a esta pantalla y envíala al vendedor para su validación!';
            
            // Le damos estilo de recuadro de éxito (verde claro)
            mensaje.style.color = "#155724"; 
            mensaje.style.backgroundColor = "#d4edda";
            mensaje.style.padding = "15px";
            mensaje.style.borderRadius = "8px";
            mensaje.style.border = "1px solid #c3e6cb";
            
            // Limpiamos los campos para que quede listo para otra captura si es necesario
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';
        })
        .catch((error) => {
            // Error: correo duplicado, contraseña corta, etc.
            // Limpiamos el estilo de éxito por si estaba activo
            mensaje.style.backgroundColor = "#f8d7da";
            mensaje.style.border = "1px solid #f5c6cb";
            mensaje.style.padding = "15px";
            mensaje.style.borderRadius = "8px";
            
            // Verificamos algunos errores comunes para mostrarlos en español
            let errorMsg = "Ocurrió un error al registrar.";
            if (error.code === 'auth/email-already-in-use') {
                errorMsg = "Este correo ya está registrado.";
            } else if (error.code === 'auth/weak-password') {
                errorMsg = "La contraseña debe tener al menos 6 caracteres.";
            } else if (error.code === 'auth/invalid-email') {
                errorMsg = "El formato del correo no es válido.";
            } else {
                errorMsg = error.message; // Muestra el error original si es otro
            }

            mensaje.innerHTML = `<i class="fas fa-exclamation-triangle" style="color: #dc3545; font-size: 1.2em; vertical-align: middle; margin-right: 8px;"></i> ${errorMsg}`;
            mensaje.style.color = "#721c24";
        });
});