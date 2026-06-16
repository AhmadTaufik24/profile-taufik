:root {
    /* Warna Biru Utama */
    --brand-blue: #4B739B; 
    --brand-blue-hover: #3A5A7A;
    --brand-blue-light: #EBF1F6;
    
    --bg-color: #F8FAFC;
    --text-main: #1E293B;
    --text-muted: #64748B;
    --card-bg: #FFFFFF;
    --border: #E2E8F0;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

html, body {
    width: 100%;
    overflow-x: hidden;
}

body {
    font-family: 'Inter', sans-serif;
    background-color: var(--bg-color);
    color: var(--text-main);
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
}

.pricelist-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 40px 20px;
}

/* =========================================
   HEADER TEXT
   ========================================= */
.pricelist-header {
    text-align: center;
    margin-bottom: 35px;
}
.pricelist-header h1 {
    font-size: 2.4rem;
    font-weight: 800;
    color: var(--brand-blue);
    margin-bottom: 12px;
    letter-spacing: -0.5px;
    line-height: 1.2;
}
.pricelist-header p {
    color: var(--text-muted);
    font-size: 1rem;
    max-width: 550px;
    margin: 0 auto;
    line-height: 1.6;
}

/* =========================================
   TAB NAVIGASI
   ========================================= */
.tab-navigation {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-bottom: 30px;
    flex-wrap: wrap;
}
.tab-btn {
    padding: 10px 22px;
    background: transparent;
    border: 1px solid var(--border);
    border-radius: 30px;
    cursor: pointer;
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--text-muted);
    transition: all 0.3s ease;
}
.tab-btn:hover { 
    border-color: var(--brand-blue); 
    color: var(--brand-blue); 
}
.tab-btn.active {
    background: var(--brand-blue);
    color: #fff;
    border-color: var(--brand-blue);
}

/* =========================================
   KONTEN KATEGORI & BANNER (FIXED VIEWPORT)
   ========================================= */
.category-content { display: none; animation: fadeIn 0.4s ease; }
.category-content.active { display: block; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

.category-banner {
    position: relative;
    width: 100%;
    height: 220px;
    border-radius: 16px;
    overflow: hidden;
    margin-bottom: 30px;
    box-shadow: 0 8px 20px rgba(75, 115, 155, 0.1);
}
.category-banner img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.banner-overlay {
    position: absolute;
    inset: 0;
    /* Gradasi gelap di bawah agar tulisan judul putih kontras terkesan premium */
    background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%);
}

/* FIX JUDUL: Dikunci di kiri bawah secara independen */
.banner-overlay h2 {
    position: absolute;
    left: 24px;
    bottom: 24px;
    color: #fff;
    font-size: 1.8rem;
    font-weight: 700;
    text-shadow: 0 2px 4px rgba(0,0,0,0.4);
    margin: 0;
}

/* FIX TOMBOL: Dikunci di kanan atas bergaya aksi overlay panel modern */
.share-btn {
    position: absolute;
    top: 24px;
    right: 24px;
    background: rgba(255,255,255,0.25);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.6);
    color: #fff;
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;
}
.share-btn:hover { background: #fff; color: var(--brand-blue); }

/* =========================================
   PRICING GRID & CARD
   ========================================= */
.pricing-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
}

.pricing-card {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 30px;
    position: relative;
    display: flex;
    flex-direction: column;
    box-shadow: 0 6px 15px rgba(0,0,0,0.03);
}
.pricing-card.popular {
    border: 2px solid var(--brand-blue);
    background: var(--brand-blue-light);
}
.badge {
    position: absolute;
    top: -12px; left: 50%; transform: translateX(-50%);
    background: var(--brand-blue);
    color: white;
    padding: 6px 18px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    white-space: nowrap;
    box-shadow: 0 4px 8px rgba(75, 115, 155, 0.2);
}

.pricing-card h3 { font-size: 1.3rem; color: var(--text-muted); margin-bottom: 5px; font-weight: 600; }
.popular h3 { color: var(--brand-blue); }
.price { font-size: 2.2rem; font-weight: 800; color: var(--text-main); margin-bottom: 12px; letter-spacing: -0.5px; }
.description { font-size: 0.95rem; color: var(--text-muted); margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid var(--border); line-height: 1.6; }
.popular .description { border-color: rgba(75, 115, 155, 0.2); }

