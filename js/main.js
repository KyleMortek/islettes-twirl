/**
 * Islettes Twirl Team - Main JavaScript
 * Handles navigation, interactive features, and accessibility
 */

(function() {
  'use strict';

  // ============================================
  // MOBILE NAVIGATION
  // ============================================

  /**
   * Initialize mobile navigation toggle
   */
  function initMobileNav() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (!menuToggle || !mainNav) return;

    // Toggle menu on button click
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      mainNav.classList.toggle('active');
      updateMenuToggleAria();
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
        mainNav.classList.remove('active');
        updateMenuToggleAria();
      }
    });

    // Close menu when pressing Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
        updateMenuToggleAria();
        menuToggle.focus();
      }
    });

    // Close menu after clicking a nav link
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        mainNav.classList.remove('active');
        updateMenuToggleAria();
      });
    });

    // Update ARIA attributes for accessibility
    function updateMenuToggleAria() {
      const isExpanded = mainNav.classList.contains('active');
      menuToggle.setAttribute('aria-expanded', isExpanded);
      menuToggle.setAttribute('aria-label', isExpanded ? 'Close menu' : 'Open menu');
    }

    // Initialize ARIA attributes
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
    menuToggle.setAttribute('aria-controls', 'main-navigation');
    mainNav.setAttribute('id', 'main-navigation');
  }

  // ============================================
  // ACTIVE NAVIGATION HIGHLIGHTING
  // ============================================

  /**
   * Highlight the current page in navigation
   */
  function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.main-nav a');

    navLinks.forEach(link => {
      const linkPath = new URL(link.href).pathname;

      // Check if current page matches link
      if (currentPath === linkPath ||
          (currentPath === '/' && linkPath.includes('index.html')) ||
          (currentPath.includes('index.html') && linkPath === '/')) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  // ============================================
  // SMOOTH SCROLLING
  // ============================================

  /**
   * Enhance smooth scrolling for anchor links
   */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');

        // Skip if it's just "#"
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          e.preventDefault();

          // Get header height for offset
          const header = document.querySelector('.site-header');
          const headerHeight = header ? header.offsetHeight : 0;

          // Calculate position with offset
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

          // Smooth scroll to target
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Update focus for accessibility
          targetElement.setAttribute('tabindex', '-1');
          targetElement.focus();
        }
      });
    });
  }

  // ============================================
  // FORM HANDLING
  // ============================================

  /**
   * Handle contact form submission
   */
  function initFormHandling() {
    const contactForm = document.querySelector('#contact-form');

    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);

      // Basic validation
      if (!validateForm(data)) {
        showMessage('Please fill in all required fields correctly.', 'error');
        return;
      }

      // In a real application, this would send data to a server
      // For now, we'll just show a success message
      console.log('Form data:', data);
      showMessage('Thank you for your message! We\'ll get back to you soon.', 'success');
      contactForm.reset();
    });
  }

  /**
   * Validate form data
   */
  function validateForm(data) {
    // Check required fields
    if (!data.name || !data.email || !data.message) {
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return false;
    }

    return true;
  }

  /**
   * Show form message to user
   */
  function showMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create and insert new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    messageDiv.setAttribute('role', type === 'error' ? 'alert' : 'status');
    messageDiv.setAttribute('aria-live', 'polite');

    const form = document.querySelector('#contact-form');
    if (form) {
      form.insertAdjacentElement('beforebegin', messageDiv);

      // Scroll to message
      messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      // Remove message after 5 seconds
      setTimeout(() => {
        messageDiv.style.opacity = '0';
        setTimeout(() => messageDiv.remove(), 300);
      }, 5000);
    }
  }

  // ============================================
  // GALLERY FUNCTIONALITY
  // ============================================

  /**
   * Initialize gallery interactions
   */
  function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (galleryItems.length === 0) return;

    galleryItems.forEach(item => {
      // Make gallery items keyboard accessible
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'button');

      // Handle click and keyboard events
      const handleActivation = function() {
        // In a real application, this would open a lightbox or modal
        console.log('Gallery item activated:', item.dataset.title || 'Untitled');
      };

      item.addEventListener('click', handleActivation);
      item.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleActivation();
        }
      });
    });
  }

  // ============================================
  // ACCESSIBILITY ENHANCEMENTS
  // ============================================

  /**
   * Add skip link functionality
   */
  function initSkipLink() {
    const skipLink = document.querySelector('.skip-link');
    const mainContent = document.querySelector('#main-content');

    if (skipLink && mainContent) {
      skipLink.addEventListener('click', function(e) {
        e.preventDefault();
        mainContent.setAttribute('tabindex', '-1');
        mainContent.focus();
      });
    }
  }

  /**
   * Announce page changes for screen readers
   */
  function announcePageLoad() {
    const pageTitle = document.querySelector('h1');
    if (pageTitle) {
      // Create live region for announcements
      const liveRegion = document.createElement('div');
      liveRegion.setAttribute('role', 'status');
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.className = 'visually-hidden';
      liveRegion.textContent = `Page loaded: ${pageTitle.textContent}`;
      document.body.appendChild(liveRegion);

      // Remove after announcement
      setTimeout(() => liveRegion.remove(), 1000);
    }
  }

  // ============================================
  // SCROLL EFFECTS
  // ============================================

  /**
   * Add shadow to header on scroll
   */
  function initHeaderScrollEffect() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;

      // Add/remove shadow based on scroll position
      if (currentScroll > 50) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.15)';
      } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
      }

      lastScroll = currentScroll;
    }, { passive: true });
  }

  // ============================================
  // LAZY LOADING IMAGES
  // ============================================

  /**
   * Set up lazy loading for images
   */
  function initLazyLoading() {
    // Check for Intersection Observer support
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.classList.add('loaded');
              observer.unobserve(img);
            }
          }
        });
      });

      // Observe all images with data-src attribute
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  // ============================================
  // INITIALIZATION
  // ============================================

  /**
   * Initialize all functionality when DOM is ready
   */
  function init() {
    initMobileNav();
    highlightCurrentPage();
    initSmoothScroll();
    initFormHandling();
    initGallery();
    initSkipLink();
    initHeaderScrollEffect();
    initLazyLoading();
    announcePageLoad();

    console.log('Islettes Twirl Team website initialized');
  }

  // Run initialization when DOM is fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
