---
inclusion: conditional
fileMatchPattern: "**/*.{html,css,js}"
---

# Accessibility in Horror - Never Compromise Usability

## Core Philosophy
Horror should be experienced by everyone. Accessibility makes the app MORE haunting, not less.

## Motion Sensitivity
```css
@media (prefers-reduced-motion: reduce) {
  /* Still haunted, just gentler */
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  /* Keep subtle effects */
  .candle { opacity: 0.8; } /* No flicker, just dim */
  .spirit { filter: blur(1px); } /* No float, just ethereal */
}
```

## Keyboard Navigation
- All interactive elements must have visible focus states
- Focus indicators should be MORE visible than normal (glowing, pulsing)
- Tab order must be logical
- Escape key always available to close modals/overlays

## Screen Readers
- Use aria-live for new confessions appearing
- Describe visual horror in atmospheric but clear terms
- Example: aria-label="Submit your confession to the void" not "Click here"

## Color Contrast
- Minimum 4.5:1 for body text
- Minimum 3:1 for large text and UI elements
- Test with tools, not just eyes
- Ghost white (#e0e0e0) on void black (#0a0a0a) = 16.9:1 ✓

## Sound Controls
- Mute button always visible and accessible
- Individual volume control for ambient vs effects
- Visual indicators when sound plays (for deaf users)
- Never auto-play at full volume

## Focus Management
- Trap focus in modals
- Return focus after dismissing overlays
- Skip links for long content
- Focus visible on all interactive elements
