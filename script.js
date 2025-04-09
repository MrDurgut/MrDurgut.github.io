// AOS başlatma
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Mobil menü için
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Menü linklerine tıklandığında menüyü kapat
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Dark mode için
const themeToggle = document.querySelector('.theme-toggle');
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');
const root = document.documentElement;

// Sayfa yüklendiğinde localStorage'dan tema tercihini al
if (localStorage.getItem('theme') === 'dark') {
    root.setAttribute('data-theme', 'dark');
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
} else {
    root.setAttribute('data-theme', 'light');
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
}

// Particle.js Config güncelleme fonksiyonu
function updateParticlesConfig(theme) {
    const color = theme === 'dark' ? '#ffffff' : '#6C63FF';
    const lineColor = theme === 'dark' ? '#ffffff' : '#6C63FF';
    
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: color },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: lineColor,
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 6,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: 'repulse' },
                onclick: { enable: true, mode: 'push' },
                resize: true
            }
        },
        retina_detect: true
    });
}

// Theme toggle event listener'ını güncelleyelim
themeToggle.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // İkonları değiştir
    if (newTheme === 'dark') {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    } else {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    }

    // Particles'ı güncelle
    updateParticlesConfig(newTheme);
    
    // Ayı modelinin ışıklandırmasını güncelle
    updateBearLighting(newTheme);
});

// Ayı modelinin ışıklandırmasını güncelleyen fonksiyon
function updateBearLighting(theme) {
    const scene = window.bearScene; // Global scene referansı
    if (!scene) return;

    // Eski ışıkları temizle
    scene.children.forEach(child => {
        if (child.isLight) scene.remove(child);
    });

    // Tema'ya göre ışıklandırma ayarla
    const ambientIntensity = theme === 'dark' ? 1.0 : 1.5;
    const directionalIntensity = theme === 'dark' ? 1.5 : 2.0;
    const frontIntensity = theme === 'dark' ? 1.0 : 1.5;

    const ambientLight = new THREE.AmbientLight(0xffffff, ambientIntensity);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, directionalIntensity);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const frontLight = new THREE.DirectionalLight(0xffffff, frontIntensity);
    frontLight.position.set(0, 0, 5);
    scene.add(frontLight);
}

// Portfolio filter
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// Loading screen'i kapat
window.addEventListener('load', () => {
    const loaderWrapper = document.querySelector('.loader-wrapper');
    setTimeout(() => {
        loaderWrapper.style.opacity = '0';
        setTimeout(() => {
            loaderWrapper.style.display = 'none';
        }, 500);
    }, 1000); // 1 saniye sonra kaybolacak
});

// Çeviriler için obje
const translations = {
    TR: {
        home: "Anasayfa",
        projects: "Projeler",
        technologies: "Teknolojiler",
        portfolyo: "Portfolyo",
        contact: "İletişim",
        welcomeText: "Full Stack Web Developer",
        exploreButton: "Bildiğim Teknolojiler",
        projectsTitle: "Projeler",
        technologiesTitle: "Teknolojiler",
        contactTitle: "İletişime Geç",
        // Form alanları
        name: "İsim",
        email: "E-posta",
        subject: "Konu",
        message: "Mesaj",
        send: "Gönder",
        // Footer
        about: "Hakkımda",
        quickLinks: "Hızlı Linkler",
        aboutText: "Bilgisayar Mühendisliği öğrencisiyim. Full-stack web geliştirme, mobil uygulama geliştirme ve oyun geliştirme alanlarında kendimi geliştiriyorum.",
        rights: "Tüm hakları saklıdır.",
        all: "Tümü",
        web: "Web",
        mobile: "Mobil",
        game: "Oyun",
        // Proje başlıkları
        timberCalc: "Kereste Fiyat Hesaplama",
        courierPos: "Kurye & POS",
        gameStore: "Game Store Simulator",
        dailyPlanner: "Günlük Planlayıcı",
        // Proje açıklamaları
        timberDesc: "Kereste firmaları için profesyonel yazılım çözümü",
        courierDesc: "Kurye takibi ve mobil POS entegrasyonu",
        gameStoreDesc: "Oyun mağazası işletme simülasyonu",
        plannerDesc: "Kişisel aktivite planlama uygulaması"
    },
    EN: {
        home: "Home",
        projects: "Projects",
        technologies: "Technologies",
        portfolyo: "Portfolio",
        contact: "Contact",
        welcomeText: "Full Stack Web Developer",
        exploreButton: "Technologies I Know",
        projectsTitle: "Projects",
        technologiesTitle: "Technologies",
        contactTitle: "Get in Touch",
        // Form fields
        name: "Name",
        email: "Email",
        subject: "Subject",
        message: "Message",
        send: "Send",
        // Footer
        about: "About",
        quickLinks: "Quick Links",
        aboutText: "I am a Computer Engineering student developing myself in full-stack web development, mobile app development, and game development.",
        rights: "All rights reserved.",
        all: "All",
        web: "Web",
        mobile: "Mobile",
        game: "Game",
        // Proje başlıkları
        timberCalc: "Timber Price Calculator",
        courierPos: "Courier & POS",
        gameStore: "Game Store Simulator",
        dailyPlanner: "Daily Planner",
        // Proje açıklamaları
        timberDesc: "Professional software solution for timber companies",
        courierDesc: "Courier tracking and mobile POS integration",
        gameStoreDesc: "Game store management simulation",
        plannerDesc: "Personal activity planning application"
    }
};

