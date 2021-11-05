import { css, html, LitElement } from 'lit-element';

class CarouselSlide extends LitElement {

	static get properties() {
		return {
			actionText: { type: String, attribute: 'action-text' },
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
			button > div {
				visibility: hidden;
			}
			button:hover > div,
			button:focus > div {
				visibility: visible;
			}
			.d2l-carousel-slide-slot-container {
				line-height: 0;
			}
		`;
	}

	constructor() {
		super();
		this.activeFocusable = false;
		this.actionText = 'Use this item';
	}

	render() {
		return html`
			<button
				aria-roledescription="Slide"
				tabindex="${this.activeFocusable ? 0 : -1}">
				<div>
					${this.actionText}
				</div>
			</button>
			<div class="d2l-carousel-slide-slot-container">
				<slot></slot>
			</div>
		`;
	}

	focus() {
		const elem = this.shadowRoot.querySelector('button');
		if (elem) elem.focus();
	}

}
customElements.define('d2l-carousel-slide', CarouselSlide);
