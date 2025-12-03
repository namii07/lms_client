
document.addEventListener('DOMContentLoaded', function() {
 
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

   
    const passwordToggles = document.querySelectorAll('.password-toggle');
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            this.textContent = type === 'password' ? '👁️' : '🙈';
        });
    });

 
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.addEventListener('loadeddata', function() {
            this.play().catch(e => {
                console.log('Autoplay prevented:', e);
                
                const playBtn = document.createElement('button');
                playBtn.textContent = 'Play Video';
                playBtn.className = 'video-play-btn';
                playBtn.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: rgba(255, 255, 255, 0.9);
                    border: none;
                    padding: 1rem 2rem;
                    border-radius: 50px;
                    font-size: 1.1rem;
                    cursor: pointer;
                    z-index: 10;
                `;
                playBtn.addEventListener('click', () => {
                    this.play();
                    playBtn.remove();
                });
                this.parentElement.appendChild(playBtn);
            });
        });
    });

    
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
    }

   
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = this.querySelectorAll('input[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff4444';
                    setTimeout(() => {
                        input.style.borderColor = '#e0e0e0';
                    }, 3000);
                }
            });
            
            
            const password = this.querySelector('input[name="password"]');
            const confirmPassword = this.querySelector('input[name="confirm-password"]');
            
            if (password && confirmPassword && password.value !== confirmPassword.value) {
                isValid = false;
                confirmPassword.style.borderColor = '#ff4444';
                alert('Passwords do not match!');
                setTimeout(() => {
                    confirmPassword.style.borderColor = '#e0e0e0';
                }, 3000);
            }
            
            if (isValid) {
                
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Processing...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    alert('Form submitted successfully!');
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    
                    
                    if (this.id === 'signup-form') {
                        window.location.href = 'login.html';
                    } else if (this.id === 'login-form') {
                        window.location.href = 'index.html';
                    }
                }, 1500);
            }
        });
    });

    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

   
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
});