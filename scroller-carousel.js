import { css, html, LitElement } from 'lit-element';
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

class ScrollerCarousel extends LitElement {

	static get properties() {
		return {
			columnGap: { type: String, attribute: 'column-gap' },
			columnWidth: { type: String, attribute: 'column-width' }
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
			.d2l-scroller-carousel-container {
				display: grid;
				grid-auto-flow: column;
				overflow: hidden;
				overflow-x: auto;
				overscroll-behavior-x: contain;
				scroll-snap-type: x proximity;
			}
			@media (prefers-reduced-motion: no-preference) {
				.d2l-scroller-carousel-container {
					scroll-behavior: smooth;
				}
			}
		`;
	}

	firstUpdated() {
		super.firstUpdated();

		const items = this._getItems();
		if (items.length > 0) items[0].activeFocusable = true;
	}

	render() {
		const styles = {};
		if (this.columnGap) styles['grid-gap'] = this.columnGap;
		if (this.columnWidth) styles['grid-auto-columns'] = this.columnWidth;
		return html`
			<div
				class="d2l-scroller-carousel-container"
				@keydown="${this._handleKeyDown}"
				style="${styleMap(styles)}">
				<slot></slot>
			</div>
		`;
	}

	_getItems() {
		return this.shadowRoot.querySelector('slot').assignedNodes({ flatten: true })
			.filter(node => (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'D2L-SCROLLER-CAROUSEL-ITEM'));
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
			//forceFocusVisible(focusable);
		});

	}

}
customElements.define('d2l-scroller-carousel', ScrollerCarousel);
