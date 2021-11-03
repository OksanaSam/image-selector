import { css, html, LitElement } from 'lit-element';

class ScrollerCarouselItem extends LitElement {

	static get properties() {
		return {
			activeFocusable: { type: Boolean, reflect: true, attribute: 'active-focusable' }
		};
	}

	static get styles() {
		return css`
			:host {
				border: 1px solid black;
				border-radius: 6px;
				display: block;
				height: 150px;
				scroll-snap-align: start;
			}
			:host([hidden]) {
				display: none;
			}
			a {
				display: block;
				height: 100%;
			}
		`;
	}

	constructor() {
		super();
		this.activeFocusable = false;
	}

	render() {
		return html`
			<a href="https://www.google.com" tabindex="${this.activeFocusable ? 0 : -1}"></a>
		`;
	}

	focus() {
		const elem = this.shadowRoot.querySelector('a');
		if (elem) elem.focus();
	}

}
customElements.define('d2l-scroller-carousel-item', ScrollerCarouselItem);
