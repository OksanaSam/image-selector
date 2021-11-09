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

	static get styles() {
		return css`
			:host {
				display: block;
			}
			:host([hidden]) {
				display: none;
			}
		`;
	}

	render() {
		const classes = {
			'd2l-image-selector-container': true
		};
		return html`
			<div class="${classMap(classes)}">
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
