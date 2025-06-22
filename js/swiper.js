const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
let current = 0;
let autoSlide = true;
let autoTimeout;

function showSlide(idx) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === idx);
    dots[i].classList.toggle('active', i === idx);
  });
  current = idx;
}

function nextSlide() {
  let idx = (current + 1) % slides.length;
  showSlide(idx);
}

function prevSlide() {
  let idx = (current - 1 + slides.length) % slides.length;
  showSlide(idx);
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    showSlide(i);
    resetAuto();
  });
});

nextBtn.addEventListener('click', () => {
  nextSlide();
  resetAuto();
});

prevBtn.addEventListener('click', () => {
  prevSlide();
  resetAuto();
});

function autoAdvance() {
  if (autoSlide) {
    nextSlide();
    autoTimeout = setTimeout(autoAdvance, 4000); // cada 4s
  }
}

function resetAuto() {
  clearTimeout(autoTimeout);
  autoTimeout = setTimeout(autoAdvance, 4000);
}

// Inicializar
showSlide(0);
autoAdvance();