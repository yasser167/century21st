import API from './components/api';
import Card from './components/card';

export default class General {
	constructor() {
        this.body = document.querySelector('body');
        this.commentsDOM = '';
        this.general();
        this.fetchComments();
	}

	general() {
		let body = this.body;
        let currentURL = new URL(document.URL);
        let menuBtn = document.querySelectorAll('.menu-button');
		let pathElements = document.querySelectorAll('[path*="path"]');
        
        menuBtn.forEach( button => {
            button.addEventListener('click', ev => {
                let currentURL = ev.currentTarget;
                body.classList.toggle('--menu-open');
            })
        })
        
		
        pathElements.forEach(element => {
            let refPath = element.getAttribute('path').replace('path-', '');
            let pathURL;

            element.addEventListener('click', (ev) => {
				pathURL = element.getAttribute('data-url');
                window.pathURL = pathURL;
                
                if ( refPath !== 'homepage' ) {
                    window.history.pushState('router', '', currentURL.origin + '/' + refPath)
                } else {
                    window.history.pushState('router', '', currentURL.origin)
                }

                window.dispatchEvent(new Event('popstate'))
            })
        });

    }
    
    fetchComments() {
        let options = {
            method: 'GET',
            mode: 'no-cors',
            cache: 'no-cache',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            }
        };

        fetch( API.allComments )
        .then( (res) => {
            let response = res.json();
            
            response.then( ( data ) => {
                new Card( data );
            })
        })
        .catch( (err) => {
            console.error( err );
            document.querySelector('.homepage-content .comments-wrapper').innerHTML = err;
        })
    }
}

