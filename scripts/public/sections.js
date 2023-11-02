/* Sections DOM manipulation.
* 
* Note: as this runs on all pages be sure to null check all elements before use.
* 
* @return {void}
*/
const domReady = () => {
	/*
	 * SafarIE bug requires 0ms timeout.
	 */
	requestAnimationFrame(() => {

		/**
		 * Check for bottom-cap class and add necessary sibling element.
		 */
		const bottomCapElements = document.querySelectorAll('.bottom-cap');

		if (bottomCapElements) {
			bottomCapElements.forEach(element => {
				if (element) {
					const siblingElement = document.createElement('div');
					siblingElement.className = element.className + ' card-section-bottom-cap';
					element.parentNode.insertBefore(siblingElement, element.nextSibling);
				}
			});
		}

	});
};

if ('complete' === document.readyState) {
	domReady();
} else {
	document.addEventListener('DOMContentLoaded', domReady);
}