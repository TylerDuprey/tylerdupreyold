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
				const intervalFunction = 
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
		this.refreshDOMElements();
	}
	
	prev() {
		this.prevSlide.checked = true;
		this.refreshDOMElements();
	}
	
	refreshDOMElements() {
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

		const updateLabels = () => {
			for(let i=0;i<this.labels.length;i++) {
			 this.labels[i].style.backgroundColor = 'rgba(119,119,119,.85)';		
			}
			this.labels[this.index].style.backgroundColor = '#CCC';
		}

		const updatePreviousSlide = () => {
			for(let i=0;i<this.slides.length;i++) {
				this.slides[i].nextElementSibling.classList = 'slide';
			}
			this.prevSlide.nextElementSibling.classList += ' prev-slide';
		}	
		
		const disableSliderInteractions = () => {
			this.doneSliding = false;	
			this.labels[0].parentElement.style.display = 'none';
			this.slider.querySelector('.rightArrow').style.display = 'none';
			this.slider.querySelector('.leftArrow').style.display = 'none';
		};
		
		const enableSliderInteractions = () => {
			this.doneSliding = true;
			this.labels[0].parentElement.style.display = 'initial';
			this.slider.querySelector('.rightArrow').style.display = 'initial';
			this.slider.querySelector('.leftArrow').style.display = 'initial';
		}
		
		disableSliderInteractions();
		setTimeout(enableSliderInteractions,650);
		startInterval();
		updateLabels();
		updatePreviousSlide();
	}
	
	getSwipeDirection() {
		const xDifference = this.swipeList[0].clientX - this.swipeList[this.swipeList.length - 1].clientX;
		const yDifference = this.swipeList[0].clientY - this.swipeList[this.swipeList.length - 1].clientY;
		if(xDifference > 0 && Math.abs(yDifference) < 100) {
				this.next();
		} else if(xDifference < 0 && Math.abs(yDifference) < 100) {
				this.prev();
		} 
		this.swipeList = [];
	}
	
	getUserInput(target,type) {
		if(this.doneSliding) {
			if(type === 'click') {
				if(target.tagName === 'IMG') {
						for(let i=0;i<target.classList.length;i++) {
							if(target.classList[i] === 'rightArrow') {
									this.next();
							}	else if(target.classList[i] === 'leftArrow') {
									this.prev();			
							} 
						}
				} else if(target.tagName === 'INPUT') {
						this.refreshDOMElements();					
				}
			} else if(type === 'touch' && this.doneSliding) {
						this.getSwipeDirection();
			} 
		}
	}
	
	initialize() {
		const makeArrow = (css) => {
			const rightArrow = document.createElement('IMG');
			const leftArrow = document.createElement('IMG');
			this.slider.appendChild(leftArrow);
			this.slider.appendChild(rightArrow);
			arrow.setAttribute('src','img/rightArrow.svg');
			leftArrow.setAttribute('class','leftArrow');
			right.setAttribute('class','rightArrow');
		}
		
		this.intervalBar.setAttribute('class','slide-indicator');
		this.slider.appendChild(this.intervalBar);
		
		this.slider.addEventListener('click',event => {
				this.getUserInput(event.target,'click');
		});
		this.slider.addEventListener('touchmove',event => {
				this.swipeList.push(event.touches[0]);
		});
		this.slider.addEventListener('touchend',event => {
			if(this.swipeList.length > 0) {
				this.getUserInput(event.target,'touch');
			}
		});
		// Update DOM elements to match current checked status
		this.refreshDOMElements();
	}
	
}

/* ===================================
   Scrolling Header Functionality
   ================================ */
class Header {
	constructor(element,scrollLimit) {
		this.ticking = false;
		this.element = element;
		this.limit = scrollLimit;
	}
	
	toggleHeader(fixed) {
		if(fixed) {
				this.element.style.position = 'relative';
		} else {
				this.element.style.position = 'fixed';
				this.element.style.width = '100%'; 
		}
	}
	
	scrolling() {
		let last_known_scroll_position = window.scrollY;
		if (!this.ticking) {
			window.requestAnimationFrame(() => {
				if(last_known_scroll_position > this.limit) {
					const fixed = this.element.style.position === 'fixed';
					if(!fixed) {
						this.toggleHeader(false);
					} 
				} else {
						this.toggleHeader(true);
				}
				this.ticking = false;
			});
			this.ticking = true;
		}
	}
	
	fixOnScroll() {
		window.addEventListener('scroll',() => {
			this.scrolling();		
		});	
	}
}
// Initialize a Header for the main header on the site
const mainHeader = new Header(document.getElementById('main_header'),1);

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
		obf.setAttribute('id','main_obfuscator');
		obf.setAttribute('class','obfuscator');
		obf.addEventListener('click',() => {
			this.trigger.checked = false;
		});
		this.obfContainer.appendChild(obf);
	}
}
// Initialize a Menu for the main menu on the site
const mainMenu = new Menu(document.getElementById('menu_trigger'),document.querySelector('#main_header > .container'));

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
const footerYear = new Timestamp(document.getElementById('footer_date'),new Date().getFullYear());

/* ===================================
   Functions to call on page load
   ================================ */
window.onload = function() {
	// Setup all sliders
	pageSliders.build();
	// Setup scrolling affects for main header
	mainHeader.fixOnScroll();
	// Append a new obfuscator on page load
	mainMenu.addObfuscator();
	// Update the Copyright year in the footer
	footerYear.print();
	// Setup all videos on the page
	videos.addIframe();
};
	
	
	
	
	
	
	
	
	
	
	
	
	
	
