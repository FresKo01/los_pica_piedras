// Efectos de scroll para la página
class ScrollEffects {
  constructor() {
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupParallaxEffect();
    this.setupSmoothScrolling();
    this.addScrollClasses();
  }

  // Observer para detectar cuando los elementos entran en viewport
  setupIntersectionObserver() {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Para párrafos, agregar delay escalonado
          if (entry.target.tagName === 'P') {
            const paragraphs = entry.target.parentElement.querySelectorAll('p');
            paragraphs.forEach((p, index) => {
              setTimeout(() => {
                p.classList.add('visible');
              }, index * 150);
            });
          }
        }
      });
    }, options);

    // Observar elementos específicos
    const elementsToObserve = document.querySelectorAll('.scroll-element');
    elementsToObserve.forEach(el => observer.observe(el));
  }

  // Efecto parallax suave
  setupParallaxEffect() {
    let ticking = false;

    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax-element');
      
      parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
      
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });
  }

  // Scroll suave para enlaces internos
  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // Agregar clases de scroll a elementos existentes
  addScrollClasses() {
    // Agregar clases a elementos del intro-bloque
    const introTexto = document.querySelector('.intro-texto');
    const introImagenGrande = document.querySelector('.intro-imagen-grande');
    const introImagenChica = document.querySelector('.intro-imagen-chica');
    const introH2 = document.querySelector('.intro-texto h2');
    const introParagraphs = document.querySelectorAll('.intro-texto p');

    if (introTexto) introTexto.classList.add('scroll-element');
    if (introImagenGrande) {
      introImagenGrande.classList.add('scroll-element', 'parallax-element');
      introImagenGrande.dataset.speed = '0.3';
    }
    if (introImagenChica) {
      introImagenChica.classList.add('scroll-element', 'parallax-element');
      introImagenChica.dataset.speed = '0.2';
    }
    if (introH2) {
      introH2.classList.add('scroll-element', 'draw-line');
    }
    
    introParagraphs.forEach(p => {
      p.classList.add('scroll-element');
    });

    // Agregar contenedor parallax a la sección de imágenes
    const introImagen = document.querySelector('.intro-imagen');
    if (introImagen) {
      introImagen.classList.add('parallax-container');
    }
  }

  // Método para agregar efecto de escritura a máquina
  addTypewriterEffect(element, text, speed = 50) {
    element.innerHTML = '';
    let i = 0;
    
    const typeWriter = () => {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      }
    };
    
    typeWriter();
  }

  // Método para crear animación de contador
  animateCounter(element, start, end, duration = 2000) {
    const startTime = performance.now();
    
    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const current = Math.floor(start + (end - start) * progress);
      element.textContent = current;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };
    
    requestAnimationFrame(updateCounter);
  }
}

// Inicializar efectos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new ScrollEffects();
});

// Agregar efectos adicionales específicos para la página de inicio
if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
  window.addEventListener('load', () => {
    // Efecto especial para el título principal
    const homeTitle = document.querySelector('.home-titulo h1');
    if (homeTitle) {
      homeTitle.style.opacity = '0';
      homeTitle.style.transform = 'translateY(30px)';
      
      setTimeout(() => {
        homeTitle.style.transition = 'all 1s ease-out';
        homeTitle.style.opacity = '1';
        homeTitle.style.transform = 'translateY(0)';
      }, 500);
    }
  });
}