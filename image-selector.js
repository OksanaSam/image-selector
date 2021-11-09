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
		`;
	}

	constructor() {
		super();
		this.wrap = false;
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
				aria-roledescription="Image Selector."
				class="${classMap(classes)}"
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

}
customElements.define('d2l-image-selector', ImageSelector);
