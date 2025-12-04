# 👻 Quick Start Guide

## Get Haunted in 3 Steps

### Step 1: Install
```bash
npm install
```

### Step 2: Start
```bash
npm start
```

### Step 3: Visit
Open your browser to: **http://localhost:3000**

---

## 🎮 How to Use

### Confess Your Sins
1. Hover over letters on the Ouija board
2. Click letters to spell your confession
3. Click **GOODBYE** to submit to the void
4. Watch your confession materialize in the feed

### Keyboard Shortcuts
- **Type directly** - Letters appear automatically
- **Backspace** - Delete characters
- **Ctrl/Cmd + Enter** - Submit confession
- **Escape** - Clear confession

### Controls
- **🔊** - Toggle sound effects
- **✨** - Toggle animations

---

## 🎃 Easter Eggs

Try these for extra scares:

1. **Konami Code**: ↑ ↑ ↓ ↓ ← → ← → B A
2. **Blood Moon**: Click the red moon 3 times
3. **Console**: Open developer tools for spooky messages

---

## ⚠️ Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm start
```

### Sound Not Working
- Click anywhere on the page first (browser requirement)
- Check if sound is muted (🔇 icon)
- Try refreshing the page

### Animations Laggy
- Close other browser tabs
- Disable animations with ⏸️ button
- Use a modern browser (Chrome, Firefox, Safari, Edge)

---

## 🚀 Development

### File Structure
```
public/          # Frontend files
  css/           # Styles
  js/            # Client-side logic
  index.html     # Main page
server/          # Backend
  server.js      # Express server
.kiro/           # Kiro configuration
  steering/      # Design system rules
  hooks/         # Automation hooks
```

### Making Changes
1. Edit files in `public/` or `server/`
2. Refresh browser (frontend changes)
3. Restart server (backend changes)

### Using Kiro Features
- **Specs**: See `spec.md` for project plan
- **Steering**: Check `.kiro/steering/` for design rules
- **Hooks**: View `.kiro/hooks/` for automation

---

## 📚 Documentation

- **README.md** - Full project documentation
- **KIRO_FEATURES.md** - How we used Kiro
- **HACKATHON_SUBMISSION.md** - Hackathon details
- **spec.md** - Project specification

---

## 🎯 Tips for Best Experience

### For Maximum Horror
- Use headphones
- Turn off lights
- Full screen mode (F11)
- Don't use at 3 AM (seriously)

### For Development
- Read the steering docs first
- Use the Spookify hook for quick iterations
- Reference the spec for feature details
- Check hooks for automation examples

---

<div align="center">

**👻 Happy Haunting! 👻**

*Questions? The void has answers...*

</div>
