/* Landing DOM manipulation.
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

		/**
		 * Pause videos for accessibility.
		 */
		const motionQuery = matchMedia('(prefers-reduced-motion)');
		const hasLandingVideo = document.querySelector('.page-landing-cover > video');
		const isEconomicPlan = document.querySelector('body.economic-plan');
		let targetFrame = 116;
		if (isEconomicPlan) {
			targetFrame = 181;
		}
		const frameRate = 30;
		const targetTime = targetFrame / frameRate;

		if (motionQuery.matches && hasLandingVideo) {
			hasLandingVideo.autoplay = false;
			hasLandingVideo.pause();
			hasLandingVideo.currentTime = targetTime;
		}

	});
};

if ('complete' === document.readyState) {
	domReady();
} else {
	document.addEventListener('DOMContentLoaded', domReady);
}