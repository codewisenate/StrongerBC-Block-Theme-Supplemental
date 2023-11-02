/* Footer DOM manipulation.
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
		 * Aggregation: Card setup.
		 */
		const learnHowColoumns = document.querySelectorAll('.learn-how-columns');
		const learnHowGroup = document.querySelectorAll('.learn-how-container');
		
		if (learnHowColoumns && learnHowGroup) {
			
			learnHowGroup.forEach((group) => {

				const headline = group.querySelector('.wp-block-heading');
				if (headline) {
					const headlineLink = headline.querySelector('a');
					if (headlineLink) {
						const link = headlineLink.getAttribute('href');
						const linkLabel = headlineLink.innerText;
						const linkWrapper = document.createElement('a');
						linkWrapper.href = link;
						linkWrapper.setAttribute("aria-label", `Visit the ${linkLabel} website`);
						group.parentNode.insertBefore(linkWrapper, group);
						linkWrapper.appendChild(group);
						headline.replaceChild(headlineLink.firstChild, headlineLink);
					}
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