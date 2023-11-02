import { gsap } from 'gsap';

/* Housing DOM manipulation.
* 
* Note: as this runs on all pages be sure to null check all elements before use.
* 
* @return {void}
*/
const domReady = () => {
	/*
	 * SafarIE iOS requires requestAnimationFrame update.
	 */
	requestAnimationFrame(() => {

		const homeChartSvg = document.querySelector('#home-chart-svg');

		if (homeChartSvg) {
			const toggleBtn = document.querySelector('#accessible-chart-container a.btn');
			const svgWidth = document.querySelector('#housing-chart-container #home-chart-svg').clientWidth;
			const svgHeight = document.querySelector('#housing-chart-container #home-chart-svg').clientHeight;
			const svgSectionWidth = document.querySelector('#housing-chart-container .section-content').clientWidth;

			if (toggleBtn) {

				let tl1 = null;
				let tl2 = null;
				let tl3 = null;

				toggleBtn.addEventListener('click', function (event) {
					event.preventDefault();

					const housingChartTable = document.querySelector('#housing-chart-container table');
					const housingChartChartSvg = document.querySelector('#housing-chart-container #home-chart-svg');
					const housingChartSectionContent = document.querySelector('#housing-chart-container .section-content');

					housingChartTable.classList.toggle('hidden');

					housingChartChartSvg.classList.toggle('hidden');
					housingChartChartSvg.style.width = svgWidth;
					housingChartChartSvg.style.height = svgHeight;

					housingChartSectionContent.style.minWidth = svgSectionWidth;

					if (toggleBtn.textContent === 'View as a table') {
						toggleBtn.textContent = 'View graphical version';
					} else {
						toggleBtn.textContent = 'View as a table';
						if (tl1 !== null) {
							tl1.restart();
						}
						if (tl2 !== null) {
							tl2.restart();
						}
						if (tl3 !== null) {
							tl3.restart();
						}
					}
				});
			}

			const waypointOffset = '0.5';

			const observerCallback = function (entries) {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						homeChartSvg.style.opacity = 1;

						const shapes = document.querySelectorAll("#o0, #o1, #n1, #o2, #n2, #o3, #n3, #o4, #n4, #o5, #n5, #o7, #n7, #o8, #n8, #o9, #n9, #o10, #n10, #o11, #n11 ");
						const dots = document.querySelectorAll("#d1, #d2, #d3, #d4, #d5, #d7, #d8, #d9, #d10, #d11 ");
						const labels = document.querySelectorAll("#t0, #t1, #t2, #t3, #t4, #t5, #t7, #t8, #t9, #t10, #t11 ");

						tl1 = new gsap.timeline();
						tl2 = new gsap.timeline();
						tl3 = new gsap.timeline();

						dots.forEach(dot => {
							gsap.set(dot, {
								opacity: 0,
								scale: 0.1,
							});
						});

						shapes.forEach(shape => {
							gsap.set(shape, {
								opacity: 0,
								scale: 0.1,
							});
						});

						labels.forEach(label => {
							gsap.set(label, {
								opacity: 0,
								scale: 0.1,
								rotationY: 180
							});
						});

						tl1.staggerTo(dots, 0.5, { ease: "back.out(1.7)", opacity: 1, rotation: 0, scale: 1, drawSVG: "0%", stroke: "white", strokeWidth: 0, transformOrigin: "0 0" }, 0.1);
						tl2.staggerTo(shapes, 0.5, { opacity: 1, rotation: 360, scale: 1, drawSVG: "0%", stroke: "white", strokeWidth: 0, transformOrigin: "center", x: "45%", y: "45%" }, 0.05);
						tl3.staggerTo(labels, 1, { opacity: 1, rotationY: 360, scale: 1, drawSVG: "0%", stroke: "white", strokeWidth: 0, transformOrigin: "0 0" }, 0.05);

						observer.unobserve(homeChartSvg);

						homeChartSvg.addEventListener('click', function () {
							if (tl1 !== null) {
								tl1.restart();
							}
							if (tl2 !== null) {
								tl2.restart();
							}
							if (tl3 !== null) {
								tl3.restart();
							}
						});
					}
				});

			};

			const observer = new IntersectionObserver(observerCallback, {
				root: null,
				rootMargin: `${waypointOffset}px`,
				threshold: 0
			});
	
			observer.observe(homeChartSvg);
		}
		
	});
};

if ('complete' === document.readyState) {
	domReady();
} else {
	document.addEventListener('DOMContentLoaded', domReady);
}
