# Whispers from the Void - Project Structure

## Tech Stack
- Frontend: HTML5, CSS3, Vanilla JavaScript
- Backend: Node.js + Express
- Database: JSON file storage (simple, hackathon-ready)
- Real-time: Server-Sent Events (SSE)

## Directory Structure
```
whispers-from-the-void/
├── .kiro/
│   ├── steering/          # Custom guidelines
│   └── hooks/             # Agent hooks
├── public/
│   ├── index.html         # Main séance interface
│   ├── css/
│   │   ├── main.css       # Core haunted styles
│   │   ├── ouija.css      # Ouija board component
│   │   └── effects.css    # Horror animations
│   ├── js/
│   │   ├── app.js         # Main application
│   │   ├── ouija.js       # Ouija board interaction
│   │   ├── confessions.js # Confession handling
│   │   └── effects.js     # Horror effects engine
│   └── assets/
│       ├── sounds/        # Eerie audio
│       ├── images/        # Ghostly visuals
│       └── fonts/         # Creepy typography
├── server/
│   ├── server.js          # Express server
│   ├── confessions.json   # Data storage
│   └── api.js             # API routes
├── spec.md                # Kiro spec document
└── package.json
```
