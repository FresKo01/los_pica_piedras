const swiper = new Swiper('.swiper-home', {
  loop: true,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

document.getElementById("year").textContent = new Date().getFullYear();


const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Efecto parallax para la imagen pequeña
document.addEventListener('DOMContentLoaded', function() {
  const parallaxImage = document.querySelector('.intro-imagen-chica');
  
  if (parallaxImage) {
    // Agregar clase para el efecto parallax
    parallaxImage.classList.add('parallax');
    
    // Función para calcular el offset del parallax
    function updateParallax() {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.3; // Velocidad del efecto parallax (ajustar según preferencia)
      
      // Aplicar el transform solo si la imagen está en el viewport
      const rect = parallaxImage.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible) {
        parallaxImage.style.setProperty('--parallax-offset', rate + 'px');
      }
    }
    
    // Event listener para el scroll
    window.addEventListener('scroll', updateParallax);
    
    // Ejecutar una vez al cargar para establecer la posición inicial
    updateParallax();
  }
});

