# Step 4 - Motion

## Instructions

1. Update `d2l-image-selector` to enable smooth scrolling if the user has no preference for motion.
```css
@media (prefers-reduced-motion: no-preference) {
	.d2l-image-selector-container {
		scroll-behavior: smooth;
	}
}
```
2. Update `d2l-image-selector-image` to fade and slide the button text into place when focusing or hovering. As above, only enable the animation/transition if the user has no preference.
```css
@media (prefers-reduced-motion: no-preference) {
	.d2l-image-selector-image-text-container {
		transition: opacity 200ms linear, margin 200ms linear;
	}
}
```
