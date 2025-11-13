document.addEventListener('DOMContentLoaded', () => {

    // --- 1. LÓGICA MENÚ HAMBURGUESA (MÓVILES) ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
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
    }
    
    // --- 2. ACTUALIZAR AÑO EN FOOTER ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- 3. ANIMACIÓN AL HACER SCROLL ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1 // El elemento se animará cuando un 10% sea visible
    });

    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => observer.observe(el));

    // --- 4. LÓGICA DE MODALES DE EXPERIENCIA (CLIC EN TARJETAS) ---
    const modal = document.getElementById('experience-modal');
    const experienceCards = document.querySelectorAll('.experience-card');
    const closeModalButton = document.querySelector('.close-button');

    // Al hacer clic en una tarjeta de experiencia
    experienceCards.forEach(card => {
        card.addEventListener('click', () => {
            const modalId = card.getAttribute('data-modal-id');
            const contentSource = document.getElementById(`${modalId}-content`);
            
            if (contentSource && modal) {
                // Obtener datos
                const title = card.querySelector('h3').textContent;
                const company = card.querySelector('p').textContent;
                const detailsHTML = contentSource.querySelector('ul, p').cloneNode(true); // Copia texto
                const images = contentSource.querySelectorAll('.images img'); // Busca imágenes si las hay en el bloque oculto

                // Poblar el modal
                document.getElementById('modal-title').textContent = title;
                document.getElementById('modal-company').textContent = company;
                
                const modalBody = document.getElementById('modal-body');
                modalBody.innerHTML = ''; 
                modalBody.appendChild(detailsHTML);

                // Poblar galería del modal (si hay imágenes extras en la descripción oculta)
                const modalGallery = document.getElementById('modal-gallery');
                modalGallery.innerHTML = ''; 
                if(images.length > 0){
                     images.forEach(img => {
                        const galleryImage = img.cloneNode(true);
                        modalGallery.appendChild(galleryImage);
                    });
                }

                // Mostrar modal
                modal.style.display = 'block';
            }
        });
    });

    // Cerrar modal de experiencia
    if (closeModalButton && modal) {
        closeModalButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
    
    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // --- 5. LÓGICA DEL CARRUSEL EXPANDIBLE (LIGHTBOX) ---
    const imageViewer = document.getElementById('image-viewer');
    const fullImage = document.getElementById('full-image');
    const closeViewer = document.querySelector('.close-viewer');
    
    // Seleccionamos todas las imágenes dentro del track del carrusel
    const carouselImages = document.querySelectorAll('.carousel-track img');

    carouselImages.forEach(img => {
        img.addEventListener('click', function(e) {
            // Evitamos que el clic se propague a la tarjeta (para que no se abra el modal de experiencia al ver la foto)
            e.stopPropagation();
            
            if (imageViewer && fullImage) {
                imageViewer.style.display = "flex"; // Usamos flex para centrar
                fullImage.src = this.src; 
                fullImage.alt = this.alt;
            }
        });
    });

    // Cerrar el visor al hacer clic en la X
    if (closeViewer && imageViewer) {
        closeViewer.addEventListener('click', () => {
            imageViewer.style.display = "none";
        });
    }

    // Cerrar el visor al hacer clic fuera de la imagen
    if (imageViewer) {
        imageViewer.addEventListener('click', (e) => {
            if (e.target === imageViewer) {
                imageViewer.style.display = "none";
            }
        });
    }
});
