document.addEventListener('DOMContentLoaded', () => {

    // Lógica para el menú hamburguesa en móviles
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Cierra el menú móvil al hacer clic en un enlace
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Actualizar el año en el footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Animación de elementos al hacer scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1 // El elemento se animará cuando un 10% sea visible
    });

    // Observar todos los elementos con la clase .animate-on-scroll
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => observer.observe(el));

    // --- LÓGICA DEL CARRUSEL EXPANDIBLE (LIGHTBOX) ---
    const imageViewer = document.getElementById('image-viewer');
    const fullImage = document.getElementById('full-image');
    const closeViewer = document.querySelector('.close-viewer');
    
    // Seleccionamos todas las imágenes dentro del track del carrusel
    const carouselImages = document.querySelectorAll('.carousel-track img');

    carouselImages.forEach(img => {
        img.addEventListener('click', function(e) {
            // Evitamos que el clic se propague (por si acaso está dentro de otro elemento clickable)
            e.stopPropagation();
            
            imageViewer.style.display = "flex"; // Usamos flex para centrar
            fullImage.src = this.src; // La imagen grande será igual a la que diste clic
            fullImage.alt = this.alt;
        });
    });

    // Cerrar el visor al hacer clic en la X
    if (closeViewer) {
        closeViewer.addEventListener('click', () => {
            imageViewer.style.display = "none";
        });
    }

    // Cerrar el visor al hacer clic fuera de la imagen (en el fondo negro)
    if (imageViewer) {
        imageViewer.addEventListener('click', (e) => {
            if (e.target === imageViewer) {
                imageViewer.style.display = "none";
            }
        });
    }
});

fetch('base.md')
  .then(response => response.text())
  .then(data => {
    document.getElementById('experience-content').innerHTML = data;
  });
