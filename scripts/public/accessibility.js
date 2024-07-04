/* Accessibility DOM manipulation.
* 
* Note: as this runs on all pages be sure to null check all elements before use.
* 
* @return {void}
*/
const domReady = () => {
	/*
	 * SafarIE bug requires 0ms timeout. Testing requestAnimationFrame as alternative.
	 */
	requestAnimationFrame(() => {

		// Patch to add keyboard navigation to language switcher.
		// This needs to be fixed in BCGov Block Theme.
		const languageButton = document.querySelector('.language-group > button.language_switcher');

		if (null !== languageButton) {
			const siblingLink = languageButton.previousElementSibling;
			const languageOptions = document.querySelector('ul.language_switcher_options');

			if (null !== languageOptions) {
				// Add an open event listener to the language switcher button.
				languageButton.addEventListener('click', function () {
					languageOptions.classList.toggle('is-open');
					const isOpen = languageOptions.classList.contains('is-open');
					languageButton.setAttribute('aria-expanded', isOpen);
				});

				// Add a focusin event listener to the document to trigger a closing click.
				document.addEventListener('focusin', function (event) {
					const isLanguageOptionsOpen = languageOptions.classList.contains('is-open');
					const focusedElement = document.activeElement;

					// Check if the focus is neither on languageOptions, nor languageButton, nor the sibling 'a' element
					if (!isLanguageOptionsOpen) return;
					if (focusedElement === languageOptions || languageOptions.contains(focusedElement)) return;
					if (focusedElement === languageButton) return;
					if (null !== siblingLink && focusedElement === siblingLink) return;

					languageButton.click();
				});

				// Add a keydown event listener to the document to handle the Escape key
				document.addEventListener('keydown', function (event) {
					if (event.key === 'Escape') {
						const isLanguageOptionsOpen = languageOptions.classList.contains('is-open');

						if (!isLanguageOptionsOpen) return;

						languageButton.click();
						languageButton.focus();
					}
				});
			}
		}
	});
};

if ('complete' === document.readyState) {
	domReady();
} else {
	document.addEventListener('DOMContentLoaded', domReady);
}