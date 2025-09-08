document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scrolling & Active Nav Link
    document.querySelectorAll('nav a[href^="#"], .footer-navigation a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const headerOffset = document.querySelector('header')?.offsetHeight || 70;
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerOffset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
                document.querySelectorAll('nav a, .footer-navigation a').forEach(link => link.classList.remove('active'));
                this.classList.add('active'); // Active class for nav, might need specific handling for footer if desired
                
                const navLinks = document.getElementById('navLinks');
                if (navLinks && navLinks.classList.contains('active')) { // Close mobile menu on item click
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
    
    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // Toast notification function
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast-notification ${type}`;
        toast.innerHTML = `
            <span class="toast-icon">${type === 'success' ? '✓' : '⚠'}</span>
            <span class="toast-message">${message}</span>
        `;
        
        document.body.appendChild(toast);
        
        // Show toast
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        // Hide toast after 5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 5000);
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = this.elements.name.value;
            const email = this.elements.email.value;
            const message = this.elements.message.value;
            
            if (!name || !email || !message) {
                showToast("Please fill in all fields.", "error");
                return;
            }
            
            // Create form data for submission
            const formData = new FormData(this);
            
            // Show loading state
            const submitButton = this.querySelector('.form-submit-button');
            const originalText = submitButton.textContent;
            submitButton.textContent = "Sending...";
            submitButton.disabled = true;
            
            // Submit to Formspree
            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    showToast("Thank you! Your message has been sent successfully.");
                    this.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                showToast("Sorry, there was an error sending your message. Please try again later.", "error");
            })
            .finally(() => {
                // Reset button state
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
        });
    }

// Canvas Floating Symbols Animation - Increased quantity
const canvas = document.getElementById('bg-canvas');
if (canvas) {
    console.log("Canvas element 'bg-canvas' found.");
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error("Failed to get 2D context for canvas.");
        return;
    }
    console.log("Canvas 2D context obtained.");

    let animationFrameId;
    function resizeCanvas() { 
        canvas.width = window.innerWidth; 
        canvas.height = window.innerHeight; 
        console.log("Canvas resized to: " + canvas.width + "x" + canvas.height);
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    let symbols = [];
    const accentColorsRGB = [
        '0, 230, 255',   // Primary accent
        '255, 0, 255',   // Secondary accent
        '0, 255, 170',   // Tertiary accent
    ];
    const mathSymbols = ['∫','∬','∭','∮','∑','∏','∂','∇','Δ','∈','∉','∀','∃','∴','∵','≅','≈','≠','≤','≥','⊂','⊃','⊆','⊇','∩','∪','∅','ℝ','ℚ','ℤ','ℕ','ℂ','ħ','ℏ','γ','λ','μ','ν','ξ','ο','π','ρ','σ','τ','υ','φ','χ','ψ','ω','Α','Β','Γ','Δ','Ε','Ζ','Η','Θ','Ι','Κ','Λ','Μ','Ν','Ξ','Ο','Π','Ρ','Σ','Τ','Υ','Φ','Χ','Ψ','Ω','X̄','σ²','μₓ','P(A)','P(A|B)','E[X]','Var(X)','Cov(X,Y)','H','∇²','∇J(θ)','argmin','argmax','log','ln','exp','sin','cos','tan','lim','→','↦','⇔','⇒','d/dx','ƒ(x)','||v||','det(A)','Tr(M)','diag(v)','ReLU','σ(x)','tanh(x)','softmax','0','1','e','i','∞','⊕','⊗','⊙','⊥','∥','∠','∧','∨','¬','∃!','□','◊'];

    function getRandomChar() { return mathSymbols[Math.floor(Math.random() * mathSymbols.length)]; }
    function getRandomColorRgb() { return accentColorsRGB[Math.floor(Math.random() * accentColorsRGB.length)]; }

    const PARTICLE_LIFESPAN = 300; // 5 seconds at 60fps

    function createSymbol(isBurst = false, clickX, clickY) {
        const life = PARTICLE_LIFESPAN;
        let initialOpacity, colorRgb, size, speedX, speedY, rotation;

        if (isBurst) {
            initialOpacity = 0.7 + Math.random() * 0.2;
            colorRgb = getRandomColorRgb();
            // Increased size for burst particles
            size = (Math.random() < 0.6 ? Math.random() * 6 + 8 : Math.random() * 7 + 12);
            speedX = (Math.random() - 0.5) * 0.8;
            speedY = (Math.random() - 0.5) * 0.8;
            rotation = (Math.random() - 0.5) * 0.005; 
        } else { // Ambient particle
            initialOpacity = 0.1 + Math.random() * 0.1;
            colorRgb = getRandomColorRgb();
            // Increased size for ambient particles
            size = (Math.random() < 0.9 ? Math.random() * 3 + 4 : Math.random() * 4 + 6);
            speedX = (Math.random() - 0.5) * 0.06;
            speedY = (Math.random() * -0.05) - 0.005;
            rotation = (Math.random() - 0.5) * 0.002;
        }

        symbols.push({
            x: isBurst ? clickX : Math.random() * canvas.width,
            y: isBurst ? clickY : Math.random() * canvas.height,
            char: getRandomChar(),
            size: size,
            speedX: speedX,
            speedY: speedY,
            initialOpacity: initialOpacity,
            opacity: initialOpacity,
            colorRgb: colorRgb,
            rotation: rotation,
            angle: Math.random() * Math.PI * 2,
            life: life,
            fadeSpeed: initialOpacity / life
        });
    }

    // INCREASED PARTICLE DENSITY
    const targetParticleDensity = 0.00007; // Increased from 0.000035
    // INCREASED MAXIMUM PARTICLE COUNT
    let targetAmbientParticles = Math.max(20, Math.min(80, Math.floor(canvas.width * canvas.height * targetParticleDensity)));

    function maintainAmbientParticles() {
        symbols = symbols.filter(s => s.life > 0 && s.opacity > 0);
        while (symbols.length < targetAmbientParticles) {
            createSymbol(false); 
        }
    }
    
    // Initial population - increased count
    console.log("Populating initial ambient particles. Target: " + targetAmbientParticles);
    for(let i = 0; i < targetAmbientParticles; i++) {
        createSymbol(false);
    }
    console.log("Initial symbols count: " + symbols.length);

    window.addEventListener('resize', () => {
        // INCREASED MAXIMUM ON RESIZE TOO
        targetAmbientParticles = Math.max(20, Math.min(80, Math.floor(canvas.width * canvas.height * targetParticleDensity)));
    });

    // Auto-generate symbols more frequently and in greater quantities
    setInterval(() => {
        // INCREASED NUMBER OF AUTO-GENERATED SYMBOLS
        const count = 6 + Math.floor(Math.random() * 4); // Now generates 6-9 symbols
        for (let i = 0; i < count; i++) {
            createSymbol(true, Math.random() * canvas.width, Math.random() * canvas.height);
        }
    }, 3000); // Reduced interval from 5 seconds to 3 seconds

    let lastParticleMaintenanceTime = 0;
    const particleMaintenanceInterval = 100; 

    function animateParticles(currentTime) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (currentTime - lastParticleMaintenanceTime > particleMaintenanceInterval) {
            maintainAmbientParticles();
            lastParticleMaintenanceTime = currentTime;
        }

        for (let i = 0; i < symbols.length; i++) {
            const s = symbols[i];

            s.opacity -= s.fadeSpeed;
            if (s.opacity < 0) s.opacity = 0;

            ctx.save();
            ctx.translate(s.x, s.y);
            s.angle += s.rotation;
            ctx.rotate(s.angle);
            // Use a more visible font with increased size
            ctx.font = `bold ${s.size}px 'Fira Code', 'Courier New', monospace`;

            ctx.fillStyle = `rgba(${s.colorRgb}, ${s.opacity})`;
            ctx.shadowColor = `rgba(${s.colorRgb}, ${s.opacity * 0.15})`;
            ctx.shadowBlur = s.size / 6;
            ctx.fillText(s.char, -ctx.measureText(s.char).width / 2, s.size / 3);
            ctx.restore();

            s.x += s.speedX;
            s.y += s.speedY;
            s.life--;

            if (s.life <= 0 || s.opacity <= 0) {
                symbols.splice(i, 1);
                i--;
            }
        }
        animationFrameId = requestAnimationFrame(animateParticles);
    }
    
    console.log("Starting particle animation.");
    animationFrameId = requestAnimationFrame(animateParticles);

} else {
    console.error("Canvas element with ID 'bg-canvas' NOT FOUND at the time of script execution.");
}

    // Scroll Animations (IntersectionObserver)
    const scrollElements = document.querySelectorAll(".scroll-animate");
    const scrollChildren = document.querySelectorAll(".scroll-animate-child");
    const intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add("visible");
        });
    }, { threshold: 0.05 }); 
    scrollElements.forEach(el => intersectionObserver.observe(el));
    scrollChildren.forEach(el => intersectionObserver.observe(el));

    // Active Nav Link on Scroll (IntersectionObserver)
    const sections = document.querySelectorAll("main section");
    const navLiAnchors = document.querySelectorAll("nav ul li a"); 
    const headerHeight = document.querySelector('header')?.offsetHeight || 70;

    const navScrollObserver = new IntersectionObserver((entries) => {
        let currentActiveSectionId = null;
        
        if (window.pageYOffset < window.innerHeight * 0.3) { 
            currentActiveSectionId = 'home';
        } else {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    currentActiveSectionId = entry.target.getAttribute('id');
                }
            });
        }

        navLiAnchors.forEach(a => {
            if (currentActiveSectionId && a.getAttribute('href') === `#${currentActiveSectionId}`) {
                a.classList.add('active');
            } else {
                a.classList.remove('active');
            }
        });
    }, { 
        rootMargin: `-${headerHeight + 20}px 0px -${window.innerHeight - headerHeight - 150}px 0px`,
        threshold: 0 
    });

    sections.forEach(section => navScrollObserver.observe(section));
    if (window.pageYOffset < window.innerHeight * 0.3) { 
        const homeLink = document.querySelector('nav a[href="#home"]');
        if (homeLink) {
            navLiAnchors.forEach(a => a.classList.remove('active')); 
            homeLink.classList.add('active');
        }
    }
    // Consider adding this performance optimization
function optimizeParticles() {
    // Reduce particle count on lower-performance devices
    const isLowPerfDevice = navigator.hardwareConcurrency < 4 || 
                           (navigator.deviceMemory || 4) < 4;
    
    if (isLowPerfDevice) {
        targetParticleDensity = 0.00004; // Slightly reduced for low-end devices
        console.log("Optimizing for lower-performance device");
    }
}

// Call this function before initializing particles
optimizeParticles();
});