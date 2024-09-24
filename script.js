const text = "¡Hola, soy Cristian Fierro!";
const typingSpeed = 70; // Milisegundos entre cada letra
let index = 0;

function typeText() {
    if (index < text.length) {
        document.getElementById('text').innerHTML += text.charAt(index);
        index++;
        setTimeout(typeText, typingSpeed);
    } else {
        // Una vez que termine de escribir, ocultamos la barra de escritura
        document.getElementById('cursor').classList.add('hidden');
    }
}

// Llamar a la función de tipeo cuando cargue la página
window.onload = function() {
    typeText();
};

// Manejo de la navegación al hacer scroll
document.addEventListener("scroll", function() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".encabezado__navegacion--elemento a");

    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.contacto__campo');
    
    inputs.forEach(input => {
        const label = input.nextElementSibling;
        input.setAttribute('placeholder', ' ');
        
        input.addEventListener('focus', () => {
            label.style.top = '-20px';
            label.style.fontSize = '0.8em';
        });
        
        input.addEventListener('blur', () => {
            if (input.value === '') {
                label.style.top = '10px';
                label.style.fontSize = '1em';
            }
        });
    });
});

function initializeMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.encabezado__navegacion');
    const header = document.querySelector('.encabezado__container');

    menuToggle.addEventListener('click', function(event) {
        event.stopPropagation();
        toggleMenu();
    });

    // Cerrar el menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.encabezado__navegacion--elemento a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Cerrar el menú al hacer clic fuera de él
    document.addEventListener('click', function(event) {
        const isClickInsideNav = nav.contains(event.target);
        const isClickOnMenuToggle = menuToggle.contains(event.target);

        if (!isClickInsideNav && !isClickOnMenuToggle && nav.classList.contains('active')) {
            closeMenu();
        }
    });

    function toggleMenu() {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        
        if (nav.classList.contains('active')) {
            menuToggle.setAttribute('aria-label', 'Cerrar menú de navegación');
        } else {
            menuToggle.setAttribute('aria-label', 'Abrir menú de navegación');
        }
    }

    function closeMenu() {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Abrir menú de navegación');
    }
}

// Llamar a la función cuando se carga el DOM
document.addEventListener('DOMContentLoaded', initializeMenu);

function validarFormulario() {
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const asunto = document.getElementById("asunto").value;
    const mensaje = document.getElementById("mensaje").value;

    // Validar formato de nombre
    const nombreRegex = /^[a-zA-Z\s]+$/;
    if (!nombreRegex.test(nombre)) {
        alert("El nombre solo puede contener letras y espacios.");
        return false;
    }

    // Validar longitud de los campos
    if (nombre.length > 100) {
        alert("El nombre no puede ser mayor a 100 caracteres.");
        return false;
    }
    if (asunto.length > 100) {
        alert("El asunto no puede ser mayor a 100 caracteres.");
        return false;
    }
    if (mensaje.length > 500) {
        alert("El mensaje no puede ser mayor a 500 caracteres.");
        return false;
    }

    // Si todas las validaciones pasan, muestra el mensaje de éxito
    mostrarMensajeExito();

    return false; // Detenemos el envío real del formulario para fines de demostración
}

function mostrarMensajeExito() {
    const mensajeExito = document.getElementById("mensajeExito");
    mensajeExito.style.display = "block"; // Mostrar el mensaje

    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
        mensajeExito.style.display = "none";
    }, 3000);
}