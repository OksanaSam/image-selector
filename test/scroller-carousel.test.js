import '../scroller-carousel.js';
import '../scroller-carousel-item.js';
import { expect, fixture, html } from '@open-wc/testing';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';

describe('ScrollerCarousel', () => {

	describe('accessibility', () => {
		it('should pass all aXe tests', async() => {
			const el = await fixture(html`<d2l-scroller-carousel></d2l-scroller-carousel>`);
			await expect(el).to.be.accessible();
		});
	});

	describe('constructor', () => {
		it('should construct', () => {
			runConstructor('d2l-scroller-carousel');
		});
		it('should construct', () => {
			runConstructor('d2l-scroller-carousel-item');
		});
	});

});
