// KONFIGURASI
const ITEMS_PER_PAGE = 15; // 15 Foto per halaman

// State Halaman
let state = {
    studio: { page: 1, filter: 'all' },
    outdoor: { page: 1, filter: 'all' }
};

document.addEventListener('DOMContentLoaded', () => {
    renderGallery('studio');
    renderGallery('outdoor');
    setupLightbox();
});

// GANTI TAB
function openPhotoTab(tabName) {
    document.querySelectorAll('.photo-panel').forEach(p => p.style.display = 'none');
    document.querySelectorAll('.photo-tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('panel-' + tabName).style.display = 'block';
    
    // Cari tombol dan aktifkan
    const tabs = document.querySelectorAll('.photo-tab-btn');
    tabs.forEach(t => {
        if(t.innerText.toLowerCase() === tabName) t.classList.add('active');
    });
}

// FILTER
function setFilter(btn, filterName) {
    const panelId = btn.closest('.photo-panel').id.replace('panel-', '');
    state[panelId].filter = filterName;
    state[panelId].page = 1;

    // UI Tombol
    btn.parentElement.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    renderGallery(panelId);
}

// PAGINATION
function changePage(panelId, direction) {
    state[panelId].page += direction;
    renderGallery(panelId);
    // Scroll balik ke atas grid
    const grid = document.getElementById('grid-' + panelId);
    window.scrollTo({ top: grid.offsetTop - 150, behavior: 'smooth' });
}

// RENDER & HITUNG FOTO
function renderGallery(panelId) {
    const grid = document.getElementById('grid-' + panelId);
    const items = grid.querySelectorAll('.photo-item');
    const currentFilter = state[panelId].filter;
    
    // 1. Filter Item
    let visibleItems = [];
    items.forEach(item => {
        if(currentFilter === 'all' || item.getAttribute('data-cat') === currentFilter) {
            visibleItems.push(item);
        } else {
            item.style.display = 'none';
        }
    });

    // 2. Hitung Halaman
    const totalItems = visibleItems.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    if (state[panelId].page < 1) state[panelId].page = 1;
    if (state[panelId].page > totalPages && totalPages > 0) state[panelId].page = totalPages;
    
    // 3. Tampilkan Sesuai Page
    const start = (state[panelId].page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    visibleItems.forEach((item, index) => {
        if (index >= start && index < end) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });

    // 4. Update Tombol Next/Prev
    const controls = document.getElementById('pagination-' + panelId);
    const prevBtn = controls.querySelector('.prev-btn');
    const nextBtn = controls.querySelector('.next-btn');
    const pageInfo = controls.querySelector('.page-info');

    if (totalItems > ITEMS_PER_PAGE) {
        controls.style.display = 'flex';
        pageInfo.innerText = `Page ${state[panelId].page} of ${totalPages}`;
        prevBtn.disabled = (state[panelId].page === 1);
        nextBtn.disabled = (state[panelId].page === totalPages);
    } else {
        controls.style.display = 'none';
    }
}

// LIGHTBOX
function setupLightbox() {
    const lightbox = document.getElementById('photo-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');

    document.addEventListener('click', (e) => {
        const item = e.target.closest('.photo-item');
        if (item) {
            const img = item.querySelector('img');
            lightboxImg.src = img.src;
            lightbox.classList.add('show');
        }
    });

    closeBtn.onclick = () => lightbox.classList.remove('show');
    lightbox.onclick = (e) => {
        if (e.target === lightbox) lightbox.classList.remove('show');
    }
}
/* ========================================= */
/* ===    LOGIC RETOUCH (ANTI-MACET)     === */
/* ========================================= */

let currentRetouchIdx = 0;
let isDragging = false;

document.addEventListener('DOMContentLoaded', () => {
    initRetouchSystem();
});

function initRetouchSystem() {
    const sliderArea = document.getElementById('ba-slider-area');
    const containerAfter = document.getElementById('container-after');
    const handle = document.getElementById('slider-handle');

    // Cek elemen agar tidak error
    if (!sliderArea || !containerAfter || !handle) return;

    // FUNGSI GESER UNIVERSAL
    const move = (clientX) => {
        const rect = sliderArea.getBoundingClientRect();
        let posX = clientX - rect.left;

        // Batas kiri & kanan
        if (posX < 0) posX = 0;
        if (posX > rect.width) posX = rect.width;

        // Update CSS
        containerAfter.style.width = posX + "px";
        handle.style.left = posX + "px";
    };

    // --- MOUSE EVENTS (PC) ---
    sliderArea.addEventListener('mousedown', (e) => {
        isDragging = true;
        move(e.clientX);
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault(); // Mencegah blok teks
        move(e.clientX);
    });

    // --- TOUCH EVENTS (HP) ---
    sliderArea.addEventListener('touchstart', (e) => {
        isDragging = true;
        move(e.touches[0].clientX);
    }, { passive: false });

    window.addEventListener('touchend', () => {
        isDragging = false;
    });

    window.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        // e.preventDefault(); // Un-comment ini jika mau matikan scroll layar saat geser
        move(e.touches[0].clientX);
    }, { passive: false });
}

// FUNGSI GANTI FOTO VIA THUMBNAIL
function selectRetouch(index) {
    const thumbs = document.querySelectorAll('.thumb-item');
    const imgBefore = document.getElementById('img-before');
    const imgAfter = document.getElementById('img-after');
    const containerAfter = document.getElementById('container-after');
    const handle = document.getElementById('slider-handle');

    if (index < 0 || index >= thumbs.length) return;
    currentRetouchIdx = index;

    const selected = thumbs[index];
    const srcBefore = selected.getAttribute('data-before');
    const srcAfter = selected.getAttribute('data-after');

    // Efek Ganti
    imgBefore.style.opacity = '0.5';
    imgAfter.style.opacity = '0.5';

    setTimeout(() => {
        imgBefore.src = srcBefore;
        imgAfter.src = srcAfter;
        
        // Reset Posisi Tengah
        containerAfter.style.width = "50%";
        handle.style.left = "50%";

        imgBefore.style.opacity = '1';
        imgAfter.style.opacity = '1';
    }, 200);

    // Update Thumbnail
    thumbs.forEach(t => t.classList.remove('active'));
    selected.classList.add('active');

    // Auto Scroll Thumbnail
    selected.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

    // Update Tombol Navigasi
    document.getElementById('btn-prev-retouch').disabled = (index === 0);
    document.getElementById('btn-next-retouch').disabled = (index === thumbs.length - 1);
}

// FUNGSI TOMBOL NAVIGASI
function changeRetouchSlide(step) {
    selectRetouch(currentRetouchIdx + step);
}

// FUNGSI FULLSCREEN
function toggleRetouchFullscreen() {
    const wrapper = document.getElementById('retouch-viewer');
    const icon = document.getElementById('icon-expand');
    const body = document.body;

    wrapper.classList.toggle('fullscreen-active');
    const isFullscreen = wrapper.classList.contains('fullscreen-active');

    if (isFullscreen) {
        icon.classList.remove('fa-expand');
        icon.classList.add('fa-compress');
        body.style.overflow = 'hidden';
    } else {
        icon.classList.remove('fa-compress');
        icon.classList.add('fa-expand');
        body.style.overflow = 'auto';
    }
}
