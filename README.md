# image-selector

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
firstUpdated(changedProperties) {
	super.firstUpdated(changedProperties);
	reduceData.addEventListener('change', () => this.requestUpdate());
}
```

## Developing, Testing and Contributing

After cloning the repo, run `npm install` to install dependencies.

### Linting

```shell
# eslint and lit-analyzer
npm run lint

# eslint only
npm run lint:eslint
```

### Testing

```shell
# lint & run headless unit tests
npm test

# unit tests only
npm run test:headless

# debug or run a subset of local unit tests
npm run test:headless:watch
```

### Running the demos

To start a [@web/dev-server](https://modern-web.dev/docs/dev-server/overview/) that hosts the demo page and tests:

```shell
npm start
```
