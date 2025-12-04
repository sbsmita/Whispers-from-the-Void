// Ouija Board Interaction System

class OuijaBoard {
    constructor() {
        this.planchette = document.getElementById('planchette');
        this.messageDisplay = document.getElementById('currentMessage');
        this.charCount = document.getElementById('charCount');
        this.submitBtn = document.getElementById('submitBtn');
        this.letters = document.querySelectorAll('.letter');
        this.typingLeft = document.getElementById('typingLeft');
        this.typingRight = document.getElementById('typingRight');
        
        this.currentMessage = '';
        this.maxLength = 500;
        this.isTyping = false;
        this.typingTimeout = null;
        
        this.init();
    }
    
    init() {
        this.setupYesNoListeners();
        this.setupLetterListeners();
        this.setupPlanchette();
        this.setupSubmit();
        this.updateDisplay();
    }
    
    setupYesNoListeners() {
        const yesNo = document.querySelectorAll('[data-action="yes"], [data-action="no"]');
        yesNo.forEach(element => {
            element.addEventListener('click', (e) => {
                const action = element.dataset.action;
                this.askSpirits(action);
                
                if (window.horrorEffects) {
                    window.horrorEffects.playClickSound();
                }
            });
        });
    }
    
    askSpirits(answer) {
        const responses = {
            yes: [
                "The spirits whisper... YES",
                "The void confirms... YES",
                "The darkness agrees... YES",
                "From beyond the veil... YES",
                "The dead say... YES"
            ],
            no: [
                "The spirits deny... NO",
                "The void rejects... NO",
                "The darkness refuses... NO",
                "From beyond the veil... NO",
                "The dead say... NO"
            ]
        };
        
        const messages = responses[answer];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        // Show spirit answer
        const originalMessage = this.messageDisplay.textContent;
        this.messageDisplay.textContent = randomMessage;
        this.messageDisplay.style.color = answer === 'yes' ? 'var(--spectral-green)' : 'var(--blood-red)';
        this.messageDisplay.style.fontSize = '2rem';
        this.messageDisplay.classList.add('possessed');
        
        // Screen shake
        if (window.horrorEffects) {
            window.horrorEffects.screenShake();
        }
        
        // Restore after 3 seconds
        setTimeout(() => {
            this.messageDisplay.textContent = originalMessage;
            this.messageDisplay.style.color = '';
            this.messageDisplay.style.fontSize = '';
            this.messageDisplay.classList.remove('possessed');
        }, 3000);
    }
    
    setupLetterListeners() {
        this.letters.forEach((letter, index) => {
            // Set animation delay for breathing effect
            letter.style.setProperty('--i', index);
            
            // Hover effect
            letter.addEventListener('mouseenter', (e) => {
                if (window.horrorEffects) {
                    window.horrorEffects.playHoverSound();
                }
                this.movePlanchetteTo(letter);
            });
            
            // Click to add letter
            letter.addEventListener('click', (e) => {
                const char = letter.dataset.letter;
                
                if (char === 'BACK') {
                    this.backspace();
                } else if (char === ' ') {
                    this.addCharacter(' ');
                } else if (char) {
                    this.addCharacter(char);
                }
                
                if (window.horrorEffects) {
                    window.horrorEffects.playClickSound();
                }
                
                // Visual feedback
                letter.classList.add('active');
                setTimeout(() => {
                    letter.classList.remove('active');
                }, 300);
                
                // Possession effect
                this.messageDisplay.classList.add('possessed');
                setTimeout(() => {
                    this.messageDisplay.classList.remove('possessed');
                }, 200);
            });
        });
    }
    
    setupPlanchette() {
        // Follow mouse cursor
        document.addEventListener('mousemove', (e) => {
            const board = document.querySelector('.ouija-board');
            if (!board) return;
            
            const rect = board.getBoundingClientRect();
            
            // Check if mouse is over the board
            if (e.clientX >= rect.left && e.clientX <= rect.right &&
                e.clientY >= rect.top && e.clientY <= rect.bottom) {
                
                const x = e.clientX - rect.left - 30; // Center planchette
                const y = e.clientY - rect.top - 30;
                
                this.planchette.style.left = x + 'px';
                this.planchette.style.top = y + 'px';
                this.planchette.style.opacity = '1';
            } else {
                this.planchette.style.opacity = '0.3';
            }
        });
    }
    
    movePlanchetteTo(element) {
        const board = document.querySelector('.ouija-board');
        const boardRect = board.getBoundingClientRect();
        const letterRect = element.getBoundingClientRect();
        
        const x = letterRect.left - boardRect.left + (letterRect.width / 2) - 30;
        const y = letterRect.top - boardRect.top + (letterRect.height / 2) - 30;
        
        this.planchette.style.left = x + 'px';
        this.planchette.style.top = y + 'px';
    }
    
    animateLetter(letterElement, char) {
        // Move planchette to the letter
        this.movePlanchetteTo(letterElement);
        
        // Play sound
        if (window.horrorEffects) {
            window.horrorEffects.playClickSound();
        }
        
        // Visual feedback - same as clicking
        letterElement.classList.add('active');
        setTimeout(() => {
            letterElement.classList.remove('active');
        }, 300);
        
        // Possession effect
        this.messageDisplay.classList.add('possessed');
        setTimeout(() => {
            this.messageDisplay.classList.remove('possessed');
        }, 200);
        
        // Handle special keys
        if (char === 'BACK') {
            this.backspace();
        } else if (char === ' ') {
            this.addCharacter(' ');
        } else {
            this.addCharacter(char);
        }
    }
    
