# image-selector

## Instructions

1. Update `d2l-image-selector` to enable smooth scrolling if the user has no preference for motion.
```css
@media (prefers-reduced-motion: no-preference) {
	.d2l-image-selector-container {
		scroll-behavior: smooth;
	}
}
```
2. Update `d2l-image-selector-image` to fade and slide the button text into place when focusing or hovering. As above, only enable the animation/transition if the user has no preference.
```css
@media (prefers-reduced-motion: no-preference) {
	.d2l-image-selector-image-text-container {
		transition: opacity 200ms linear, margin 200ms linear;
	}
}
```

## Developing, Testing and Contributing

After cloning the repo, run `npm install` to install dependencies.

### Linting

```shell
# eslint and lit-analyzer
npm run lint

# eslint only
npm run lint:eslint
```

### Testing

```shell
# lint & run headless unit tests
npm test

# unit tests only
npm run test:headless

# debug or run a subset of local unit tests
npm run test:headless:watch
```

### Running the demos

To start a [@web/dev-server](https://modern-web.dev/docs/dev-server/overview/) that hosts the demo page and tests:

```shell
npm start
```
