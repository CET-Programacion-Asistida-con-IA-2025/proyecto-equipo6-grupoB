// ===== JAVASCRIPT FUNCTIONALITY =====

// Smooth scrolling para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header dinámico en scroll
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 25px rgba(108, 133, 27, 0.15)';
        header.style.backdropFilter = 'blur(15px)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(108, 133, 27, 0.1)';
        header.style.backdropFilter = 'blur(10px)';
    }
    
    lastScrollTop = scrollTop;
});

// Animaciones en scroll con Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animar contadores cuando entren en vista
            if (entry.target.classList.contains('stats')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Animación de contadores
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            counter.textContent = Math.floor(start);
            
            if (start >= target) {
                counter.textContent = target;
                clearInterval(timer);
                
                // Agregar símbolo + para algunos números
                if (target >= 100) {
                    counter.textContent = target + '+';
                }
            }
        }, 16);
    });
}

// Menu móvil
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');
let isMenuOpen = false;

menuToggle.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = 'rgba(255, 255, 255, 0.98)';
        navLinks.style.padding = '1rem';
        navLinks.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        navLinks.style.backdropFilter = 'blur(10px)';
        navLinks.style.borderRadius = '0 0 15px 15px';
    } else {
        navLinks.style.display = 'none';
    }
});

// Cerrar menú al hacer click en enlace (móvil)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.style.display = 'none';
            isMenuOpen = false;
        }
    });
});

// Parallax sutil en hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${scrolled * 0.1}px)`;
        heroContent.style.transform = `translateY(${scrolled * 0.05}px)`;
    }
});

// Efectos de hover mejorados para las tarjetas
document.querySelectorAll('.r-card').forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) scale(1.02)';
        card.style.boxShadow = '0 25px 50px rgba(108, 133, 27, 0.2)';
        
        // Efecto de onda en el icono
        const icon = card.querySelector('.r-icon');
        icon.style.animation = 'pulse 0.6s ease-in-out';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '0 10px 30px rgba(108, 133, 27, 0.1)';
    });
});

// Easter egg: cambio de tema con clicks en logo
let logoClickCount = 0;
const logo = document.getElementById('logo');

logo.addEventListener('click', (e) => {
    e.preventDefault();
    logoClickCount++;
    
    // Efecto visual en cada click
    logo.style.transform = 'scale(0.95)';
    setTimeout(() => {
        logo.style.transform = 'scale(1)';
    }, 150);
    
    if (logoClickCount === 5) {
        // Cambio de tema temporal
        document.documentElement.style.setProperty('--primary-green', '#ff6b6b');
        document.documentElement.style.setProperty('--orange', '#4ecdc4');
        document.documentElement.style.setProperty('--dark-green', '#2c3e50');
        
        // Mostrar mensaje
        showNotification('🎨 ¡Tema especial activado!');
        
        // Restaurar tema original después de 3 segundos
        setTimeout(() => {
            document.documentElement.style.setProperty('--primary-green', '#AEE66A');
            document.documentElement.style.setProperty('--orange', '#ffbd59');
            document.documentElement.style.setProperty('--dark-green', '#6c851b');
            showNotification('🌱 Tema restaurado');
            logoClickCount = 0;
        }, 3000);
    }
});

// Sistema de notificaciones
function showNotification(message, duration = 3000) {
    const notification = document.createElement('div');
    notification.innerHTML = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--dark-green);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 10000;
        font-weight: 600;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animar salida y remover
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, duration);
}

// Efecto de partículas en el botón CTA
const joinBtn = document.getElementById('joinBtn');
joinBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Crear efecto de partículas
    for (let i = 0; i < 12; i++) {
        createParticle(e.clientX, e.clientY);
    }
    
    // Mostrar mensaje de éxito
    setTimeout(() => {
        showNotification('🎉 ¡Bienvenido a la comunidad EcoVida!', 4000);
    }, 500);
});

