import { css, html, LitElement } from 'lit-element';

class ScrollerCarouselItem extends LitElement {

	static get properties() {
		return {
			activeFocusable: { type: Boolean, reflect: true, attribute: 'active-focusable' },
			href: { type: String, reflect: true },
			imageSrc: { type: String, reflect: true, attribute: 'image-src' },
			text: { type: String, reflect: true }
		};
	}

	static get styles() {
		return css`
			:host {
				margin: 10px;
				border-radius: 6px;
				display: block;
				height: 150px;
				scroll-snap-align: start;
				width: 100%;
			}
			:host([hidden]) {
				display: none;
			}
			a {
				display: block;
				height: 100%;
				text-decoration: none;
			}
			figure {
				margin: 0;
			}
			figcaption {
				color: black;
				font-size: 1.2rem;
			}
			picture > img {
				width: 100%;
				border-radius: 6px;
			}
		`;
	}

	constructor() {
		super();
		this.activeFocusable = false;
	}

	render() {
		return html`
			<a href=${this.href} tabindex="${this.activeFocusable ? 0 : -1}">
				<figure>
					<picture>
						<img src=${this.imageSrc} alt="" style="width:auto;">

					</picture>
					<figcaption>
						${this.text}
					</figcaption>
				</figure>
			</a>`;
	}

	focus() {
		const elem = this.shadowRoot.querySelector('a');
		if (elem) elem.focus();
	}

}
customElements.define('d2l-scroller-carousel-item', ScrollerCarouselItem);
