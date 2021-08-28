import {render} from "react-dom";
import App from "./components/App";

render(<App />, document.getElementById("root"));

/* Module Pattern */
!function(){
	'use strict';

	/* ===================================
		 Video Functionality
		 ================================ */
		class Videos {
			constructor() {

			}

			addIframe() {
				for(let vid of document.querySelectorAll('.jsVideo')) {
					const source = vid.dataset.source;
					const iframe = document.createElement('iframe');

					iframe.setAttributeNS(null, 'src', `https://www.youtube.com/embed/${source}`);
					iframe.setAttributeNS(null, 'allow', `accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture`);
					iframe.setAttributeNS(null, 'autoplay', `true`);
					iframe.setAttributeNS(null, 'allowfullscreen', `true`);

					vid.appendChild(iframe);
				}
			}
		}

		const videos = new Videos();

	/* ===================================
		 Slider Functionality
		 ================================ */
	class Sliders {
		constructor(cssClass) {
			this.list =  document.getElementsByTagName('BODY')[0].querySelectorAll(cssClass);
			this.number = this.list.length;
		}
		build() {
			if(this.number > 0) {
				for(let i=0;i<this.number;i++) {
					const slider = new Slider(this.list[i]);
					slider.initialize();
				}
			}
		}
	}
	// Instantiate a new set of Sliders for the current page
	const pageSliders = new Sliders('.slider');

	class Slider {
		constructor(slider) {
			this.slider = slider;
			this.slides = this.slider.querySelectorAll('input[name="slides"]');
			this.labels = this.slider.querySelectorAll('.slider_controls label');
			this.doneSliding = true;
			this.swipeList = [];
			this.intervalBar = document.createElement('DIV');
			this.intervalProgress = 0;
			this.intervalId = null;
		}

		get index() {
			for(let i=0;i<this.slides.length;i++) {
				if(this.slides[i].checked) {
					return i;
				}
			}
		}

		get prevSlide() {
			if(this.index > 0) {
				return this.slides[this.index - 1];
			} else {
				return this.slides[this.slides.length - 1];
			}
		}

		get nextSlide() {
			if(this.index < this.slides.length - 1) {
				return this.slides[this.index + 1];
			} else {
				return this.slides[0];
			}
		}

		next() {
			this.nextSlide.checked = true;
			this.refreshSliderElements();
			this.updatePreviousSlide();
		}

		prev() {
			this.prevSlide.checked = true;
			this.refreshSliderElements();
			this.updatePreviousSlide();
		}

		update() {
			this.refreshSliderElements();
			this.updatePreviousSlide();
		}

		updateSlideIndicator() {
			for(let i=0;i<this.labels.length;i++) {
			 this.labels[i].style.backgroundColor = 'rgba(119,119,119,.85)';
			}
			this.labels[this.index].style.backgroundColor = '#CCC';
		}

		updatePreviousSlide() {
			for(let i=0;i<this.slides.length;i++) {
				this.slides[i].nextElementSibling.classList.remove('prev-slide');
			}
			this.prevSlide.nextElementSibling.classList += ' prev-slide';
		}

		refreshSliderElements() {
			const startInterval = () => {
				const interval = () => {
					if(this.intervalProgress < 100) {
						this.intervalProgress += .1;
						this.intervalBar.style.width = `${this.intervalProgress}%`;
					}	else {
						this.intervalProgress = 0;
						this.intervalBar.style.width = '0';
						this.next();
					}
				};
				const pauseInterval = () => {
					clearInterval(this.intervalId);
					this.intervalBar.style.width = `${this.intervalProgress}%`;
				};
				const restartInterval = () => {
					clearInterval(this.intervalId);
					this.intervalId = setInterval(interval,10);
				};

				this.slider.addEventListener('mouseover',(event) => {
					pauseInterval();
				});
				this.slider.addEventListener('mouseleave',() => {
					restartInterval();
				});

				clearInterval(this.intervalId);
				this.intervalProgress = 0;
				this.intervalId = setInterval(interval,10);
			}

			const disableSliderInteractions = () => {
				this.doneSliding = false;
				this.labels[0].parentElement.style.display = 'none';
				this.slider.querySelector('.right-arrow').style.display = 'none';
				this.slider.querySelector('.left-arrow').style.display = 'none';
			};

			const enableSliderInteractions = () => {
				this.doneSliding = true;
				this.labels[0].parentElement.style.display = 'initial';
				this.slider.querySelector('.right-arrow').style.display = 'initial';
				this.slider.querySelector('.left-arrow').style.display = 'initial';
				this.updateSlideIndicator();
			}

			disableSliderInteractions();
			setTimeout(enableSliderInteractions,650);
			startInterval();
		}

		swipeSlider() {
			const xDifference = this.swipeList[0].clientX - this.swipeList[this.swipeList.length - 1].clientX;
			const yDifference = this.swipeList[0].clientY - this.swipeList[this.swipeList.length - 1].clientY;
			if(xDifference > 0 && Math.abs(yDifference) < 100) {
					this.next();
			} else if(xDifference < 0 && Math.abs(yDifference) < 100) {
					this.prev();
			}
			this.swipeList = [];
		}

		initialize() {
			const leftArrow = document.querySelector('.left-arrow');
			const rightArrow = document.querySelector('.right-arrow');
			const sliderControls = document.querySelector('.slider_controls');

			leftArrow.addEventListener('click', event => {
				this.prev();
			});

			rightArrow.addEventListener('click', event => {
				this.next();
			});

			sliderControls.addEventListener('click', event => {
				const updateSlides = () => {
					this.update();
				};
				// Need to delay this call so the DOM can update the index
				setTimeout(function() {updateSlides()},50);
			});

			this.slider.addEventListener('touchmove',event => {
				this.swipeList.push(event.touches[0]);
			});

			this.slider.addEventListener('touchend',event => {
				if(this.swipeList.length > 0) {
					this.swipeSlider();
				}
			});

			// Add the interval bar
			this.intervalBar.setAttribute('class','slide-indicator');
			this.slider.appendChild(this.intervalBar);
			// Update DOM elements to match current checked status
			this.refreshSliderElements();
		}

	}

	/* ===================================
		 Menu Functionality
		 ================================ */
	class Menu {
		constructor(trigger,obfContainer) {
			this.trigger = trigger;
			this.obfContainer = obfContainer;
		}
		addObfuscator() {
			const obf = document.createElement('DIV');
			obf.setAttribute('class','main-obfuscator obfuscator');
			obf.addEventListener('click',() => {
				this.trigger.checked = false;
			});
			this.obfContainer.appendChild(obf);
		}
	}
	// Initialize a Menu for the main menu on the site
	const mainMenu = new Menu(document.getElementById('trigger-1'),document.querySelector('.main-header > .container'));

	/* ===================================
		 Update Footer Year
		 ================================ */
	class Timestamp {
		constructor(element,date) {
			this.container = element;
			this.date = date;
		}
		print() {
			this.container.innerText = this.date;
		}
	}
	// Instantiate a new time stamp for the site footer
	const footerYear = new Timestamp(document.querySelector('.jsDate'),new Date().getFullYear());

	/* ===================================
		 Functions to call on page load
		 ================================ */
	window.onload = function() {
		// Setup all sliders
		pageSliders.build();
		// Append a new obfuscator on page load
		mainMenu.addObfuscator();
		// Update the Copyright year in the footer
		footerYear.print();
		// Setup all videos on the page
		videos.addIframe();
	};

}();
