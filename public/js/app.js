// Main Application Controller

class WhispersApp {
    constructor() {
        this.init();
    }
    
    init() {
        console.log('%c👻 Whispers from the Void 👻', 'font-size: 20px; color: #00ff41; text-shadow: 0 0 10px #00ff41;');
        console.log('%cThe void is listening...', 'font-size: 14px; color: #8b0000;');
        
        this.setupKeyboardShortcuts();
        this.setupAccessibility();
        this.addEasterEggs();
    }
    
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + Enter to submit
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                if (window.ouijaBoard) {
                    window.ouijaBoard.submit();
                }
            }
            
            // Escape to clear
            if (e.key === 'Escape') {
                if (window.ouijaBoard && window.ouijaBoard.getMessage().length > 0) {
                    if (confirm('Clear your confession?')) {
                        window.ouijaBoard.clear();
                    }
                }
            }
            
            // Keyboard typing (for accessibility)
            if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
                const activeElement = document.activeElement;
                if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
                    if (window.ouijaBoard) {
                        const char = e.key.toUpperCase();
                        
                        // Find the corresponding letter on the board
                        const letterElement = document.querySelector(`.letter[data-letter="${char}"]`);
                        
                        if (letterElement) {
                            // Trigger the same visual effects as clicking
                            window.ouijaBoard.animateLetter(letterElement, char);
                        } else {
                            // If letter not found on board, just add it
                            window.ouijaBoard.addCharacter(char);
                        }
                        
                        e.preventDefault();
                    }
                }
            }
            
            // Backspace
            if (e.key === 'Backspace') {
                const activeElement = document.activeElement;
                if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
                    if (window.ouijaBoard) {
                        // Find backspace button on board
                        const backspaceElement = document.querySelector('.letter[data-letter="BACK"]');
                        if (backspaceElement) {
                            window.ouijaBoard.animateLetter(backspaceElement, 'BACK');
                        } else {
                            window.ouijaBoard.backspace();
                        }
                        e.preventDefault();
                    }
                }
            }
            
            // Space bar
            if (e.key === ' ') {
                const activeElement = document.activeElement;
                if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
                    if (window.ouijaBoard) {
                        // Find space button on board
                        const spaceElement = document.querySelector('.letter[data-letter=" "]');
                        if (spaceElement) {
                            window.ouijaBoard.animateLetter(spaceElement, ' ');
                        } else {
                            window.ouijaBoard.addCharacter(' ');
                        }
                        e.preventDefault();
                    }
                }
            }
        });
    }
    
    setupAccessibility() {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion && window.horrorEffects) {
            window.horrorEffects.motionEnabled = false;
            document.body.classList.add('reduced-motion');
        }
        
        // Focus management
        const focusableElements = document.querySelectorAll('button, .letter, a, [tabindex]:not([tabindex="-1"])');
        focusableElements.forEach(el => {
            el.addEventListener('focus', () => {
                el.style.outline = '2px solid #00ff41';
                el.style.outlineOffset = '4px';
            });
            
            el.addEventListener('blur', () => {
                el.style.outline = '';
                el.style.outlineOffset = '';
            });
        });
    }
    
    addEasterEggs() {
        // Konami code easter egg
        let konamiCode = [];
        const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        
        document.addEventListener('keydown', (e) => {
            konamiCode.push(e.key);
            if (konamiCode.length > konamiSequence.length) {
                konamiCode.shift();
            }
            
            if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
                this.activateHellMode();
                konamiCode = [];
            }
        });
        
        // Click blood moon 3 times
        const bloodMoon = document.querySelector('.blood-moon');
        let moonClicks = 0;
        if (bloodMoon) {
            bloodMoon.style.pointerEvents = 'auto';
            bloodMoon.style.cursor = 'pointer';
            bloodMoon.addEventListener('click', () => {
                moonClicks++;
                if (moonClicks >= 3) {
                    this.summonSpirit();
                    moonClicks = 0;
                }
            });
        }
    }
    
    activateHellMode() {
        console.log('%c🔥 HELL MODE ACTIVATED 🔥', 'font-size: 24px; color: #ff0000; text-shadow: 0 0 20px #ff0000;');
        
        // Intensify all effects
        document.body.style.filter = 'hue-rotate(180deg) saturate(2)';
        document.body.style.animation = 'possession-shake 0.1s infinite';
        
        if (window.horrorEffects) {
            window.horrorEffects.screenShake();
        }
        
        // Create blood rain
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                if (window.horrorEffects) {
                    window.horrorEffects.createBloodDrip(x, 0);
                }
            }, i * 100);
        }
        
        // Reset after 5 seconds
        setTimeout(() => {
            document.body.style.filter = '';
            document.body.style.animation = '';
        }, 5000);
    }
    
    summonSpirit() {
        console.log('%c👻 A spirit has been summoned... 👻', 'font-size: 18px; color: #00ff41;');
        
        // Create floating spirit
        const spirit = document.createElement('div');
        spirit.style.position = 'fixed';
        spirit.style.fontSize = '4rem';
        spirit.style.zIndex = '10000';
        spirit.style.pointerEvents = 'none';
        spirit.style.filter = 'drop-shadow(0 0 20px #00ff41)';
        spirit.style.animation = 'float 3s ease-in-out infinite, fade 5s ease-out forwards';
        spirit.textContent = '👻';
        
        const startX = Math.random() * window.innerWidth;
        spirit.style.left = startX + 'px';
        spirit.style.top = window.innerHeight + 'px';
        
        document.body.appendChild(spirit);
        
        // Animate upward
        let pos = window.innerHeight;
        const interval = setInterval(() => {
            pos -= 2;
            spirit.style.top = pos + 'px';
            spirit.style.left = (startX + Math.sin(pos / 50) * 50) + 'px';
            
            if (pos < -100) {
                clearInterval(interval);
                spirit.remove();
            }
        }, 16);
        
        if (window.horrorEffects) {
            window.horrorEffects.playClickSound();
        }
    }
}

// Initialize app
let app;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        app = new WhispersApp();
    });
} else {
    app = new WhispersApp();
}

// Expose to window for debugging
window.app = app;
