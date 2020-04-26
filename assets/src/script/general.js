import API from './components/api';
import Card from './components/card';

export default class General {

	constructor() {
		this.body = document.querySelector('body');
        this.importDoc = document.querySelectorAll('link[data*="import"]');
        this.general();
        this.fetchComments();

        this.commentsDOM = '';
	}

	general() {
		let body = this.body;
		let currentURL = new URL(document.URL);
        // let menuBtn = document.querySelector('.menu-botton')
        
        // menuBtn.addEventListener('click', ev => {
        //     let currentURL = ev.currentTarget;
        //     body.classList.toggle('--menu-open');
		// })
		

		let pathElements = document.querySelectorAll('[path*="path"]')
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
        fetch( API.allComments )
        .then( (res) => {
            res.json()
            .then( ( data ) => {
                // this.renderComments( data );
                new Card( data );
            })
        })
        .catch( (err) => {
            console.error( err );
            document.querySelector('.homepage-content .comments-wrapper').innerHTML = err;
        })
    }

    
    // renderComments( comments ) {
    //     comments.map( (item, index) => {
    //         // console.log( item );
    //         return (
    //             this.commentsDOM += 
    //             `<div class="card" modal="" index="${ index }" id="${ item.id }" modal_card>
    //                 <img src="/assets/images/profile.png" alt="User" class="comment-user">
                    
    //                 <div class="comment-details">
    //                     <h4>${ item.title }</h4>
    //                     <p>${ item.content }</p>
                        
    //                     ${ item.video 
    //                         ?
    //                         `<video width="400" controls>
    //                             <source src="${ item.video }" type="video/mp4">
    //                             Your browser does not support HTML5 video.
    //                         </video>`
    //                         :
    //                      ""}
    //                 </div>
    //             </div>`
    //         )
    //     })

    //     document.querySelector('.homepage-content .comments-wrapper').innerHTML = this.commentsDOM;

    //     new Card();
    // }

}

