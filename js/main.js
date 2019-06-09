/* ===================================
   Video Functionality 
   ================================ */
class DomVideos {
	constructor(cssClass) {
		this.videos = document.getElementsByClassName(cssClass);
	}
	
	build() {
		for(let i=0;i<this.videos.length;i++) {
			const video = new Video(this.videos[i]);
			video.initialize();
		}
	}
}
// Initialize a new list of videos on the page
const videoList = new DomVideos('jsVideo');

class Video {
	constructor(videoContainer) {
		this.container = videoContainer;
		this.video = this.container.getElementsByTagName('VIDEO')[0];
		this.time = this.video.currentTime;
		this.caption = this.container.getElementsByTagName('FIGCAPTION')[0];
		this.progressBar = this.container.querySelector('.progressbarJS');
		this.volumeBar = this.container.querySelector('.volumeJS');
		this.playButton = this.container.querySelector('.playJS');
		this.skipForward = this.container.querySelector('.forwardJS');
		this.skipBack = this.container.querySelector('.backJS');
		this.muteButton = this.container.querySelector('.muteJS');
		this.fullscreenButton = this.container.querySelector('.fullJS');
		this.startTimeContainer = this.container.querySelector('.startimeJS');
		this.endTimeContainer = this.container.querySelector('.endtimeJS');
		this.isPlaying = false;
		this.transcriptButton = this.container.querySelector('.transcriptJS');
		this.transcript = [];
		this.transcriptData = captionData;
	}
	
	togglePlay() {
		if(this.isPlaying) {
			this.video.pause();
			this.isPlaying = false;
			this.playButton.innerHTML = '<img src="../../js/video-plugin/video-img/play.png" />';
		} else {
			this.video.play();
			this.isPlaying = true;
			this.playButton.innerHTML = '<img src="../../js/video-plugin/video-img/pause.png" />';
		}
		this.toggleButtonBackground(this.playButton);
	}
	
	toggleMute() {
		if(this.video.volume > 0) {
			this.changeVol(0);// Will take vol to zero no matter what it's at now
		} else {
			this.changeVol(.65);// Will default to 65% for user ear safety
		}
		this.toggleButtonBackground(this.muteButton);
	}
	
	updateTime(time) {
  	this.video.currentTime = time;
	}
	
	jump(forward) {
		let time = this.video.currentTime;
		if(forward) {
			time = time + 30;
			this.video.currentTime = time;
		} else {
			time = time - 10;
			this.video.currentTime = time;
		}
	}
	
	changeVol(vol) {
		if(vol > 1) {
				this.video.volume = 1;
				this.volumeBar.value = 1;
				this.muteButton.innerHTML = '<img src="../../js/video-plugin/video-img/volume.png" />'
		} else if(vol <= 0) {
				this.video.volume = 0;
				this.volumeBar.value = 0;
				this.muteButton.innerHTML = '<img src="../../js/video-plugin/video-img/mute.png" />';
		} else {
				this.video.volume = vol;
				this.volumeBar.value = vol;
				this.muteButton.innerHTML = '<img src="../../js/video-plugin/video-img/volume.png" />'
		}
	}
	
	toggleTranscript() {
		const display = this.caption.style.display;
		if(!display || display === 'none') {
			this.caption.style.display = 'block';	 
		} else {
			this.caption.style.display = 'none';
		}
		this.toggleButtonBackground(this.transcriptButton);
	}
	
	fullScreen() {
		if (this.video.requestFullscreen) {
			this.video.requestFullscreen();
		} else if (this.video.mozRequestFullScreen) {
			this.video.mozRequestFullScreen(); // Firefox
		} else if (this.video.webkitRequestFullscreen) {
			this.video.webkitRequestFullscreen(); // Chrome and Safari
		}
	}
	
	highlightTranscript(time) {
		const transcriptArray = this.caption.querySelectorAll('.caption');
		for(let i=0;i<this.transcript.length;i++) {
			transcriptArray[i].classList.remove('highlight');
			if(this.transcript[i].time < this.time && this.transcript[i+1] == null) {
					transcriptArray[i].classList.add('highlight');
			} else if (this.transcript[i].time < this.time && this.transcript[i+1].time > time) {
					transcriptArray[i].classList.add('highlight');
			} else if (this.transcript[i].time == this.time) {
					transcriptArray[i].classList.add('highlight');
			}
		}
	}
	
	updateProgressBar(time) {
		time = time / 100 + .0025; // Add an extra bit so it doesn't fall behind as much
		this.progressBar.style.backgroundImage = "-webkit-gradient(linear, left top, right top, "
																	 + "color-stop(" + time + ", #fff), "
																	 + "color-stop(" + time + ", rgba(255,255,255,.1)"
																	 + ")";
	}
	