.benefits { list-style: none; margin-bottom: 30px; flex-grow: 1; }
.benefits li { font-size: 0.95rem; margin-bottom: 14px; display: flex; align-items: flex-start; gap: 12px; color: var(--text-main); }
.benefits i { color: var(--brand-blue); margin-top: 4px; font-size: 0.9rem; }
.benefits li.highlight { font-weight: 700; color: var(--brand-blue); }
.benefits li.highlight i { color: #F59E0B; } 

.book-btn {
    display: block; text-align: center; width: 100%; padding: 14px;
    border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 1rem;
    border: 1px solid var(--brand-blue); color: var(--brand-blue);
    transition: all 0.3s;
}
.book-btn:hover { background: var(--brand-blue); color: #fff; }
.book-btn.primary { background: var(--brand-blue); color: #fff; }
.book-btn.primary:hover { background: var(--brand-blue-hover); }

/* =========================================
   PRICING TERMS / NOTE BOX
   ========================================= */
.pricing-terms {
    margin-top: 25px;
    padding: 16px 20px;
    background-color: var(--brand-blue-light);
    border: 1px solid rgba(75, 115, 155, 0.2);
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 12px;
    color: var(--brand-blue-hover);
}

.pricing-terms i {
    font-size: 1.2rem;
    color: var(--brand-blue);
}

.pricing-terms p {
    font-size: 0.95rem;
    font-weight: 500;
    line-height: 1.5;
}
.pricing-terms p strong {
    font-weight: 700;
    color: var(--brand-blue);
}

/* Toast Notifikasi */
.toast {
    position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%) translateY(100px);
    background: var(--text-main); color: #fff; padding: 12px 24px; border-radius: 30px;
    font-size: 0.95rem; font-weight: 500; display: flex; align-items: center; gap: 10px;
    opacity: 0; transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55); z-index: 1000;
    white-space: nowrap;
    box-shadow: 0 8px 20px rgba(0,0,0,0.2);
}
.toast.show { transform: translateX(-50%) translateY(0); opacity: 1; }

/* =========================================
   RESPONSIVITAS KHUSUS HP (BALANCED + FIXED POSITION)
   ========================================= */
@media (max-width: 600px) {
    .pricelist-container { 
        padding: 30px 20px 50px; 
    }
    
    .pricelist-header { margin-bottom: 25px; }
    .pricelist-header h1 { font-size: 1.8rem; margin-bottom: 10px; }
    .pricelist-header p { font-size: 0.95rem; line-height: 1.6; }

    /* Tab Navigasi - FIXED & CENTERED */
    .tab-navigation {
        flex-wrap: wrap; 
        overflow-x: visible; 
        justify-content: center; 
        padding-bottom: 0;
        margin-bottom: 25px;
        gap: 8px; 
    }
    .tab-btn {
        flex: 0 1 auto; 
        font-size: 0.85rem; 
        padding: 8px 14px;
    }

    /* Dimensi Banner di HP */
    .category-banner { 
        height: 160px; 
        border-radius: 12px;
        margin-bottom: 25px;
    }
    
    /* Atur ulang posisi absolut di resolusi HP */
    .banner-overlay h2 { 
        font-size: 1.4rem; 
        left: 16px;
        bottom: 16px;
    }
    .share-btn {
        top: 16px;
        right: 16px;
        padding: 6px 12px;
        font-size: 0.8rem;
        border-radius: 6px;
    }

    .pricing-grid { 
        grid-template-columns: 1fr; 
        gap: 24px; 
    }
    
    .pricing-card {
        padding: 30px 24px; 
        border-radius: 12px;
    }
    .badge { top: -14px; padding: 5px 16px; font-size: 0.75rem; }

    .pricing-card h3 { font-size: 1.25rem; margin-bottom: 6px; }
    .price { font-size: 2rem; margin-bottom: 10px; } 
    .description {
        font-size: 0.95rem; 
        margin-bottom: 20px;
        padding-bottom: 20px;
        line-height: 1.5;
    }

    .benefits { margin-bottom: 25px; }
    .benefits li {
        font-size: 0.95rem; 
        margin-bottom: 14px;
        gap: 12px;
    }
    .benefits i { font-size: 0.9rem; margin-top: 4px; }

    .book-btn {
        padding: 14px;
        font-size: 1rem; 
        border-radius: 8px;
        margin-top: 10px;
    }

    .pricing-terms {
        margin-top: 25px;
        padding: 16px;
        border-radius: 10px;
        align-items: flex-start;
    }
    .pricing-terms i { font-size: 1.1rem; margin-top: 3px; }
    .pricing-terms p { font-size: 0.9rem; }
    
    .toast {
        width: 90%;
        justify-content: center;
        padding: 14px 20px;
        font-size: 0.95rem;
        bottom: 20px;
    }
}
