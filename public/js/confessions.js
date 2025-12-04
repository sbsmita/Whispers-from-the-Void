// Confession Feed Management

class ConfessionFeed {
    constructor() {
        this.container = document.getElementById('voidContainer');
        this.confessions = [];
        this.maxConfessions = 20;
        this.eventSource = null;
        
        this.init();
    }
    
    init() {
        this.loadConfessions();
        this.setupSSE();
        this.startDecayTimer();
    }
    
    async loadConfessions() {
        try {
            const response = await fetch('/api/confessions');
            const data = await response.json();
            
            if (data.confessions && data.confessions.length > 0) {
                // Clear empty state
                this.container.innerHTML = '';
                
                // Display confessions in reverse order (newest first)
                // Filter out any empty or invalid confessions
                const validConfessions = data.confessions.filter(c => c.text && c.text.trim().length > 0);
                validConfessions.reverse().forEach(confession => {
                    this.addConfession(confession, false);
                });
            }
        } catch (error) {
            console.error('Error loading confessions:', error);
        }
    }
    
    setupSSE() {
        // Server-Sent Events for real-time updates
        this.eventSource = new EventSource('/api/confessions/stream');
        
        this.eventSource.onmessage = (event) => {
            try {
                const confession = JSON.parse(event.data);
                
                // Only add if it's a valid confession (not a system message)
                if (confession.text && confession.text.trim().length > 0 && confession.id) {
                    this.addConfession(confession, true);
                }
            } catch (e) {
                console.log('SSE message parse error:', e);
            }
        };
        
        this.eventSource.onerror = (error) => {
            console.error('SSE Error:', error);
            // Reconnect after 5 seconds
            setTimeout(() => {
                this.setupSSE();
            }, 5000);
        };
    }
    
    addConfession(confession, isNew = false) {
        // Validate confession
        if (!confession || !confession.text || confession.text.trim().length === 0) {
            console.log('Skipping invalid confession');
            return;
        }
        
        // Remove empty state if present
        const emptyState = this.container.querySelector('.void-empty');
        if (emptyState) {
            emptyState.remove();
        }
        
        // Check if confession already exists (prevent duplicates)
        if (confession.id && this.container.querySelector(`[data-id="${confession.id}"]`)) {
            console.log('Confession already exists, skipping');
            return;
        }
        
        // Create confession element
        const confessionEl = document.createElement('div');
        confessionEl.className = 'confession';
        if (isNew) {
            confessionEl.classList.add('new');
        }
        confessionEl.dataset.id = confession.id;
        confessionEl.dataset.timestamp = confession.timestamp;
        
        // Format time
        const timeAgo = this.getTimeAgo(confession.timestamp);
        
        // Safely get confession ID
        const confessionId = confession.id ? confession.id.substring(0, 8) : 'unknown';
        
        confessionEl.innerHTML = `
            <p class="confession-text">${this.sanitize(confession.text)}</p>
            <div class="confession-meta">
                <span class="confession-time">${timeAgo}</span>
                <span class="confession-id">Soul #${confessionId}</span>
            </div>
        `;
        
        // Add to container (prepend for newest first)
        this.container.insertBefore(confessionEl, this.container.firstChild);
        
        // Add to tracking array
        this.confessions.unshift(confession);
        
        // Limit number of confessions
        if (this.confessions.length > this.maxConfessions) {
            const oldest = this.confessions.pop();
            const oldestEl = this.container.querySelector(`[data-id="${oldest.id}"]`);
            if (oldestEl) {
                oldestEl.classList.add('decaying');
                setTimeout(() => oldestEl.remove(), 3000);
            }
        }
        
        // Play sound for new confessions
        if (isNew && window.horrorEffects) {
            window.horrorEffects.playClickSound();
            
            // Glitch effect
            setTimeout(() => {
                window.horrorEffects.glitchElement(confessionEl);
            }, 500);
        }
        
        // Random glitch effect
        if (Math.random() > 0.7) {
            setTimeout(() => {
                this.glitchConfession(confessionEl);
            }, Math.random() * 2000);
        }
    }
    
    glitchConfession(element) {
        const text = element.querySelector('.confession-text');
        if (!text) return;
        
        const original = text.textContent;
        const glitchChars = '█▓▒░!@#$%^&*()_+{}|:<>?~';
        
        // Replace random characters
        let glitched = '';
        for (let i = 0; i < original.length; i++) {
            if (Math.random() > 0.9) {
                glitched += glitchChars[Math.floor(Math.random() * glitchChars.length)];
            } else {
                glitched += original[i];
            }
        }
        
        text.textContent = glitched;
        
        // Restore after brief moment
        setTimeout(() => {
            text.textContent = original;
        }, 100);
    }
    
    startDecayTimer() {
        // Update time displays every minute
        setInterval(() => {
            const confessionEls = this.container.querySelectorAll('.confession');
            confessionEls.forEach(el => {
                const timestamp = parseInt(el.dataset.timestamp);
                const timeAgo = this.getTimeAgo(timestamp);
                const timeEl = el.querySelector('.confession-time');
                if (timeEl) {
                    timeEl.textContent = timeAgo;
                }
                
                // Add decay effect to old confessions
                const age = Date.now() - timestamp;
                const tenMinutes = 10 * 60 * 1000;
                if (age > tenMinutes) {
                    el.style.opacity = Math.max(0.3, 1 - (age - tenMinutes) / tenMinutes);
                }
            });
        }, 60000);
    }
    
    getTimeAgo(timestamp) {
        const now = Date.now();
        const diff = now - timestamp;
        
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        
        if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
        if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        return 'just now';
    }
    
    sanitize(text) {
        // Basic XSS protection
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    destroy() {
        if (this.eventSource) {
            this.eventSource.close();
        }
    }
}

// Initialize confession feed
let confessionFeed;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        confessionFeed = new ConfessionFeed();
    });
} else {
    confessionFeed = new ConfessionFeed();
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (confessionFeed) {
        confessionFeed.destroy();
    }
});
