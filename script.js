// Interactive JavaScript for Mukeswar Reddy Bandlapalli Portfolio

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Typing Animation ---
  const typingElement = document.getElementById('typing-text');
  const roles = [
    'Full Stack Java Developer',
    'Software Developer',
    'Java Specialist',
    'Web Developer'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500; // Pause before typing next word
    }

    setTimeout(type, typingSpeed);
  }
  
  if (typingElement) {
    type();
  }

  // --- 2. Mobile Menu Navigation ---
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuLinks = mobileMenu?.querySelectorAll('a');
  
  function toggleMobileMenu() {
    const isOpen = !mobileMenu.classList.contains('hidden');
    if (isOpen) {
      // Close menu
      mobileMenu.classList.add('hidden');
      document.body.style.overflow = '';
      menuToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`;
    } else {
      // Open menu
      mobileMenu.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      menuToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;
    }
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', toggleMobileMenu);
    
    // Close menu when links are clicked
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        document.body.style.overflow = '';
        menuToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`;
      });
    });
  }

  // --- 3. Scroll-spy Header Highlighting ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function scrollSpy() {
    const scrollY = window.pageYOffset + 120; // offset for nav height

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('text-primary');
          link.classList.add('text-muted-foreground');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.remove('text-muted-foreground');
            link.classList.add('text-primary');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', scrollSpy);
  scrollSpy(); // run once initially

  // --- 4. Interactive Project Filtering ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => {
        b.classList.remove('bg-gradient-to-r', 'from-primary', 'to-secondary', 'text-white', 'shadow-glow');
        b.classList.add('glass', 'hover:border-primary/40', 'text-muted-foreground');
      });

      // Add active class to clicked button
      btn.classList.add('bg-gradient-to-r', 'from-primary', 'to-secondary', 'text-white', 'shadow-glow');
      btn.classList.remove('glass', 'hover:border-primary/40', 'text-muted-foreground');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.classList.remove('hidden');
          // simple fade in effect
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transition = 'opacity 0.4s ease';
          }, 50);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // --- 5. Clipboard Copying ---
  const copyElements = document.querySelectorAll('[data-copy-value]');
  
  copyElements.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const value = el.getAttribute('data-copy-value');
      const label = el.getAttribute('data-copy-label') || 'Copied!';
      
      navigator.clipboard.writeText(value).then(() => {
        // Show temporary tooltip
        const originalTooltip = el.querySelector('.tooltip-text');
        if (originalTooltip) {
          const originalText = originalTooltip.textContent;
          originalTooltip.textContent = label;
          el.classList.add('tooltip-visible');
          
          setTimeout(() => {
            originalTooltip.textContent = originalText;
            el.classList.remove('tooltip-visible');
          }, 2000);
        }
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    });
  });

  // --- 6. Contact Form Simulation & Toast Alert ---
  const contactForm = document.getElementById('contact-form');
  const toastSuccess = document.getElementById('toast-success');
  const toastError = document.getElementById('toast-error');
  const submitBtn = contactForm?.querySelector('button[type="submit"]');

  function showToast(toast) {
    if (!toast) return;
    toast.classList.remove('hidden');
    toast.classList.add('toast-slide-in');
    
    // Auto hide after 4 seconds
    setTimeout(() => {
      toast.classList.remove('toast-slide-in');
      toast.classList.add('toast-slide-out');
      setTimeout(() => {
        toast.classList.add('hidden');
        toast.classList.remove('toast-slide-out');
      }, 300);
    }, 4000);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name')?.value.trim();
      const email = document.getElementById('email')?.value.trim();
      const message = document.getElementById('message')?.value.trim();
      
      if (!name || !email || !message) {
        showToast(toastError);
        return;
      }

      // Simulate API submit
      if (submitBtn) {
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<svg class="w-5 h-5 animate-spin mr-2 inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-opacity="0.25"></circle><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke-linecap="round"></path></svg> Sending...`;
        
        setTimeout(() => {
          showToast(toastSuccess);
          contactForm.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }, 1500);
      }
    });
  }
});