function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: var(--primary-green);
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        left: ${x}px;
        top: ${y}px;
    `;
    
    document.body.appendChild(particle);
    
    // Animar partícula
    const angle = (Math.PI * 2 * Math.random());
    const velocity = 100 + Math.random() * 100;
    const lifetime = 1000 + Math.random() * 1000;
    
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;
    
    let startTime = Date.now();
    
    function animateParticle() {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / lifetime;
        
        if (progress >= 1) {
            document.body.removeChild(particle);
            return;
        }
        
        const currentX = x + vx * progress;
        const currentY = y + vy * progress + 0.5 * 200 * progress * progress; // gravedad
        
        particle.style.left = currentX + 'px';
        particle.style.top = currentY + 'px';
        particle.style.opacity = 1 - progress;
        particle.style.transform = `scale(${1 - progress * 0.5})`;
        
        requestAnimationFrame(animateParticle);
    }
    
    animateParticle();
}

// Detectar dispositivo móvil para optimizaciones
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (isMobile) {
    // Reducir animaciones en móvil para mejor rendimiento
    document.documentElement.style.setProperty('--animation-duration', '0.3s');
}

// Modo oscuro automático según la hora
const hour = new Date().getHours();
if (hour >= 20 || hour <= 6) {
    document.body.style.filter = 'brightness(0.9)';
}

// Guardar preferencias del usuario (simulado con variables)
let userPreferences = {
    reducedMotion: false,
    highContrast: false,
    fontSize: 'normal'
};

// Detectar preferencia de movimiento reducido
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    userPreferences.reducedMotion = true;
    document.documentElement.style.setProperty('--animation-duration', '0.1s');
}

// Función para cambiar tamaño de fuente
function changeFontSize(size) {
    const multipliers = {
        small: 0.9,
        normal: 1,
        large: 1.1,
        xlarge: 1.2
    };
    
    document.documentElement.style.fontSize = (16 * multipliers[size]) + 'px';
    userPreferences.fontSize = size;
}

// Lazy loading para imágenes (si las hubiera)
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Console Easter Egg
console.log(`
🌱 ¡Hola desarrollador!

Si estás leyendo esto, ¡te interesa la sostenibilidad y el código!

Algunos secretos:
• Haz click 5 veces en el logo para un tema especial
• Este sitio está optimizado para accesibilidad
• Usa animaciones responsables y respeta reduced-motion

¿Tienes ideas para mejorar la sostenibilidad web?
¡Nos encantaría escucharlas!

Código con 💚 para el planeta
`);

// Inicialización completa
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌱 EcoVida cargado correctamente');
    
    // Verificar soporte para intersectionObserver
    if (!window.IntersectionObserver) {
        // Fallback para navegadores antiguos
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            el.classList.add('visible');
        });
    }
    
    // Precarga de fuentes críticas
    const fontPreload = document.createElement('link');
    fontPreload.rel = 'preload';
    fontPreload.href = 'https://fonts.googleapis.com/css2?family=Cooper+Hewitt:wght@300;400;600;700&display=swap';
    fontPreload.as = 'style';
    document.head.appendChild(fontPreload);
});

// Service Worker registration (para PWA futura)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // navigator.registerServiceWorker('./sw.js'); // Comentado por ahora
    });
}

// Manejo de errores global
window.addEventListener('error', (e) => {
    console.warn('Error capturado:', e.error);
    // En producción, aquí enviarías errores a un servicio de logging
});

// Optimización de rendimiento: debounce para scroll
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar debounce al scroll para mejor rendimiento
const debouncedScroll = debounce(() => {
    // Lógica de scroll adicional si es necesaria
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScroll);

document.getElementById('joinBtn').addEventListener('click', (e) => {
  e.preventDefault();
  const mensaje = document.getElementById('mensajeFinal');
  mensaje.textContent = "🌱 ¡Gracias por sumarte! Estamos construyendo un futuro sostenible junt@s.";
});
