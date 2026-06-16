document.addEventListener('DOMContentLoaded', () => {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const categoryContents = document.querySelectorAll('.category-content');
    const tabNavContainer = document.getElementById('tabNav');
    const shareBtns = document.querySelectorAll('.share-btn');
    
    // 1. CEK URL UNTUK MODE "KLIEN"
    // Mengecek apakah di URL ada parameter ?share=namapaket
    const urlParams = new URLSearchParams(window.location.search);
    const sharedCategory = urlParams.get('share');

    if (sharedCategory) {
        // --- MODE KLIEN AKTIF ---
        
        // Sembunyikan navigasi tab (klien tidak bisa pindah paket)
        if (tabNavContainer) tabNavContainer.style.display = 'none';
        
        // Teks header "Investment & Packages" dan teks santai lu SEKARANG TETAP TAMPIL.
        // (Kode yang sebelumnya menyembunyikan header sudah dihapus)

        // Sembunyikan tombol share (klien tidak butuh fitur copy link)
        shareBtns.forEach(btn => btn.style.display = 'none');

        // Sembunyikan semua konten, lalu TAMPILKAN HANYA yang di-share
        categoryContents.forEach(content => {
            if (content.id === sharedCategory) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
                content.style.display = 'none'; // Pastikan benar-benar hilang
            }
        });
    } else {
        // --- MODE NORMAL (UNTUK ANDA) ---
        // Fungsi Tab standar
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.getAttribute('data-target');
                
                tabBtns.forEach(b => b.classList.remove('active'));
                categoryContents.forEach(c => c.classList.remove('active'));
                
                btn.classList.add('active');
                document.getElementById(targetId).classList.add('active');
            });
        });
    }
});

// 2. FUNGSI SHARE (Copy Link Khusus Klien)
function sharePackage(categoryId) {
    // Membuat URL khusus dengan parameter ?share=...
    // Mengambil URL asli tanpa query parameter yang mungkin sudah ada
    const baseUrl = window.location.origin + window.location.pathname;
    const clientUrl = `${baseUrl}?share=${categoryId}`;

    // Eksekusi copy ke clipboard
    navigator.clipboard.writeText(clientUrl).then(() => {
        const toast = document.getElementById('toast');
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }).catch(err => {
        console.error('Gagal menyalin teks: ', err);
        alert('Gagal menyalin link. Silakan copy URL secara manual.');
    });
}
