import { css, html, LitElement } from 'lit-element';

class CarouselSlide extends LitElement {

	static get properties() {
		return {
			actionText: { type: String },
			activeFocusable: { type: Boolean, reflect: true, attribute: 'active-focusable' }
		};
	}

	static get styles() {
		return css`
			:host {
				border-radius: 6px;
				display: block;
				position: relative;
				scroll-snap-align: start;
			}
			:host([hidden]) {
				display: none;
			}
			button {
				background-color: transparent;
				border-style: none;
				color: white;
				height: 100%;
				padding: 0;
				position: absolute;
				width: 100%;
			}
		`;
	}

	constructor() {
		super();
		this.activeFocusable = false;
		this.actionText = 'Use this item';
	}

	render() {
		return html`<button
				aria-roledescription="slide"
				tabindex="${this.activeFocusable ? 0 : -1}">
				${this.actionText}
			</button><slot></slot>`;
	}

	focus() {
		const elem = this.shadowRoot.querySelector('button');
		if (elem) elem.focus();
	}

}
customElements.define('d2l-carousel-slide', CarouselSlide);
