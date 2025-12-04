# 🎃 Assets Setup Guide

## Required Assets for Full Experience

To complete the haunted experience, you need to add two types of assets:

---

## 1. 🎵 Background Music

### Location
`public/assets/sounds/`

### Required Files
- **background.mp3** - Primary audio file
- **background.ogg** - Fallback for browser compatibility (optional but recommended)

### Specifications
- **Format**: MP3 (primary), OGG (fallback)
- **Duration**: 2-5 minutes (loops automatically)
- **Volume**: Will be set to 30% by app
- **Style**: Dark ambient, atmospheric horror
- **Bitrate**: 128-192 kbps recommended
- **File Size**: Under 5MB recommended

### Behavior
- Starts playing on first keyboard interaction or click
- Loops continuously
- Can be muted with sound toggle (🔊/🔇)
- Respects user's sound preferences

### Where to Find Free Horror Music

#### Recommended Sources
1. **FreePD.com** - Public domain music
   - Search: "horror", "dark ambient", "creepy"
   
2. **Incompetech.com** (Kevin MacLeod)
   - Search: "dark", "horror", "suspense"
   - Attribution required (add to credits)
   
3. **YouTube Audio Library**
   - Filter by "Dark" or "Scary" mood
   - No attribution required
   
4. **Pixabay Music**
   - Search: "horror background", "dark ambient"
   - Free for commercial use
   
5. **Free Music Archive**
   - Search: "horror", "dark ambient", "drone"
   - Check individual licenses

#### Search Terms
- "dark ambient music"
- "horror background music"
- "creepy atmospheric music"
- "haunted house music"
- "supernatural ambience"
- "drone music dark"
- "horror game soundtrack"

### How to Add
```bash
# Download your music files
# Place them in the sounds folder:
cp your-music.mp3 public/assets/sounds/background.mp3
cp your-music.ogg public/assets/sounds/background.ogg
```

---

## 2. 👻 Haunted Image

### Location
`public/assets/images/`

### Required File
- **haunted.jpg** - Scary image shown on confession submission

### Specifications
- **Format**: JPG, PNG, or WebP
- **Resolution**: 1920x1080 or higher recommended
- **Aspect Ratio**: 16:9 preferred (but flexible)
- **File Size**: Under 500KB for fast loading
- **Style**: Dark, supernatural, genuinely scary

### Behavior
- Appears when user clicks SUBMIT button
- Shows for 3 seconds with pulsing/glitching effects
- Fades out smoothly
- Accompanied by dramatic sound effect

### Where to Find Free Horror Images

#### Recommended Sources
1. **Unsplash.com**
   - Search: "horror", "ghost", "dark", "creepy"
   - Free for commercial use, no attribution required
   
2. **Pexels.com**
   - Search: "scary", "haunted", "supernatural"
   - Free for commercial use
   
3. **Pixabay.com**
   - Search: "creepy", "ghost", "horror"
   - Free for commercial use
   
4. **Public Domain Images**
   - Old horror movie stills (check copyright)
   - Vintage horror illustrations

#### Search Terms
- "ghost figure"
- "haunted face"
- "dark entity"
- "supernatural apparition"
- "horror portrait"
- "creepy doll"
- "dark silhouette"

### Content Guidelines
- Should be unsettling but not offensive
- Avoid copyrighted movie characters
- Consider your audience (scary but not traumatizing)
- Dark/low-light images work best
- Faces or figures are most effective

### How to Add
```bash
# Download your image
# Place it in the images folder:
cp your-scary-image.jpg public/assets/images/haunted.jpg
```

---

## 3. 🎨 Generate Placeholder (Optional)

If you don't have assets yet, you can generate a placeholder haunted image:

### Steps
1. Open `public/assets/images/generate-placeholder.html` in your browser
2. Right-click the canvas and "Save Image As..."
3. Save as `haunted.jpg` in `public/assets/images/`

This creates a simple but effective placeholder with:
- Dark background
- Ghostly figure
- Glowing eyes
- "THE VOID SEES YOU" text

