/* Navigation DOM manipulation.
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
		 * Wraps the first direct child UL element of an element with the class 'ul-main-nav' in a new LI element.
		 *
		 * This function first selects the first element with the class '.ul-main-nav' and
		 * its first direct child UL element. If both elements exist, it creates a new LI
		 * element and moves the child UL element inside it. Finally, it appends the new LI
		 * element back to the parent element with the class '.ul-main-nav'.
		 *
		 * Note: This code assumes there is only one element with the class '.ul-main-nav'
		 * and only one direct child UL element within it.
		 */
		const mainNav = document.querySelector('.ul-main-nav');
		const languageNav = document.querySelector('.ul-main-nav > ul');
		
		if (mainNav && languageNav) {
			const languageNavWrapper = document.createElement('li');
	
			languageNav.parentNode.removeChild(languageNav);
			languageNavWrapper.appendChild(languageNav);
			mainNav.appendChild(languageNavWrapper);
		}
		
	});
};

if ('complete' === document.readyState) {
	domReady();
} else {
	document.addEventListener('DOMContentLoaded', domReady);
}