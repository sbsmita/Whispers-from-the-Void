---
inclusion: always
---

# Horror Design System - Steering Rules

## Core Principles
Every element must contribute to the haunting atmosphere. This is not just dark mode - it's a descent into supernatural horror.

## Visual Guidelines

### Color Usage
- **Never use pure white** - always use ghost white (#e0e0e0) or dimmer
- **Shadows are alive** - use multiple layered shadows with red/green tints
- **Glows are spectral** - prefer green (#00ff41) or sickly yellow (#ffff00)
- **Blood accents sparingly** - red (#8b0000) for emphasis only

### Animation Standards
- **Nothing is static** - everything subtly moves, flickers, or breathes
- **Timing is erratic** - use random delays and durations for unease
- **Easing is unnatural** - prefer steps() or cubic-bezier with sharp curves
- **Combine effects** - layer multiple animations for complexity

### Typography Rules
- **Text should feel aged** - use text-shadow for blur/decay
- **Letters can glitch** - occasional character replacement or distortion
- **Readability matters** - horror shouldn't break accessibility
- **Fonts must be creepy** - cursive for spirits, monospace for mechanical horror

## Interaction Patterns

### Hover States
- Elements recoil or advance toward cursor
- Shadows intensify or retreat
- Sounds trigger on hover (subtle)
- Color shifts to more intense versions

### Click/Tap Feedback
- Screen shake or pulse
- Audio feedback (always)
- Visual distortion at click point
- Ripple effects in blood or ectoplasm

### Loading States
- Never use spinners - use occult symbols, pulsing eyes, or breathing effects
- Show "summoning" or "channeling" messages
- Candles flicker more intensely during loads

## Sound Design

### Audio Principles
- **Ambient layer always present** - low whispers, wind, distant sounds
- **Interaction sounds** - every click, hover, type action has audio
- **Dynamic mixing** - sounds fade in/out based on activity
- **Volume control** - user can mute, but default is atmospheric

### Sound Categories
- Whispers: Unintelligible voices, layered
- Environmental: Wind, creaking, dripping
- Supernatural: Ethereal tones, reverse audio
- Interaction: Clicks, scrapes, thuds

## Performance Considerations
- Animations must be 60fps - use transform and opacity only
- Sounds should be compressed and preloaded
- Particle effects limited to 50-100 elements max
- Use CSS animations over JavaScript when possible

## Accessibility Requirements
- Provide reduced motion option (still haunted, just less intense)
- Maintain 4.5:1 contrast ratio minimum
- All interactive elements keyboard accessible
- Screen reader text should be atmospheric but clear
- Option to disable sound effects

## Code Style for Horror
```css
/* Good - Layered, complex, unsettling */
.spirit {
  animation: float 3s ease-in-out infinite,
             flicker 0.1s steps(2) infinite,
             fade 5s ease-in-out infinite;
  filter: blur(1px) drop-shadow(0 0 10px #00ff41);
}

/* Bad - Simple, predictable */
.spirit {
  animation: fadeIn 1s;
}
```

## Testing Checklist
- [ ] Does it make you uncomfortable?
- [ ] Are there at least 3 simultaneous animations?
- [ ] Does sound enhance the horror?
- [ ] Is it still usable despite being creepy?
- [ ] Would you use this at 3 AM alone?
