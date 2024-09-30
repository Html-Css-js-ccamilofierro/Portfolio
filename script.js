const text = "¡Hola, soy un desarrollador full stack !";
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

document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateSkills();
            observer.disconnect();
        }
    }, { threshold: 0.1 });

    const skillsSection = document.querySelector('.habilidades__lista');
    if (skillsSection) {
        observer.observe(skillsSection);
    }

    function animateSkills() {
        const skillElements = document.querySelectorAll('.habilidades__elemento');
        skillElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('animate');
            }, index * 100);
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '50px' });

    const proyectos = document.querySelectorAll('.proyecto');
    proyectos.forEach(proyecto => {
        observer.observe(proyecto);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                if (entry.target.classList.contains('contacto__formulario')) {
                    animateFormFields(entry.target);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Target all sections that need animations
    const animateSections = [
        '.sobre-mi',
        '.habilidades',
        '.formacion',
        '.proyectos',
        '.contacto'
    ];

    animateSections.forEach(section => {
        const elements = document.querySelectorAll(`${section} .animate-element`);
        elements.forEach(el => observer.observe(el));
    });

    // Specific handling for project cards
    const proyectos = document.querySelectorAll('.proyecto');
    proyectos.forEach(proyecto => {
        observer.observe(proyecto);
    });

    // Specific handling for contact form
    const contactElements = document.querySelectorAll('.contacto__imagen, .contacto__descripcion, .contacto__formulario');
    contactElements.forEach(el => observer.observe(el));

    function animateFormFields(form) {
        const fields = form.querySelectorAll('.contacto__campo-contenedor, .contacto__boton');
        fields.forEach((field, index) => {
            setTimeout(() => {
                field.classList.add('animate');
            }, index * 100);
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.encabezado__container');
    
    
    setTimeout(() => {
        header.classList.add('visible');
    }, 100);
});


document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.carousel');
    
    carousels.forEach(carousel => {
        const images = carousel.querySelectorAll('.proyecto__imagen');
        const prevButton = carousel.querySelector('.prev');
        const nextButton = carousel.querySelector('.next');
        let currentIndex = 0;

        function showImage(index) {
            images.forEach(img => img.classList.remove('active'));
            images[index].classList.add('active');
        }

        function nextImage() {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        }

        function prevImage() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        }

        nextButton.addEventListener('click', nextImage);
        prevButton.addEventListener('click', prevImage);

        // Mostrar la primera imagen al cargar
        showImage(currentIndex);

        // Cambio automático de imagen cada 5 segundos
        setInterval(nextImage, 3000);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const formacionElementos = document.querySelectorAll('.formacion__elemento');

    formacionElementos.forEach(elemento => {
        elemento.addEventListener('mouseenter', () => {
            elemento.style.transform = 'translateY(-10px) scale(1.05)';
        });

        elemento.addEventListener('mouseleave', () => {
            elemento.style.transform = 'translateY(0) scale(1)';
        });

    });

    // Animación de entrada
    function animateElements() {
        formacionElementos.forEach((elemento, index) => {
            setTimeout(() => {
                elemento.style.opacity = '1';
                elemento.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    // Inicialmente, oculta los elementos
    formacionElementos.forEach(elemento => {
        elemento.style.opacity = '0';
        elemento.style.transform = 'translateY(20px)';
        elemento.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Ejecuta la animación después de un pequeño retraso
    setTimeout(animateElements, 500);
});

document.addEventListener('DOMContentLoaded', function() {
    const sobreMiSection = document.querySelector('.sobre-mi');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                sobreMiSection.classList.add('animate');
                const title = sobreMiSection.querySelector('.section__title');
                const underline = sobreMiSection.querySelector('.section__title--underlined');
                const cards = sobreMiSection.querySelectorAll('.sobre-mi__card');
                
                title.classList.add('animate');
                underline.classList.add('animate');
                
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animate');
                    }, 300 + index * 100);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    observer.observe(sobreMiSection);
});