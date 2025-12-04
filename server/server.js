// Whispers from the Void - Express Server

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Data file path
const DATA_FILE = path.join(__dirname, 'confessions.json');

// SSE clients
let sseClients = [];

// Initialize data file
async function initDataFile() {
    try {
        await fs.access(DATA_FILE);
    } catch {
        await fs.writeFile(DATA_FILE, JSON.stringify({ confessions: [] }, null, 2));
    }
}

// Load confessions
async function loadConfessions() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading confessions:', error);
        return { confessions: [] };
    }
}

// Save confessions
async function saveConfessions(data) {
    try {
        await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error saving confessions:', error);
    }
}

// Profanity filter (basic)
function filterProfanity(text) {
    const badWords = ['fuck', 'shit', 'damn', 'bitch', 'ass', 'hell'];
    let filtered = text;
    badWords.forEach(word => {
        const regex = new RegExp(word, 'gi');
        filtered = filtered.replace(regex, '*'.repeat(word.length));
    });
    return filtered;
}

// Rate limiting map
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS = 5;

function checkRateLimit(ip) {
    const now = Date.now();
    const userRequests = rateLimitMap.get(ip) || [];
    
    // Remove old requests
    const recentRequests = userRequests.filter(time => now - time < RATE_LIMIT_WINDOW);
    
    if (recentRequests.length >= MAX_REQUESTS) {
        return false;
    }
    
    recentRequests.push(now);
    rateLimitMap.set(ip, recentRequests);
    return true;
}

// Routes

// Get all confessions
app.get('/api/confessions', async (req, res) => {
    try {
        const data = await loadConfessions();
        // Return last 20 confessions
        const recent = data.confessions.slice(-20).reverse();
        res.json({ confessions: recent });
    } catch (error) {
        res.status(500).json({ error: 'Failed to load confessions' });
    }
});

// Submit new confession
app.post('/api/confessions', async (req, res) => {
    try {
        const { text } = req.body;
        const ip = req.ip || req.connection.remoteAddress;
        
        // Rate limiting
        if (!checkRateLimit(ip)) {
            return res.status(429).json({ error: 'Too many confessions. The void needs time to process...' });
        }
        
        // Validation
        if (!text || typeof text !== 'string') {
            return res.status(400).json({ error: 'Invalid confession' });
        }
        
        if (text.length < 1) {
            return res.status(400).json({ error: 'Confession too short' });
        }
        
        if (text.length > 500) {
            return res.status(400).json({ error: 'Confession too long' });
        }
        
        // Filter profanity (optional - keep it spooky but not offensive)
        const filteredText = filterProfanity(text.trim());
        
        // Create confession
        const confession = {
            id: crypto.randomBytes(16).toString('hex'),
            text: filteredText,
            timestamp: Date.now()
        };
        
        // Load, add, and save
        const data = await loadConfessions();
        data.confessions.push(confession);
        
        // Keep only last 100 confessions
        if (data.confessions.length > 100) {
            data.confessions = data.confessions.slice(-100);
        }
        
        await saveConfessions(data);
        
        // Broadcast to SSE clients
        broadcastConfession(confession);
        
        res.status(201).json({ success: true, confession });
    } catch (error) {
        console.error('Error submitting confession:', error);
        res.status(500).json({ error: 'Failed to submit confession' });
    }
});

// Server-Sent Events stream
app.get('/api/confessions/stream', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    
    // Add client to list
    const clientId = Date.now();
    const client = { id: clientId, res };
    sseClients.push(client);
    
    console.log(`SSE client connected: ${clientId}`);
    
    // Send initial connection message
    res.write(`data: ${JSON.stringify({ type: 'connected', message: 'The void acknowledges your presence...' })}\n\n`);
    
    // Remove client on disconnect
    req.on('close', () => {
        sseClients = sseClients.filter(c => c.id !== clientId);
        console.log(`SSE client disconnected: ${clientId}`);
    });
});

// Broadcast confession to all SSE clients
function broadcastConfession(confession) {
    const data = `data: ${JSON.stringify(confession)}\n\n`;
    sseClients.forEach(client => {
        try {
            client.res.write(data);
        } catch (error) {
            console.error('Error broadcasting to client:', error);
        }
    });
    console.log(`Broadcasted confession to ${sseClients.length} clients`);
}

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'alive',
        message: 'The void is listening...',
        clients: sseClients.length
    });
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Start server
async function start() {
    await initDataFile();
    app.listen(PORT, () => {
        console.log('');
        console.log('👻 ═══════════════════════════════════════════════════════ 👻');
        console.log('');
        console.log('           🕯️  WHISPERS FROM THE VOID  🕯️');
        console.log('');
        console.log('👻 ═══════════════════════════════════════════════════════ 👻');
        console.log('');
        console.log(`   🌙 Server haunting at: http://localhost:${PORT}`);
        console.log(`   💀 The void is listening...`);
        console.log(`   🕸️  Press Ctrl+C to banish the spirits`);
        console.log('');
        console.log('👻 ═══════════════════════════════════════════════════════ 👻');
        console.log('');
    });
}

start();

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('👻 The spirits are departing...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('\n👻 The séance has ended...');
    process.exit(0);
});
