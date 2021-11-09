# image-selector

## Instructions

1. Update `d2l-image-selector-image` to enable define a new `activeFocusable` property. This property will serve to control whether the rendered button will be focusable via keyboard `TAB`.
```javascript
static get properties() {
	return {
		activeFocusable: { type: Boolean, reflect: true, attribute: 'active-focusable' },
		...
	};
}
```
```javascript
constructor() {
	super();
	this.activeFocusable = false;
}
```
2. Update `d2l-image-selector-image`'s `render` method to conditionally render the `tabindex` of the `button`.
```javascript
render() {
	...
	return html`
		<button
			tabindex="${this.activeFocusable ? 0 : -1}" ...>
			...
		</button>
	`;
}
```
3. Update `d2l-image-selector-image` to define a custom `focus` method, that when called, will focus the local `button` element.
```javascript
focus() {
	const elem = this.shadowRoot.querySelector('button');
	if (elem) elem.focus();
}
```
4. Update `d2l-image-selector` to set the initial focusable element to the first element. Note: the `_getItems` method has been provided for you.
```javascript
firstUpdated() {
	super.firstUpdated();

	const items = this._getItems();
	if (items.length > 0) items[0].activeFocusable = true;
}
```
5. Update `d2l-image-selector`'s `render` method to handle the `keydown` event that bubbles up from the children. Update the `aria-roledescription` attribute to provide instruction for interacting with the selector using arrow keys. At minimum, handle `LEFT` and `RIGHT` arrow keys.  Optionally, you can handle `HOME`, `END`, and also the `RTL` scenario. Once the item has been determined, apply focus to it by calling its `focus` method (implemented in step 3 above). You'll also need to prevent the default behaviour of these keys. Note: `keyCodes` has been provided for you in the code, so there's no need to look them up.
```javascript
render() {
	...
	return html`
		<div
			aria-roledescription="Image Selector. Use the left and right arrow keys to navigate the images."
			@keydown="${this._handleKeyDown}" ...>
				<slot></slot>
		</div>
	`;
}
```
```javascript
async _handleKeyDown(e) {

	if (e.keyCode !== keyCodes.LEFT && e.keyCode !== keyCodes.RIGHT && e.keyCode !== keyCodes.HOME && e.keyCode !== keyCodes.END) return;

	const items = this._getItems();
	const currentIndex = items.findIndex(item => item.activeFocusable);

	let newIndex = currentIndex;
	items[currentIndex].activeFocusable = false;
	if (this._dir === 'rtl' && e.keyCode === keyCodes.LEFT) {
		if (currentIndex === items.length - 1) newIndex = 0;
		else newIndex = currentIndex + 1;
	} else if (this._dir === 'rtl' && e.keyCode === keyCodes.RIGHT) {
		if (currentIndex === 0) newIndex = items.length - 1;
		else newIndex = currentIndex - 1;
	} else if (e.keyCode === keyCodes.LEFT) {
		if (currentIndex === 0) newIndex = items.length - 1;
		else newIndex = currentIndex - 1;
	} else if (e.keyCode === keyCodes.RIGHT) {
		if (currentIndex === items.length - 1) newIndex = 0;
		else newIndex = currentIndex + 1;
	} else if (e.keyCode === keyCodes.HOME) {
		newIndex = 0;
	} else if (e.keyCode === keyCodes.END) {
		newIndex = items.length - 1;
	}

	// prevent default so page doesn't scroll when hitting HOME/END
	e.preventDefault();

	items[newIndex].activeFocusable = true;
	await items[newIndex].updateComplete;
	requestAnimationFrame(() => {
		items[newIndex].focus();
	});

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
