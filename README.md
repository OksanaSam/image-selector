# image-selector

## Instructions

1. Update `d2l-image-selector` to define two knew properties. The `columnGap` property will be used to control the spacing between items in the grid. The `wrap` property will control whether the items in the grid scroll horizontally or wrap to scroll vertically.
```javascript
static get properties() {
	return {
		...
		columnGap: { type: String, attribute: 'column-gap' },
		wrap: { type: Boolean, reflect: true }
	};
}
```
```javascript
constructor() {
	super();
	this.wrap = false;
}
```
2. Update `d2l-image-selector`'s `render` method to conditionally render a class for wrapping vs no-wrapping. Also, conditionally render the `grid-gap` style property if a `columnGap` has been provided by the consumer.
```javascript
render() {
	const classes = { 'd2l-image-selector-container': true };
	classes[this.wrap ? 'd2l-image-selector-container-wrap' : 'd2l-image-selector-container-nowrap'] = true;

	const styles = {};
	if (this.columnGap) styles['grid-gap'] = this.columnGap;

	return html`
		<div
			...
			class="${classMap(classes)}"
			style="${styleMap(styles)}">
				<slot></slot>
		</div>
	`;
}
```
3. Update `d2l-image-selector`'s styles block to specify the `grid` layout for the wrapping and no-wrapping cases.
```css
.d2l-image-selector-container {
	display: grid;
	overflow: hidden;
}
.d2l-image-selector-container-nowrap {
	grid-auto-columns: 250px;
	grid-auto-flow: column;
	overflow-x: auto;
}
.d2l-image-selector-container-wrap {
	grid-auto-flow: row;
	grid-template-columns: repeat(auto-fill, 250px);
}
```
4. Update the `index.html` page to specify the `column-grap` and `wrap` properties for the two examples.
```html
<d2l-image-selector label="Activity Image" column-gap="20px">
	...
</d2l-image-selector>

<d2l-image-selector label="Activity Selector" column-gap="20px" wrap>
	...
</d2l-image-selector>
```
5. For some fancy scrolling, update `d2l-image-selector` to specify `scroll-padding` and `scroll-snap-type` for the no-wrapping case. Also update `d2l-image-selector-image` to specify the `scroll-snap-align` property which controls the scroll-snap alignment.
```css
.d2l-image-selector-container-nowrap {
	...
	scroll-padding: 40px;
	scroll-snap-type: x proximity;
}
```
```css
:host {
	...
	scroll-snap-align: start;
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
