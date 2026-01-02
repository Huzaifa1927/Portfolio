  const themeToggle = document.getElementById("theme-toggle");
    const sunIcon = document.getElementById("sun-icon");
    const moonIcon = document.getElementById("moon-icon");
    const menuLinks = document.querySelectorAll(".menu-link"); // Add class "menu-link" to all center menu <a>

    // Load saved theme
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
      sunIcon.classList.add("hidden");
      moonIcon.classList.remove("hidden");
      updateMenuHover("dark");
    } else {
      updateMenuHover("light");
    }

    // Function to update menu hover colors
    function updateMenuHover(mode) {
      if (mode === "dark") {
        menuLinks.forEach(link => {
          link.style.color = "#aaa"; // normal gray in dark
          link.onmouseover = () => link.style.color = "white";
          link.onmouseout = () => link.style.color = "#aaa";
        });
      } else {
        menuLinks.forEach(link => {
          link.style.color = "#555"; // normal gray in light
          link.onmouseover = () => link.style.color = "black";
          link.onmouseout = () => link.style.color = "#555";
        });
      }
    }

    // Toggle theme on button click
    themeToggle.addEventListener("click", () => {
      document.documentElement.classList.toggle("dark");

      if (document.documentElement.classList.contains("dark")) {
        sunIcon.classList.add("hidden");
        moonIcon.classList.remove("hidden");
        localStorage.setItem("theme", "dark");
        updateMenuHover("dark");
      } else {
        sunIcon.classList.remove("hidden");
        moonIcon.classList.add("hidden");
        localStorage.setItem("theme", "light");
        updateMenuHover("light");
      }
    });

    // Project
    const modal = document.getElementById('project-modal');
    const modalImg = document.getElementById('modal-img');
    const closeModal = document.getElementById('close-modal');
    const nextBtn = document.getElementById('next');
    const prevBtn = document.getElementById('prev');

    const projects = Array.from(document.querySelectorAll('.project-img'));
    let currentIndex = 0;
    let zoomed = false;

    // Disable right-click saving on all images
    projects.forEach(img => {
      img.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        alert("Image saving is disabled.");
      });
    });

    modalImg.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      alert("Image saving is disabled.");
    });

    // Open modal for a given index
    function openModal(index) {
      currentIndex = index;
      modalImg.src = projects[currentIndex].src;
      zoomed = false;
      modalImg.classList.remove('scale-150');
      modal.classList.remove('hidden');
    }

    // Click image
    projects.forEach((img, index) => {
      img.addEventListener('click', () => openModal(index));
    });

    // Click "View Details" button
    document.querySelectorAll('.view-details').forEach((btn) => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.getAttribute('data-index'));
        openModal(index);
      });
    });

    // Zoom on modal image
    modalImg.addEventListener('click', () => {
      zoomed = !zoomed;
      modalImg.classList.toggle('scale-150', zoomed);
    });

    // Navigation
    function showNext() {
      currentIndex = (currentIndex + 1) % projects.length;
      openModal(currentIndex);
    }
    function showPrev() {
      currentIndex = (currentIndex - 1 + projects.length) % projects.length;
      openModal(currentIndex);
    }

    // Buttons
    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });
    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
    closeModal.addEventListener('click', () => modal.classList.add('hidden'));
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.add('hidden'); });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('hidden')) {
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'Escape') modal.classList.add('hidden');
      }
    });

    document.getElementById("contact-form").addEventListener("submit", function(e) {
      e.preventDefault(); // Stop default form reload

      const form = e.target;
      const data = new FormData(form);

      // Netlify requires data in urlencoded format
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data).toString()
      })
      .then(() => {
        document.getElementById("form-success").classList.remove("hidden");
        document.getElementById("form-error").classList.add("hidden");
        form.reset();
      })
      .catch(() => {
        document.getElementById("form-error").classList.remove("hidden");
        document.getElementById("form-success").classList.add("hidden");
      });
    });