---

## 4. ✅ Verification

### Check if Assets are Working

#### Background Music
1. Start the app: `npm start`
2. Open http://localhost:3000
3. Click anywhere or press a key
4. You should hear atmospheric music playing
5. Check browser console for any audio errors

#### Haunted Image
1. Type a confession on the Ouija board
2. Click SUBMIT
3. You should see the haunted image appear
4. It should pulse/glitch for 3 seconds
5. Then fade out smoothly

### Troubleshooting

#### Music Not Playing
- Check file exists: `ls public/assets/sounds/background.mp3`
- Check browser console for errors
- Try clicking/typing to trigger autoplay
- Check if sound is muted (🔇 icon)
- Some browsers block autoplay - user interaction required

#### Image Not Showing
- Check file exists: `ls public/assets/images/haunted.jpg`
- Check browser console for 404 errors
- Verify file name is exactly `haunted.jpg`
- Check file permissions
- Try hard refresh (Ctrl+Shift+R)

#### File Path Issues
```bash
# Verify structure
ls -la public/assets/sounds/
ls -la public/assets/images/

# Should show:
# public/assets/sounds/background.mp3
# public/assets/images/haunted.jpg
```

---

## 5. 📝 Attribution (If Required)

If you use music that requires attribution, add credits to your README:

```markdown
## Credits

### Music
- Background music: "[Song Name]" by [Artist]
  - Source: [URL]
  - License: [License Type]

### Images
- Haunted image: "[Image Name]" by [Photographer]
  - Source: [URL]
  - License: [License Type]
```

---

## 6. 🎯 Recommended Assets

### Music Recommendations
1. **"Dark Fog"** by Kevin MacLeod (Incompetech)
   - Perfect dark ambient loop
   - Free with attribution
   
2. **"Creepy"** by Bensound
   - Atmospheric horror music
   - Free with attribution
   
3. Search YouTube Audio Library for:
   - "Dark Ambient" mood
   - "Scary" mood
   - Filter by "Loops" for seamless playback

### Image Recommendations
1. Search Unsplash for:
   - "ghost in fog"
   - "dark figure"
   - "haunted portrait"
   
2. Look for:
   - High contrast images
   - Dark backgrounds
   - Mysterious figures
   - Eerie faces

---

## 7. 🚀 Quick Setup

### Fast Track (5 minutes)
```bash
# 1. Find music (2 minutes)
# Go to YouTube Audio Library
# Download a dark ambient track
# Rename to background.mp3

# 2. Find image (2 minutes)
# Go to Unsplash.com
# Search "ghost dark"
# Download high-res image
# Rename to haunted.jpg

# 3. Place files (1 minute)
mv ~/Downloads/background.mp3 public/assets/sounds/
mv ~/Downloads/haunted.jpg public/assets/images/

# 4. Test
npm start
# Visit http://localhost:3000
```

---

## 8. ⚠️ Important Notes

### Browser Autoplay Policies
- Modern browsers block autoplay until user interaction
- Music starts on first click or keypress
- This is intentional and follows best practices

### File Formats
- **MP3**: Widely supported, good compression
- **OGG**: Better quality, not all browsers support
- **JPG**: Best for photos, good compression
- **PNG**: Better for graphics, larger files

### Performance
- Keep music file under 5MB
- Keep image under 500KB
- Compress files if needed
- Test on slow connections

### Accessibility
- Music can be muted
- Image appears briefly (3 seconds)
- Both enhance but aren't required for functionality

---

## 9. 🎊 Without Assets

The app works perfectly without these assets:
- ✅ All core functionality works
- ✅ Ouija board interaction
- ✅ Confession submission
- ✅ Real-time feed
- ✅ Horror effects
- ✅ Sound effects (Web Audio API)

Assets add:
- 🎵 Background music atmosphere
- 👻 Haunted image on submit

---

<div align="center">

## 👻 Ready to Haunt? 👻

Add your assets and experience the full horror!

🕯️ 💀 🕸️ 👻 ⚰️

</div>
