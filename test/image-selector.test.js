import '../image-selector.js';
import '../image-selector-image.js';
import { expect, fixture, html } from '@open-wc/testing';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';

describe('image-selector', () => {

	describe('accessibility', () => {
		it('should pass all aXe tests', async() => {
			const el = await fixture(html`
				<d2l-image-selector>
					<d2l-image-selector-image
						image-src="https://s.brightspace.com/course-images/images/c8e4390b-d96b-40cd-8ffc-a00c1a24f2f4/tile-high-density-min-size.jpg"
						image-description="A strange tunnel.">
					</d2l-image-selector-image>
				</d2l-image-selector>
			`);
			await expect(el).to.be.accessible();
		});
	});

	describe('constructor', () => {
		it('should construct', () => {
			runConstructor('d2l-image-selector');
		});
		it('should construct', () => {
			runConstructor('d2l-image-selector-image');
		});
	});

});
