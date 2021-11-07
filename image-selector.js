import { css, html, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import { styleMap } from 'lit-html/directives/style-map.js';

const keyCodes = Object.freeze({
	ENTER: 13,
	END: 35,
	HOME: 36,
	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40
});

class ImageSelector extends LitElement {

	static get properties() {
		return {
			columnGap: { type: String, attribute: 'column-gap' },
			label: { type: String },
			wrap: { type: Boolean, reflect: true }
		};
	}

	static get styles() {
		return css`
			:host {
				display: block;
			}
			:host([hidden]) {
				display: none;
			}
			.d2l-image-selector-container {
				display: grid;
				overflow: hidden;
			}
			.d2l-image-selector-container-nowrap {
				grid-auto-columns: 250px;
				grid-auto-flow: column;
				overflow-x: auto;
				overscroll-behavior-x: contain;
				scroll-padding: 40px;
				scroll-snap-type: x proximity;
			}
			.d2l-image-selector-container-wrap {
				grid-auto-flow: row;
				grid-template-columns: repeat(auto-fill, 250px);
			}
			@media (prefers-reduced-motion: no-preference) {
				.d2l-image-selector-container {
					scroll-behavior: smooth;
				}
			}
		`;
	}

	constructor() {
		super();
		this.wrap = false;
	}

	firstUpdated() {
		super.firstUpdated();

		const items = this._getItems();
		if (items.length > 0) items[0].activeFocusable = true;
	}

	render() {
		const classes = {
			'd2l-image-selector-container': true,
		};
		classes[this.wrap ? 'd2l-image-selector-container-wrap' : 'd2l-image-selector-container-nowrap'] = true;
		const styles = {};
		if (this.columnGap) styles['grid-gap'] = this.columnGap;
		return html`
			<div
				aria-label="${this.label}"
				aria-roledescription="Image Selector. Use the left and right arrow keys to navigate the images."
				class="${classMap(classes)}"
				@keydown="${this._handleKeyDown}"
				role="group"
				style="${styleMap(styles)}">
				<slot></slot>
			</div>
		`;
	}

	_getItems() {
		return this.shadowRoot.querySelector('slot').assignedNodes({ flatten: true })
			.filter(node => (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'D2L-IMAGE-SELECTOR-IMAGE'));
	}

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

}
customElements.define('d2l-image-selector', ImageSelector);