// Dil değiştirme için gereken elementleri seçelim
const langBtns = document.querySelectorAll('.lang-btn');

// Dil değiştirme fonksiyonunu güncelleyelim
function changeLanguage(lang) {
    // Proje başlıkları ve açıklamaları
    const projectTitles = {
        TR: ["Kereste Fiyat Hesaplama", "Kurye & POS", "Game Store Simulator", "Günlük Planlayıcı"],
        EN: ["Timber Price Calculator", "Courier & POS", "Game Store Simulator", "Daily Planner"]
    };

    const projectDescs = {
        TR: [
            "Kereste firmaları için geliştirilmiş, detaylı fiyat hesaplama ve analiz yapabilen profesyonel yazılım çözümü.",
            "Kurye takibi ve mobil POS özelliklerini birleştiren, işletmeler için entegre edilmiş modern çözüm.",
            "Oyun mağazası işletme deneyimini simüle eden, stratejik kararlar almanızı gerektiren eğlenceli bir simülasyon oyunu.",
            "Günlük aktivitelerinizi organize etmenize yardımcı olan, kullanıcı dostu ve özelleştirilebilir mobil uygulama."
        ],
        EN: [
            "A professional software solution developed for timber companies, capable of detailed price calculation and analysis.",
            "A modern integrated solution for businesses combining courier tracking and mobile POS features.",
            "An entertaining simulation game that simulates the game store management experience, requiring strategic decisions.",
            "A user-friendly and customizable mobile application to help you organize your daily activities."
        ]
    };

    // Navbar linkleri
    document.querySelector('a[href="#home"]').textContent = translations[lang].home;
    document.querySelector('a[href="#hedefler"]').textContent = translations[lang].projects;
    document.querySelector('a[href="#teknolojiler"]').textContent = translations[lang].technologies;
    document.querySelector('a[href="#portfolio"]').textContent = translations[lang].portfolyo;
    document.querySelector('a[href="#iletisim"]').textContent = translations[lang].contact;

    // Welcome section
    document.querySelector('.welcomeP').textContent = translations[lang].welcomeText;
    document.querySelector('.welcomeB').textContent = translations[lang].exploreButton;

    // Başlıklar
    document.querySelector('.projeler-header').textContent = translations[lang].projectsTitle;
    document.querySelector('.tech-header').textContent = translations[lang].technologiesTitle;
    document.querySelector('.contact-header').textContent = translations[lang].contactTitle;

    // Proje kartları
    const projectCards = document.querySelectorAll('.proje-card');
    projectCards.forEach((card, index) => {
        card.querySelector('.proje-title').textContent = projectTitles[lang][index];
        card.querySelector('.proje-desc').textContent = projectDescs[lang][index];
    });

    // Form
    document.querySelector('label[for="name"]').textContent = translations[lang].name;
    document.querySelector('label[for="email"]').textContent = translations[lang].email;
    document.querySelector('label[for="subject"]').textContent = translations[lang].subject;
    document.querySelector('label[for="message"]').textContent = translations[lang].message;
    document.querySelector('.submit-btn').textContent = translations[lang].send;

    // Footer
    document.querySelectorAll('.footer-section h3')[0].textContent = translations[lang].about;
    document.querySelectorAll('.footer-section h3')[1].textContent = translations[lang].quickLinks;
    document.querySelector('.footer-section p').textContent = translations[lang].aboutText;
    document.querySelector('.footer-bottom p').textContent = 
        `© ${new Date().getFullYear()} Enes Durgut. ${translations[lang].rights}`;

    // Skill grupları başlıkları
    const skillGroupTitles = {
        TR: ["Frontend", "Backend", "Mobil Geliştirme", "Veritabanı", "Oyun Geliştirme", "Genel"],
        EN: ["Frontend", "Backend", "Mobile Development", "Database", "Game Development", "General"]
    };

    document.querySelectorAll('.skill-group h3').forEach((title, index) => {
        if (skillGroupTitles[lang][index]) {
            title.textContent = skillGroupTitles[lang][index];
        }
    });

    // Portfolyo başlığı ve filtreleme butonları
    document.querySelector('.portfolio-header').textContent = translations[lang].portfolyo;
    document.querySelector('.filter-btn[data-filter="all"]').textContent = translations[lang].all;
    document.querySelector('.filter-btn[data-filter="web"]').textContent = translations[lang].web;
    document.querySelector('.filter-btn[data-filter="mobile"]').textContent = translations[lang].mobile;
    document.querySelector('.filter-btn[data-filter="game"]').textContent = translations[lang].game;

    // Portfolyo projeleri
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        const title = item.querySelector('h3');
        const desc = item.querySelector('p');
        
        switch(title.textContent) {
            case translations['TR'].timberCalc:
            case translations['EN'].timberCalc:
                title.textContent = translations[lang].timberCalc;
                desc.textContent = translations[lang].timberDesc;
                break;
            case translations['TR'].courierPos:
            case translations['EN'].courierPos:
                title.textContent = translations[lang].courierPos;
                desc.textContent = translations[lang].courierDesc;
                break;
            case translations['TR'].gameStore:
            case translations['EN'].gameStore:
                title.textContent = translations[lang].gameStore;
                desc.textContent = translations[lang].gameStoreDesc;
                break;
            case translations['TR'].dailyPlanner:
            case translations['EN'].dailyPlanner:
                title.textContent = translations[lang].dailyPlanner;
                desc.textContent = translations[lang].plannerDesc;
                break;
        }
    });
}

