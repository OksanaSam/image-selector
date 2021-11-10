# Step 5 - Reduce Data

## Instructions

1. Update `d2l-image-selector-image` to lazy load images by specifying the `loading="lazy"` attribute.
```javascript
render() {
	return html`
		<button ...>
			<img loading="lazy" src="${this.imageSrc}" ...>
			...
		</button>
	`;
}
```
2. Update `d2l-image-selector-image` to hide the images using the `prefers-reduced-data: reduce` media-query.
```css
@media (prefers-reduced-data: reduce) {
	img {
		display: none;
	}
}
```
3. Use the `matchMedia` browser API in `d2l-image-selector-image` to query the user's preference, and conditionally place the image description offscreen so the selector us usable by non-screen reader users.
```javascript
const reduceData = matchMedia('(prefers-reduced-data: reduce)');
```
```javascript
render() {
	const descriptionClasses = {
		'd2l-image-selector-image-description': true
	};
	if (!reduceData.matches) descriptionClasses['d2l-offscreen'] = true;
	return html`
		<button>
			...
			<span class="${classMap(descriptionClasses)}">${this.imageDescription}</span>
			...
		</button>
	`;
}
```
4. Optionally respond to changes in the user's `prefers-reduced-data` OS preference. If this is not done, you must refresh the page after toggling the emulation setting in order for the conditional rendering to be applied.
```javascript
connectedCallback() {
	super.connectedCallback();
	reduceData.addEventListener('change', () => this.requestUpdate());
}
```
