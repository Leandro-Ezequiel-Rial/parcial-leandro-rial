function getDarkMode() {
    const darkMode = localStorage.getItem('darkMode');
    return darkMode === 'true';
}

function setDarkMode(isDark) {
    localStorage.setItem('darkMode', isDark.toString());
}

function applyDarkMode(isDark) {
    const body = document.body;
    const toggleButton = document.getElementById('toggle-dark-mode');
    
    if (isDark) {
        body.classList.add('dark-mode');
        toggleButton.textContent = 'Cambiar a modo claro';
    } else {
        body.classList.remove('dark-mode');
        toggleButton.textContent = 'Cambiar a modo oscuro';
    }
}

function toggleDarkMode() {
    const isDark = !getDarkMode();
    setDarkMode(isDark);
    applyDarkMode(isDark);
}

document.addEventListener('DOMContentLoaded', function() {
    const isDark = getDarkMode();
    applyDarkMode(isDark);
    
    const toggleButton = document.getElementById('toggle-dark-mode');
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleDarkMode);
    }

    const formulario = document.querySelector('.formulario-contacto');
    if (formulario) {
        const nombreInput = document.getElementById('nombre');
        const emailInput = document.getElementById('email');
        const comentariosInput = document.getElementById('comentarios');
        const errorNombre = document.getElementById('error-nombre');
        const errorEmail = document.getElementById('error-email');
        const errorComentarios = document.getElementById('error-comentarios');
        
        function limpiarError(input, errorSpan) {
            errorSpan.textContent = '';
            input.classList.remove('error');
        }
        
        function mostrarError(input, errorSpan, mensaje) {
            errorSpan.textContent = mensaje;
            input.classList.add('error');
        }
        
        if (nombreInput) {
            nombreInput.addEventListener('input', function() {
                limpiarError(nombreInput, errorNombre);
            });
        }
        
        if (emailInput) {
            emailInput.addEventListener('input', function() {
                limpiarError(emailInput, errorEmail);
            });
        }
        
        if (comentariosInput) {
            comentariosInput.addEventListener('input', function() {
                limpiarError(comentariosInput, errorComentarios);
            });
        }
        
        formulario.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let esValido = true;
            const nombre = nombreInput.value.trim();
            const email = emailInput.value.trim();
            const comentarios = comentariosInput.value.trim();
            
            limpiarError(nombreInput, errorNombre);
            limpiarError(emailInput, errorEmail);
            limpiarError(comentariosInput, errorComentarios);
            
            if (nombre === '') {
                mostrarError(nombreInput, errorNombre, 'Por favor, ingrese su nombre completo.');
                esValido = false;
            } else if (nombre.length < 3) {
                mostrarError(nombreInput, errorNombre, 'El nombre debe tener al menos 3 caracteres.');
                esValido = false;
            } else {
                const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
                if (!nombreRegex.test(nombre)) {
                    mostrarError(nombreInput, errorNombre, 'El nombre solo puede contener letras y espacios.');
                    esValido = false;
                }
            }
            
            if (email === '') {
                mostrarError(emailInput, errorEmail, 'Por favor, ingrese su email.');
                esValido = false;
            } else {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    mostrarError(emailInput, errorEmail, 'Por favor, ingrese un email válido.');
                    esValido = false;
                }
            }
            
            if (comentarios === '') {
                mostrarError(comentariosInput, errorComentarios, 'Por favor, ingrese sus comentarios.');
                esValido = false;
            } else if (comentarios.length < 10) {
                mostrarError(comentariosInput, errorComentarios, 'Los comentarios deben tener al menos 10 caracteres.');
                esValido = false;
            }
            
            if (esValido) {
                alert('¡Formulario enviado correctamente!');
                
                formulario.reset();
                limpiarError(nombreInput, errorNombre);
                limpiarError(emailInput, errorEmail);
                limpiarError(comentariosInput, errorComentarios);
            } else {
                if (nombreInput.classList.contains('error')) {
                    nombreInput.focus();
                } else if (emailInput.classList.contains('error')) {
                    emailInput.focus();
                } else if (comentariosInput.classList.contains('error')) {
                    comentariosInput.focus();
                }
            }
        });
    }
});