// Dil butonları için event listener'ları
langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        langBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const lang = btn.textContent;
        localStorage.setItem('language', lang);
        changeLanguage(lang);
    });
});

// Sayfa yüklendiğinde dil kontrolü
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('language') || 'TR';
    const activeLangBtn = Array.from(langBtns).find(btn => btn.textContent === savedLang);
    if (activeLangBtn) {
        activeLangBtn.click();
    }
    changeLanguage(savedLang);
});

// Sayfa yüklendiğinde particles'ı başlat
document.addEventListener('DOMContentLoaded', () => {
    const currentTheme = root.getAttribute('data-theme') || 'light';
    updateParticlesConfig(currentTheme);
});

// Scroll to top functionality
const scrollToTop = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTop.classList.add('visible');
    } else {
        scrollToTop.classList.remove('visible');
    }
});

scrollToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 3D Bear Model
function initBearModel() {
    const container = document.getElementById('bear-container');
    container.style.position = 'relative';
    container.style.zIndex = '2';

    const scene = new THREE.Scene();
    window.bearScene = scene; // Global referans için

    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        alpha: true,
        antialias: true 
    });
    
    renderer.setSize(400, 400);
    container.appendChild(renderer.domElement);

    // Başlangıç temasına göre ışıklandırma
    const currentTheme = root.getAttribute('data-theme') || 'light';
    updateBearLighting(currentTheme);

    const loader = new THREE.GLTFLoader();
    loader.load(
        'models/bear.glb',
        function (gltf) {
            const model = gltf.scene;
            scene.add(model);
            
            model.position.set(0, 0, -3);
            model.scale.set(1.5, 1.5, 1.5);
            
            function animate() {
                requestAnimationFrame(animate);
                model.rotation.y += 0.01;
                renderer.render(scene, camera);
            }
            animate();
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.error('Model yüklenirken hata:', error);
        }
    );

    window.addEventListener('resize', onWindowResize, false);
    function onWindowResize() {
        camera.aspect = 1;
        camera.updateProjectionMatrix();
        renderer.setSize(400, 400);
    }

    const particlesContainer = document.getElementById('particles-js');
    particlesContainer.style.zIndex = '1';

    renderer.domElement.style.position = 'relative';
    renderer.domElement.style.zIndex = '2';
}

// Sayfa yüklendiğinde modeli başlat
document.addEventListener('DOMContentLoaded', initBearModel);

