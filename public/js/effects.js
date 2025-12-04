// Horror Effects Engine - Particles, Sound, Atmosphere

class HorrorEffects {
    constructor() {
        this.canvas = document.getElementById('particles');
        this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
        this.particles = [];
        this.soundEnabled = true;
        this.motionEnabled = true;
        this.musicStarted = false;
        
        this.sounds = {
            ambient: null,
            hover: null,
            click: null,
            whisper: null,
            submit: null
        };
        
        this.bgMusic = document.getElementById('bgMusic');
        
        this.init();
    }
    
    init() {
        if (this.canvas && this.ctx) {
            this.resizeCanvas();
            window.addEventListener('resize', () => this.resizeCanvas());
            this.createParticles();
            this.animate();
        }
        
        this.initSounds();
        this.setupEventListeners();
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        const particleCount = 80;
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2,
                color: Math.random() > 0.5 ? '#00ff41' : '#8b0000'
            });
        }
    }
    
    animate() {
        if (!this.motionEnabled) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Wrap around screen
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Flicker effect
            particle.opacity = Math.random() * 0.5 + 0.2;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fill();
            
            // Glow effect
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = particle.color;
        });
        
        this.ctx.globalAlpha = 1;
        this.ctx.shadowBlur = 0;
        
        requestAnimationFrame(() => this.animate());
    }
    
    initSounds() {
        // Create audio context for Web Audio API
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Generate synthetic horror sounds
        this.createAmbientSound();
    }
    
    createAmbientSound() {
        // Low frequency ambient drone
        if (!this.soundEnabled) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(55, this.audioContext.currentTime); // Low A
        gainNode.gain.setValueAtTime(0.05, this.audioContext.currentTime);
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        // Modulate for eerie effect
        const lfo = this.audioContext.createOscillator();
        const lfoGain = this.audioContext.createGain();
        lfo.frequency.setValueAtTime(0.1, this.audioContext.currentTime);
        lfoGain.gain.setValueAtTime(10, this.audioContext.currentTime);
        
        lfo.connect(lfoGain);
        lfoGain.connect(oscillator.frequency);
        
        this.sounds.ambient = { oscillator, lfo, gainNode };
    }
    
    startAmbient() {
        if (this.soundEnabled && this.sounds.ambient) {
            try {
                this.sounds.ambient.oscillator.start();
                this.sounds.ambient.lfo.start();
            } catch (e) {
                // Already started
            }
        }
    }
    
    stopAmbient() {
        if (this.sounds.ambient) {
            try {
                this.sounds.ambient.gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            } catch (e) {
                // Handle error
            }
        }
    }
    
    playClickSound() {
        if (!this.soundEnabled) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(50, this.audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }
    
    playHoverSound() {
        if (!this.soundEnabled) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
        
        gainNode.gain.setValueAtTime(0.03, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05);
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 0.05);
    }
    
    playSubmitSound() {
        if (!this.soundEnabled) return;
        
        // Dramatic submission sound
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(100, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(50, this.audioContext.currentTime + 0.5);
        
        gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 0.5);
        
        // Screen shake
        this.screenShake();
    }
    
    screenShake() {
        document.body.classList.add('glitch-effect');
        setTimeout(() => {
            document.body.classList.remove('glitch-effect');
        }, 300);
    }
    
    startBackgroundMusic() {
        if (!this.musicStarted && this.soundEnabled && this.bgMusic) {
            this.bgMusic.volume = 0.3; // Set to 30% volume
            const playPromise = this.bgMusic.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log('🎵 Background music started');
                    this.musicStarted = true;
                }).catch(e => {
                    console.log('Background music autoplay prevented:', e);
                    console.log('Click anywhere to start music...');
                });
            }
        }
    }
    
    stopBackgroundMusic() {
        if (this.bgMusic) {
            this.bgMusic.pause();
            this.bgMusic.currentTime = 0;
            this.musicStarted = false;
        }
    }
    
    setupEventListeners() {
        // Sound toggle
        const soundToggle = document.getElementById('soundToggle');
        if (soundToggle) {
            soundToggle.addEventListener('click', () => {
                this.soundEnabled = !this.soundEnabled;
                const icon = soundToggle.querySelector('.sound-icon');
                icon.textContent = this.soundEnabled ? '🔊' : '🔇';
                
                if (this.soundEnabled) {
                    this.createAmbientSound();
                    this.startAmbient();
                    if (this.musicStarted) {
                        this.bgMusic.play();
                    }
                } else {
                    this.stopAmbient();
                    if (this.bgMusic) {
                        this.bgMusic.pause();
                    }
                }
                
                this.playClickSound();
            });
        }
        
        // Motion toggle
        const motionToggle = document.getElementById('motionToggle');
        if (motionToggle) {
            motionToggle.addEventListener('click', () => {
                this.motionEnabled = !this.motionEnabled;
                const icon = motionToggle.querySelector('.motion-icon');
                icon.textContent = this.motionEnabled ? '✨' : '⏸️';
                
                document.body.classList.toggle('reduced-motion', !this.motionEnabled);
                
                if (this.motionEnabled) {
                    this.animate();
                }
                
                this.playClickSound();
            });
        }
        
        // Start ambient and music on ANY interaction
        const startAudio = () => {
            this.startAmbient();
            this.startBackgroundMusic();
        };
        
        // Multiple triggers to ensure audio starts
        document.addEventListener('keydown', startAudio);
        document.addEventListener('click', startAudio);
        document.addEventListener('touchstart', startAudio);
        
        // Also try on letter clicks specifically
        document.querySelectorAll('.letter').forEach(letter => {
            letter.addEventListener('click', startAudio, { once: true });
        });
    }
    
    createBloodDrip(x, y) {
        const drip = document.createElement('div');
        drip.className = 'blood-drip';
        drip.style.left = x + 'px';
        drip.style.top = y + 'px';
        document.body.appendChild(drip);
        
        setTimeout(() => {
            drip.remove();
        }, 2000);
    }
    
    glitchElement(element) {
        element.classList.add('glitch-effect');
        setTimeout(() => {
            element.classList.remove('glitch-effect');
        }, 300);
    }
    
    pauseBackgroundMusic() {
        if (this.bgMusic && !this.bgMusic.paused) {
            this.bgMusic.pause();
        }
    }
    
    resumeBackgroundMusic() {
        if (this.bgMusic && this.bgMusic.paused && this.soundEnabled && this.musicStarted) {
            this.bgMusic.play().catch(e => console.log('Resume music error:', e));
        }
    }
    
    showHauntedImage() {
        console.log('👻 Showing haunted image...');
        const overlay = document.getElementById('hauntedOverlay');
        const img = document.getElementById('hauntedImage');
        
        console.log('Overlay:', overlay);
        console.log('Image:', img);
        console.log('Image src:', img ? img.src : 'no image');
        
        if (overlay && img) {
            // Pause background music for dramatic effect
            this.pauseBackgroundMusic();
            
            // Force display and show overlay
            overlay.style.display = 'flex';
            overlay.style.opacity = '1';
            overlay.classList.add('active');
            
            console.log('✅ Overlay activated');
            
            // Play dramatic sound
            this.playSubmitSound();
            
            // Additional screen effects
            document.body.style.filter = 'hue-rotate(180deg) contrast(1.5)';
            
            // Hide after 4 seconds and resume music
            setTimeout(() => {
                console.log('Hiding haunted image...');
                overlay.style.transition = 'opacity 1.5s ease-out';
                overlay.style.opacity = '0';
                document.body.style.filter = '';
                
                setTimeout(() => {
                    overlay.classList.remove('active');
                    overlay.style.display = 'none';
                    overlay.style.opacity = '';
                    overlay.style.transition = '';
                    // Resume music after image fades
                    this.resumeBackgroundMusic();
                }, 1500);
            }, 4000);
        } else {
            console.error('❌ Overlay or image not found!');
        }
    }
}

// Initialize effects when DOM is ready
let horrorEffects;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        horrorEffects = new HorrorEffects();
    });
} else {
    horrorEffects = new HorrorEffects();
}
