document.addEventListener('DOMContentLoaded', () => {
  // Image Slider
  const slider = document.querySelector('.slider');
  const slides = slider.querySelectorAll('img');
  const prevButton = document.querySelector('.slider-button.prev');
  const nextButton = document.querySelector('.slider-button.next');
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove('active'));
    slides[index].classList.add('active');
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  nextButton.addEventListener('click', nextSlide);
  prevButton.addEventListener('click', prevSlide);

  // Auto-advance slides every 5 seconds
  setInterval(nextSlide, 5000);

  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.querySelector('nav');

  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', nav.classList.contains('active'));
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (event) => {
    if (!nav.contains(event.target) && !menuToggle.contains(event.target)) {
      nav.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Smooth Scrolling for Navigation Links
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        // Close mobile menu after clicking a link
        nav.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Highlight active navigation item on scroll
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('nav ul li a');

  function highlightNavItem() {
    let scrollPosition = window.scrollY;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionBottom = sectionTop + section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        navItems.forEach((item) => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavItem);

  // Initialize highlight on page load
  highlightNavItem();
});