    showTypingIndicators() {
        if (this.typingLeft && this.typingRight) {
            this.typingLeft.classList.add('active');
            this.typingRight.classList.add('active');
        }
        
        // Clear existing timeout
        if (this.typingTimeout) {
            clearTimeout(this.typingTimeout);
        }
        
        // Hide after 2 seconds of no typing
        this.typingTimeout = setTimeout(() => {
            this.hideTypingIndicators();
        }, 2000);
    }
    
    hideTypingIndicators() {
        if (this.typingLeft && this.typingRight) {
            this.typingLeft.classList.remove('active');
            this.typingRight.classList.remove('active');
        }
    }
    
    addCharacter(char) {
        if (this.currentMessage.length >= this.maxLength) {
            this.shake();
            return;
        }
        
        this.currentMessage += char;
        this.updateDisplay();
        this.glitchText();
        this.showTypingIndicators();
    }
    
    backspace() {
        if (this.currentMessage.length > 0) {
            this.currentMessage = this.currentMessage.slice(0, -1);
            this.updateDisplay();
            this.showTypingIndicators();
        }
    }
    
    updateDisplay() {
        if (this.currentMessage.length === 0) {
            this.messageDisplay.textContent = 'Your confession materializes here...';
            this.messageDisplay.style.opacity = '0.5';
        } else {
            this.messageDisplay.textContent = this.currentMessage;
            this.messageDisplay.style.opacity = '1';
        }
        
        // Update character count
        this.charCount.textContent = this.currentMessage.length;
        
        // Warning colors
        if (this.currentMessage.length > 450) {
            this.charCount.className = 'danger';
        } else if (this.currentMessage.length > 400) {
            this.charCount.className = 'warning';
        } else {
            this.charCount.className = '';
        }
    }
    
    glitchText() {
        // Random character glitch effect
        if (Math.random() > 0.7) {
            const original = this.messageDisplay.textContent;
            const glitchChars = '!@#$%^&*()_+{}|:<>?~';
            const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
            const randomPos = Math.floor(Math.random() * original.length);
            
            const glitched = original.substring(0, randomPos) + randomChar + original.substring(randomPos + 1);
            this.messageDisplay.textContent = glitched;
            
            setTimeout(() => {
                this.messageDisplay.textContent = original;
            }, 50);
        }
    }
    
    shake() {
        this.messageDisplay.parentElement.style.animation = 'none';
        setTimeout(() => {
            this.messageDisplay.parentElement.style.animation = '';
        }, 10);
        
        if (window.horrorEffects) {
            window.horrorEffects.screenShake();
        }
    }
    
    setupSubmit() {
        this.submitBtn.addEventListener('click', () => {
            this.submit();
        });
        
        // Also allow Enter key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                this.submit();
            }
        });
    }
    
    async submit() {
        if (this.currentMessage.trim().length === 0) {
            this.shake();
            return;
        }
        
        if (this.currentMessage.length < 1) {
            alert('Your confession cannot be empty... the void demands words...');
            return;
        }
        
        // Dramatic effects on submit
        if (window.horrorEffects) {
            window.horrorEffects.playSubmitSound();
            window.horrorEffects.pauseBackgroundMusic();
            window.horrorEffects.screenShake();
        }
        
        // Show loading
        const loading = document.getElementById('loadingOverlay');
        loading.classList.add('active');
        
        try {
            // Submit to server
            const response = await fetch('/api/confessions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: this.currentMessage
                })
            });
            
            if (response.ok) {
                // Clear message
                this.currentMessage = '';
                this.updateDisplay();
                
                // Success feedback
                setTimeout(() => {
                    loading.classList.remove('active');
                    this.showSuccessMessage();
                    
                    // Resume music
                    if (window.horrorEffects) {
                        window.horrorEffects.resumeBackgroundMusic();
                    }
                }, 2000);
            } else {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || 'Failed to submit confession');
            }
        } catch (error) {
            console.error('Error submitting confession:', error);
            loading.classList.remove('active');
            
            alert('The void rejected your confession... ' + error.message);
            
            // Resume music if it was paused
            if (window.horrorEffects) {
                window.horrorEffects.resumeBackgroundMusic();
            }
        }
    }
    
    showSuccessMessage() {
        const message = document.createElement('div');
        message.className = 'confession new';
        message.style.position = 'fixed';
        message.style.top = '50%';
        message.style.left = '50%';
        message.style.transform = 'translate(-50%, -50%)';
        message.style.zIndex = '10000';
        message.style.padding = '2rem';
        message.style.fontSize = '1.5rem';
        message.style.textAlign = 'center';
        message.innerHTML = '<p style="font-family: Creepster, cursive;">Your sins have been cast into the void...</p>';
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.transition = 'all 1s ease-out';
            message.style.opacity = '0';
            message.style.transform = 'translate(-50%, -50%) scale(0.5)';
            setTimeout(() => message.remove(), 1000);
        }, 2000);
    }
    
    getMessage() {
        return this.currentMessage;
    }
    
    clear() {
        this.currentMessage = '';
        this.updateDisplay();
    }
}

// Initialize Ouija board
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.ouijaBoard = new OuijaBoard();
    });
} else {
    window.ouijaBoard = new OuijaBoard();
}
