import './public/accessibility';
import './public/footer';
import './public/landing';
// import './public/housing-stats';
import './public/navigation';
import './public/sections';

import { qs } from './utils';
/**
 * DOM manipulation.
 * @return {void}
 */
const domReady = () => {
	/*
	 * SafarIE bug requires 0ms timeout.
	 */
	requestAnimationFrame(() => {
		/**
		 * Test import of util – remove when ready to use.
		 */
		const body = qs('body');
	});
};

if ('complete' === document.readyState) {
	domReady();
} else {
	document.addEventListener('DOMContentLoaded', domReady);
}
