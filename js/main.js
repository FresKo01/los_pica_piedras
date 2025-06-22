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