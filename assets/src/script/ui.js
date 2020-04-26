export default class UI {

	constructor() {
		this.body = document.querySelector('body');
		this.importDoc = document.querySelectorAll('link[data*="import"]');
		this.initUI();
	}

	initUI() {
		let body = this.body;
		let currentURL = new URL(document.URL);
		// console.log('UI CLASS');

		this.body.classList.add('--white')
		
		window.onload = function () {
			body.classList.add('--ready');
		}

		if( matchMedia('only screen and (max-width: 768px)').matches ) {
			body.classList.add('--mobile');
		}

		// Hnadeling Screen resolutions
		if ( screen.width == 1366 && screen.height == 768 ) {
			body.classList.add('--lowResLaptop');
		}
		if ( screen.width == 1280 && screen.height == 768 ) {
			body.classList.add('--oldLaptop');
		}
		if ( screen.width == 1280 && screen.height == 720 ) {
			body.classList.add('--reallyOldLaptop');
		}
		if ( screen.width == 1280 && screen.height == 600 ) {
			body.classList.add('--seriouslyOldLaptop');
		}
		if ( screen.width == 1024 && screen.height == 768 ) {
			body.classList.add('--OMGchangeYourLaptop');
		}

	}

}

