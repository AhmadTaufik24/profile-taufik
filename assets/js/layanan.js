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
            window.location.href = currentLang === "id" ? "layanan-eng.html" : "layanan.html";
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

    // === BAGIAN 2: LOGIKA ANIMASI SCROLL (UNTUK SEMUA SECTION)

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
// Saat ini tidak ada JavaScript yang dibutuhkan untuk fungsionalitas khusus di halaman kontak.
// Animasi scroll bisa ditambahkan jika perlu dengan menyalin kode 'animationObserver' dari about.js
console.log("Halaman Kontak Berhasil Dimuat");




}); // <-- Kurung tutup akhir dari DOMContentLoaded