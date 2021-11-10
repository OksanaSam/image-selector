# image-selector

## Highlights

* Usage of Aria
* Fluid Layout
* Custom keyboard navigation
* Reduced motion
* Reduced data

## Instructions

1. Update `d2l-image-selector` to define a `label` property that will be used to label the selector.
```javascript
static get properties() {
	return {
		label: { type: String }
	};
}
```
2. Update `d2l-image-selector` to specify the `role`, `aria-label`, and `aria-roledescription` attributes. These will provide necessary context and semantics as the user navigates the child items.
```javascript
render() {
	...
	return html`
		<div
			aria-label="${this.label}"
			aria-roledescription="Image Selector."
			role="group">
				<slot></slot>
		</div>
	`;
}
```
3. Update `d2l-image-selector-image` to specify the `aria-roledescription` attribute to provide a better description for screen reader users.  In addition, add the `aria-hidden="true"` attribute to the `img` element since the description will be rendered offscreen.
```javascript
render() {
	return html`
		<button
			aria-roledescription="Image Selector Button">
			<img src="${this.imageSrc}" aria-hidden="true">
			...
		</button>
	`;
}
```
4. Update `index.html` to specify a label for the `d2l-image-selector`s.
```html
<d2l-image-selector label="Activity Image">
	...
<d2l-image-selector>
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