	getTimeFormat(time) {
		let hrs = 0;
		let min = 0;
		let sec = 0;
		let html = '';
		time = Math.floor(time);
		// Get Hours
		hrs = Math.floor((time / 60) / 60);
		// Get Minutes
		min = time - (hrs * 3600);
		min = min / 60;
		min = Math.floor(min);
		// Get Seconds
		sec = time - (hrs*3600 + min*60);
		hrs = hrs.toString();
		if(min < 10) {
			min.toString();
			min = '0' + min;
		}
		if(sec < 10) {
			sec.toString();
			sec = '0' + sec;
		}
		if(hrs === '0') {
			return min + ":" + sec;
		} else {
			return hrs + ":" + min + ":" + sec;
		}
	}
	
	clickableCaptions() {
		const captions = document.querySelectorAll('.caption');
		// Jump to point in video when caption is clicked
		for(let i=0;i<captions.length;i++) {
			let clickableCaption = captions[i];
			clickableCaption.addEventListener('click',event => {
				for(let i=0;i<this.transcript.length;i++) {
					if(this.transcript[i].text == event.target.innerText) {
							this.updateTime(this.transcript[i].time);
					}
				}
			});
		}
	}
	
	toggleButtonBackground(button) {
		const backgroundColor = button.style.backgroundColor;
		if(backgroundColor === 'rgb(22, 149, 163)' || backgroundColor === '#1695A3' || backgroundColor === '') {
			button.style.backgroundColor = '#225378';	 
		} else {
			button.style.backgroundColor = '#1695A3';	
		}
	}
	
	initialize() {
		// Toggle video play state when play/pause buttons are pressed
		this.playButton.addEventListener('click',() => {
			this.togglePlay();
		});
		// Toggle video with video click
		this.video.addEventListener('click',() => {
			this.togglePlay();
		});
		// Skip forward button 
		this.skipForward.addEventListener('click', () => {
			this.jump(true);
		});
		// Skip backward button 
		this.skipBack.addEventListener('click', () => {
			this.jump(false);
		});
		// Toggle video muted state when mute/volume buttons are pressed
		this.muteButton.addEventListener('click',() => {
			this.toggleMute();
		});
		// Toggle the Transcript 
		this.transcriptButton.addEventListener('click',() => {
			this.toggleTranscript();
		});
		// Request full screen from browser when button clicked
		this.fullscreenButton.addEventListener('click',() => {
			this.fullScreen();
		});
		// Load the transcript array using data supplied for each video
		for(let i=0;i<this.transcriptData.length;i++) {
			this.transcript.push(this.transcriptData[i]);
		}
		// Change the volume when volume indicator is changed
		this.volumeBar.addEventListener('change', () => {
			// Update the video volume
			this.changeVol(this.volumeBar.value);
		});
		// track video seek bar position when manually changed by user with mouse
		this.progressBar.addEventListener("mousedown", () => {
			this.video.pause(); // Need to Pause the video while user scrubs
		});
		this.progressBar.addEventListener("mouseup", () => {
			this.updateTime(this.video.duration * (this.progressBar.value / 100));
			if(this.isPlaying) {
				this.video.play(); // Need to continue playing if it was playing before
			}
		});
		// track video seek bar position when manually changed by user with touch
		this.progressBar.addEventListener("touchstart", () => {
			this.video.pause(); // Need to Pause the video while user scrubs
		});
		this.progressBar.addEventListener("touchend", () => {
			this.updateTime(this.video.duration * (this.progressBar.value / 100));
			if(this.isPlaying) {
				this.video.play(); // Need to continue playing if it was playing before
			}
		});
		// track video progress and update range and captions
		this.video.addEventListener("timeupdate",() => {
			this.time = this.video.currentTime;
			// update caption highlight
			this.highlightTranscript(this.time);
			// update range input;
			this.progressBar.value = (100 / this.video.duration) * this.video.currentTime;
			this.updateProgressBar(this.progressBar.value);
			this.startTimeContainer.innerText = this.getTimeFormat(this.video.currentTime);
		});
		// Calls to video's data need to be called after video metadata loads
		this.video.onloadedmetadata = () => {
			this.endTimeContainer.innerText = this.getTimeFormat(this.video.duration);
		};
		// BUGFIX: onloadmetadata not running for some reason
			this.endTimeContainer.innerText = this.getTimeFormat(this.video.duration);
		// Change video element state with keyboard press
		document.body.onkeyup = event => {
				let time = this.video.currentTime;
				// Spacebar press
				if(event.keyCode == 32){
					event.preventDefault();
					this.togglePlay();
				}
				// left press
				if(event.keyCode == 37){
					this.rewind();
				}
				// right press
				if(event.keyCode == 39){
					this.skip();
				}
		}
		this.clickableCaptions();
	}
}

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
			const arrow = document.createElement('IMG');
			arrow.setAttribute('src','../img/rightArrow.svg');
			arrow.setAttribute('class',css);
			return arrow;
		}
		
		this.intervalBar.setAttribute('class','slide-indicator');
		this.slider.appendChild(this.intervalBar);
		this.slider.appendChild(makeArrow('leftArrow'));
		this.slider.appendChild(makeArrow('rightArrow'));
		
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
	videoList.build();
};
	
	
	
	
	
	
	
	
	
	
	
	
	
	
