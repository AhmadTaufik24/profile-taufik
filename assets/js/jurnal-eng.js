// File: assets/js/jurnal-eng.js (English Journal List Page)

document.addEventListener("DOMContentLoaded", () => {
    
    // -- PART 1: ESSENTIAL FUNCTIONS (NAVBAR, DARK MODE, HAMBURGER)

    const body = document.body;
    const modeToggle = document.getElementById("modeToggle");
    const langToggle = document.getElementById("langToggle");
    const hamburger = document.getElementById("hamburger");
    const mobileNav = document.getElementById("mobileNav");

    // --- Dark/Light Mode Logic ---
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

    // --- Language Toggle Logic ---
    if (langToggle) {
        const currentLang = document.documentElement.lang;
        if (currentLang === 'en') {
            langToggle.classList.add('active-right');
        } else {
            langToggle.classList.remove('active-right');
        }
        langToggle.addEventListener("click", () => {
            // Switch to the corresponding language page
            window.location.href = currentLang === "en" ? "jurnal.html" : "jurnal-eng.html";
        });
    }
    
    // --- Hamburger Menu Logic ---
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
    // === PART 2: SCROLL ANIMATION LOGIC (FOR ALL SECTIONS)
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

    
    //-- PART 3: LOGIC FOR THE JOURNAL PAGE
    
    // Check if journal data is available from 'jurnal-data-eng.js'
    if (typeof journals === 'undefined') {
        console.error('Journal data not found. Make sure journal-data-eng.js is loaded before this file.');
        return; // Stop execution if data is missing
    }

    // --- LOGIC FOR JOURNAL LIST PAGE (jurnal-eng.html) ---
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
                    <a href="jurnal-detail-eng.html?id=${journal.id}" class="journal-card animate-on-scroll">
                        <img src="${journal.thumbnail}" alt="Cover of ${journal.title}" class="card-thumbnail">
                        <div class="card-content">
                            <h3 class="card-title">${journal.title}</h3>
                            <p class="card-description">${journal.description}</p>
                            <span class="card-button">Read More</span>
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
                // Ensure category names match what's in your data file (e.g., 'Photography', 'Design')
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

        // Initial render of all journals
        renderJournals(journals);
    }
});