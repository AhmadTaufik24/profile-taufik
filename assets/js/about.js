document.addEventListener("DOMContentLoaded", () => {
    
    // ===================================================================
    // === BAGIAN 1: FUNGSI ESENSIAL (NAVBAR, DARK MODE, HAMBURGER)
    // ===================================================================
    const body = document.body;
    const modeToggle = document.getElementById("modeToggle");
    const langToggle = document.getElementById("langToggle");
    const hamburger = document.getElementById("hamburger");
    const mobileNav = document.getElementById("mobileNav");

    // --- Logika Dark/Light Mode ---
    if (modeToggle) {
        function applyTheme(theme) {
            if (theme === "dark") {
                body.classList.add("dark-mode");
                modeToggle.classList.add("active-right");
            } else {
                body.classList.remove("dark-mode");
                modeToggle.classList.remove("active-right");
            }
        }
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            applyTheme(savedTheme);
        } else {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            applyTheme(prefersDark ? "dark" : "light");
        }
        modeToggle.addEventListener("click", () => {
            const isDarkMode = body.classList.toggle("dark-mode");
            modeToggle.classList.toggle("active-right");
            localStorage.setItem("theme", isDarkMode ? "dark" : "light");
        });
    }

    // --- Logika Language Toggle ---
    if (langToggle) {
        const currentLang = document.documentElement.lang;
        if (currentLang === 'en') {
            langToggle.classList.add('active-right');
        } else {
            langToggle.classList.remove('active-right');
        }
        langToggle.addEventListener("click", () => {
            window.location.href = currentLang === "id" ? "about-eng.html" : "about.html";
        });
    }
    
    // --- Logika Hamburger Menu ---
    if (hamburger && mobileNav) {
        function closeMobileMenu() {
            hamburger.classList.remove("active");
            mobileNav.classList.remove("show");
        }
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            mobileNav.classList.toggle("show");
        });
        document.addEventListener("click", (e) => {
            if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }

    // ===================================================================
    // === BAGIAN 2: LOGIKA ANIMASI SCROLL (UNTUK SEMUA SECTION)
    // ===================================================================
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            } else {
                entry.target.classList.remove('in-view');
            }
        });
    }, { 
        threshold: 0.2 
    });
    
    document.querySelectorAll('.animate-zoom-in, .animate-slide-up, .animate-on-scroll').forEach(el => {
        if(el) {
            animationObserver.observe(el);
        }
    });

    // ===================================================================
    // === BAGIAN 3: LOGIKA UNTUK POP-UP KEAHLIAN LAINNYA
    // ===================================================================
    const showMoreButton = document.getElementById("show-more-tools");
    const popover = document.getElementById("more-tools-popover");
    
    if (showMoreButton && popover) {
        const closeButton = popover.querySelector('.close-popover');

        showMoreButton.addEventListener("click", (event) => {
            event.stopPropagation();
            const btnRect = showMoreButton.getBoundingClientRect();
            const containerRect = showMoreButton.closest('.skills-showcase-card').getBoundingClientRect();
            let topPosition = (btnRect.top - containerRect.top) - popover.offsetHeight - 10;
            let leftPosition = (btnRect.left - containerRect.left) + (btnRect.width / 2) - (popover.offsetWidth / 2);
            if (leftPosition < 0) leftPosition = 5;
            if ((leftPosition + popover.offsetWidth) > containerRect.width) leftPosition = containerRect.width - popover.offsetWidth - 5;
            popover.style.top = topPosition + 'px';
            popover.style.left = leftPosition + 'px';
            popover.classList.toggle("show");
        });

        if (closeButton) {
            closeButton.addEventListener("click", () => {
                popover.classList.remove("show");
            });
        }

        document.addEventListener("click", (event) => {
            if (popover.classList.contains('show') && !popover.contains(event.target) && !showMoreButton.contains(event.target)) {
                popover.classList.remove("show");
            }
        });
    }

    // ===================================================================
    // === BAGIAN 4: LOGIKA BARU UNTUK GALERI MASONRY GRID & OVERLAY
    // ===================================================================
    const galleryItems = document.querySelectorAll('.grid-item'); // <-- KEMBALI MENGGUNAKAN .grid-item
    const overlay = document.getElementById('galleryOverlay');
    const overlayClose = document.getElementById('galleryClose');
    const overlayTitle = document.getElementById('overlayTitle');
    const overlayStory = document.getElementById('overlayStory');
    const swiperWrapper = document.getElementById('overlaySwiperWrapper');
    let overlaySwiper = null;

    if (galleryItems.length > 0 && overlay) {
        
        function openOverlay(item) {
            const title = item.dataset.title || '';
            const story = item.dataset.story || '';
            const images = item.dataset.images.split(',');

            overlayTitle.textContent = title;
            overlayStory.textContent = story;

            swiperWrapper.innerHTML = ''; 
            images.forEach(imgUrl => {
                const newSlide = document.createElement('div');
                newSlide.className = 'swiper-slide';
                newSlide.innerHTML = `<img src="${imgUrl.trim()}" alt="${title}">`;
                swiperWrapper.appendChild(newSlide);
            });
            
            overlay.classList.add('is-visible');
            document.body.style.overflow = 'hidden';

            // Inisialisasi atau update Swiper DI DALAM overlay
            if (overlaySwiper) {
                overlaySwiper.update();
            } else {
                overlaySwiper = new Swiper('#overlaySwiper', {
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    loop: true,
                });
            }
        }

        function closeOverlay() {
            overlay.classList.remove('is-visible');
            document.body.style.overflow = 'auto';
        }

        galleryItems.forEach(item => {
            item.addEventListener('click', () => openOverlay(item));
        });

        overlayClose.addEventListener('click', closeOverlay);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && overlay.classList.contains('is-visible')) {
                closeOverlay();
            }
        });
    }

}); // <-- Kurung tutup akhir dari DOMContentLoaded