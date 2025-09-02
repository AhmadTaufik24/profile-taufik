// File: assets/js/jurnal.js (Versi Perbaikan Final)

document.addEventListener("DOMContentLoaded", () => {
    

    // -- BAGIAN 1: FUNGSI ESENSIAL (NAVBAR, DARK MODE, HAMBURGER)

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
            // Sesuaikan dengan nama file halaman bahasa Inggris Anda
            window.location.href = currentLang === "id" ? "jurnal-eng.html" : "jurnal.html";
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

   
    //--BAGIAN 3: LOGIKA UNTUK HALAMAN JURNAL
    
   
    if (typeof journals === 'undefined') {
        console.error('Data jurnal tidak ditemukan. Pastikan file jurnal-data.js sudah dimuat sebelum file ini.');
        return; // Hentikan eksekusi jika data tidak ada
    }

    // --- LOGIKA UNTUK HALAMAN DAFTAR JURNAL (jurnal.html) ---
    const journalGrid = document.getElementById('journal-grid');
    if (journalGrid) {
        const searchBar = document.getElementById('search-bar');
        const categoryFilters = document.getElementById('category-filters');
        const noResultsMessage = document.getElementById('no-results');

        const renderJournals = (journalList) => {
            journalGrid.innerHTML = '';
            noResultsMessage.style.display = journalList.length === 0 ? 'block' : 'none';
            
            journalList.forEach(journal => {
                const journalCard = `
                    <a href="jurnal-detail.html?id=${journal.id}" class="journal-card animate-on-scroll">
                        <img src="${journal.thumbnail}" alt="Cover ${journal.title}" class="card-thumbnail">
                        <div class="card-content">
                            <h3 class="card-title">${journal.title}</h3>
                            <p class="card-description">${journal.description}</p>
                            <span class="card-button">Baca Selengkapnya</span>
                        </div>
                    </a>
                `;
                journalGrid.innerHTML += journalCard;
            });
        };

        const filterAndSearch = () => {
            const searchTerm = searchBar.value.toLowerCase();
            const activeCategory = categoryFilters.querySelector('.active').dataset.category;
            let filteredJournals = journals;

            if (activeCategory !== 'all') {
                filteredJournals = filteredJournals.filter(j => j.category === activeCategory);
            }
            if (searchTerm) {
                filteredJournals = filteredJournals.filter(j => 
                    j.title.toLowerCase().includes(searchTerm) ||
                    j.author.toLowerCase().includes(searchTerm)
                );
            }
            renderJournals(filteredJournals);
        };

        searchBar.addEventListener('input', filterAndSearch);
        categoryFilters.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                categoryFilters.querySelector('.active').classList.remove('active');
                e.target.classList.add('active');
                filterAndSearch();
            }
        });

        renderJournals(journals);
    }

    // --- LOGIKA UNTUK HALAMAN DETAIL JURNAL (jurnal-detail.html) ---
    const journalContentArea = document.getElementById('journal-content-area');
    if (journalContentArea) {
        const params = new URLSearchParams(window.location.search);
        const journalId = params.get('id');
        const journal = journals.find(j => j.id === journalId);
        
        const notFoundDiv = document.getElementById('journal-not-found');

        if (journal) {
            document.title = `${journal.title} - Jurnal`;
            const journalHTML = `
                <h1 class="journal-detail-title">${journal.title}</h1>
                <p class="journal-meta">Oleh <strong>${journal.author}</strong> pada <strong>${journal.date}</strong></p>
                <img src="${journal.thumbnail}" alt="Cover ${journal.title}" class="journal-detail-image">
                <div class="journal-full-content">
                    ${journal.content}
                </div>
            `;
            journalContentArea.innerHTML = journalHTML;

            const pageUrl = window.location.href;
            const shareText = `Baca artikel menarik: ${journal.title}`;
            document.getElementById('share-fb').href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
            document.getElementById('share-wa').href = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + pageUrl)}`;
            document.getElementById('share-tw').href = `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(shareText)}`;
        } else {
            journalContentArea.style.display = 'none';
            document.querySelector('.share-section').style.display = 'none';
            notFoundDiv.style.display = 'block';
        }
    }
}); // <-- HANYA ADA SATU KURUNG PENUTUP DI AKHIR