// Proje verileri
const projectData = {
    'kereste': {
        title: 'Kereste Fiyat Hesaplama',
        description: 'Kereste firmaları için profesyonel yazılım çözümü. Stok takibi, fiyat hesaplama ve raporlama özellikleri.',
        problem: 'Kereste firmalarının manuel hesaplama süreçleri zaman alıcı ve hata yapmaya açık.',
        solution: 'Otomatik hesaplama, stok yönetimi ve detaylı raporlama özellikleri ile süreçleri optimize eden bir yazılım.',
        images: ['img/kereste1.jpg', 'img/kereste2.jpg'],
        technologies: ['C#', '.NET', 'WinForms', 'MSSQL', 'Crystal Reports'],
        demoLink: '#',
        githubLink: '#'
    },
    'kurye': {
        title: 'Kurye & POS Uygulaması',
        description: 'Kurye takip ve sipariş yönetimi için mobil uygulama.',
        problem: 'Kuryelerin rota optimizasyonu ve sipariş takibinde yaşanan zorluklar.',
        solution: 'GPS entegrasyonu, real-time takip ve otomatik rota optimizasyonu sağlayan mobil uygulama.',
        images: ['img/kurye1.jpg', 'img/kurye2.jpg'],
        technologies: ['Flutter', 'Dart', 'Firebase', 'Google Maps API'],
        demoLink: '#',
        githubLink: '#'
    },
    'game': {
        title: 'Video Game Store',
        description: 'Unity ile geliştirilmiş oyun mağazası simülasyonu.',
        problem: 'Oyun mağazası yönetiminin karmaşık süreçlerini öğretici bir şekilde simüle etme ihtiyacı.',
        solution: 'Eğlenceli ve öğretici bir deneyim sunan, gerçekçi oyun mağazası simülasyonu.',
        images: ['img/game1.jpg', 'img/game2.jpg'],
        technologies: ['Unity', 'C#', 'Blender', 'Adobe Photoshop'],
        demoLink: '#',
        githubLink: '#'
    },
    'planner': {
        title: 'Günlük Planlama Uygulaması',
        description: 'Günlük aktiviteleri planlamak için mobil uygulama.',
        problem: 'Günlük aktivitelerin organize edilmesi ve takibinde yaşanan zorluklar.',
        solution: 'Kullanıcı dostu arayüz ile kolay planlama ve hatırlatma sistemi.',
        images: ['img/planner1.jpg', 'img/planner2.jpg'],
        technologies: ['React Native', 'JavaScript', 'Firebase', 'Redux'],
        demoLink: '#',
        githubLink: '#'
    }
};

// Modal işlevselliği
const modal = document.getElementById('projectModal');
const closeBtn = document.querySelector('.close-modal');
let currentSlide = 0;
let currentImages = [];

// Modal'ı aç
function openModal(projectId) {
    const project = projectData[projectId];
    if (!project) return;

    // İçeriği doldur
    document.querySelector('.modal-title').textContent = project.title;
    document.querySelector('.project-description').textContent = project.description;
    document.querySelector('.project-problem').textContent = project.problem;
    document.querySelector('.project-solution').textContent = project.solution;
    
    // Teknolojileri doldur
    const techStack = document.querySelector('.project-tech-stack');
    techStack.innerHTML = project.technologies
        .map(tech => `<span class="tech-tag">${tech}</span>`)
        .join('');
    
    // Linkleri güncelle
    document.querySelector('.demo-link').href = project.demoLink;
    document.querySelector('.github-link').href = project.githubLink;
    
    // Slider'ı ayarla
    currentImages = project.images;
    currentSlide = 0;
    updateSlider();
    
    // Modal'ı göster
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Modal'ı kapat
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Slider fonksiyonları
function updateSlider() {
    if (currentImages.length === 0) return;
    document.querySelector('.slider-image').src = currentImages[currentSlide];
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % currentImages.length;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + currentImages.length) % currentImages.length;
    updateSlider();
}

// Event Listeners
closeBtn.addEventListener('click', closeModal);
document.querySelector('.next').addEventListener('click', nextSlide);
document.querySelector('.prev').addEventListener('click', prevSlide);

// Modal dışına tıklandığında kapat
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

// Proje kartlarına tıklama olayı ekle
document.querySelectorAll('.detail-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const projectId = btn.closest('.portfolio-item').getAttribute('data-project');
        openModal(projectId);
    });
});

// Klavye kontrolü
document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'block') {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    }
}); 