// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const panel = document.querySelector('.mobile-panel');
  if (hamburger && panel) {
    hamburger.addEventListener('click', () => {
      panel.classList.toggle('open');
    });
  }

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  // Count-up stats
  const stats = document.querySelectorAll('.stat .num[data-target]');
  if ('IntersectionObserver' in window && stats.length) {
    const statIO = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          statIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    stats.forEach(el => statIO.observe(el));
  } else {
    stats.forEach(el => animateCount(el));
  }

  function animateCount(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1200;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // Product category browser (product.html): sidebar filter + search
  const catNavBtns = document.querySelectorAll('.cat-nav button');
  const catTiles = document.querySelectorAll('.cat-tile');
  const searchInput = document.getElementById('cat-search');
  const resultCount = document.getElementById('result-count');
  let activeFilter = 'all';

  function applyFilters() {
    const query = (searchInput ? searchInput.value.trim().toLowerCase() : '');
    let visible = 0;
    catTiles.forEach(tile => {
      const matchesFilter = activeFilter === 'all' || tile.getAttribute('data-cat') === activeFilter;
      const matchesSearch = !query || tile.getAttribute('data-name').toLowerCase().includes(query);
      const show = matchesFilter && matchesSearch;
      tile.classList.toggle('hidden', !show);
      if (show) visible++;
    });
    if (resultCount) {
      resultCount.textContent = visible + (visible === 1 ? ' Category' : ' Categories');
    }
  }

  if (catNavBtns.length) {
    catNavBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        catNavBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.getAttribute('data-filter');
        applyFilters();
      });
    });
  }
  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  // Simple form handler (contact.html)
  const form = document.querySelector('.quote-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('#name').value.trim();
      const company = form.querySelector('#company').value.trim();
      const need = form.querySelector('#need').value.trim();
      const subject = `Quote Request — ${name}${company ? ' / ' + company : ''}`;
      const body = `Name: ${name}\nCompany: ${company}\n\nWhat's needed:\n${need}`;
      window.location.href = `mailto:sales@harrisea.net?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  // ==========================================
  // IMAGE MODAL (LIGHTBOX) FOR PRODUCT PAGE
  // ==========================================
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  const modalClose = document.querySelector(".modal-close");
  const productImages = document.querySelectorAll('.cat-tile .ph-image img');

  if (productImages.length && modal) {
    productImages.forEach(img => {
      img.style.cursor = 'pointer'; 
      img.addEventListener('click', () => {
        modal.style.display = "block";
        modalImg.src = img.src;
      });
    });
  }

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modal.style.display = "none";
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }

  // ==========================================
  // ACCORDION FAQ
  // ==========================================
  const faqQuestions = document.querySelectorAll('.faq-q');
  if (faqQuestions.length) {
    faqQuestions.forEach(q => {
      q.addEventListener('click', () => {
        const item = q.parentElement;
        // Close all other items
        document.querySelectorAll('.faq-item').forEach(otherItem => {
          if (otherItem !== item) otherItem.classList.remove('active');
        });
        // Toggle current item
        item.classList.toggle('active');
      });
    });
  }
});