import '@brightspace-ui/core/components/colors/colors.js';
import { css, html, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { offscreenStyles } from '@brightspace-ui/core/components/offscreen/offscreen.js';

class ImageSelectorImage extends LitElement {

	static get properties() {
		return {
			imageSrc: { type: String, attribute: 'image-src' },
			imageDescription: { type: String, attribute: 'image-description' }
		};
	}

	static get styles() {
		return [ labelStyles, offscreenStyles, css`
			:host {
				border-radius: 6px;
				display: block;
				line-height: 0;
				overflow: hidden;
				scroll-snap-align: start;
			}
			:host([hidden]) {
				display: none;
			}
			button {
				background-color: transparent;
				border-style: none;
				height: 100%;
				line-height: 0;
				outline: none;
				padding: 0;
				position: relative;
				width: 100%;
			}
			.d2l-image-selector-image-description {
				color: white;
				line-height: 1rem;
			}
			.d2l-image-selector-image-text-container {
				color: white;
				margin-top: -12px;
				opacity: 0;
				position: absolute;
				top: calc(50% - 0.5rem - 8px);
				width: 100%;
			}
			.d2l-image-selector-image-text {
				background-color: var(--d2l-color-celestine);
				border-radius: 5px;
				box-shadow: 0 0.1rem 0.6rem 0 rgba(0, 0, 0, 0.3);
				display: inline-block;
				padding: 8px;
			}
			button:hover > .d2l-image-selector-image-text-container,
			button:focus > .d2l-image-selector-image-text-container {
				margin-top: 0;
				opacity: 1;
			}
			img {
				border-radius: 6px;
				width: 100%;
			}
		`];
	}

	render() {
		const descriptionClasses = {
			'd2l-image-selector-image-description': true,
			'd2l-offscreen': true
		};
		return html`
			<button
				aria-roledescription="Image Selector Button">
				<img src="${this.imageSrc}" aria-hidden="true">
				<span class="${classMap(descriptionClasses)}">${this.imageDescription}</span>
				<div class="d2l-image-selector-image-text-container">
					<div class="d2l-image-selector-image-text d2l-label-text">Use this image</div>
				</div>
			</button>
		`;
	}

}
customElements.define('d2l-image-selector-image', ImageSelectorImage);
