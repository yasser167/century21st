import API from "./api";

export default class Modal {
    constructor( cardAttr ) {
        this.body = document.querySelector('body');
        this.modalDOM = document.querySelector(`.modal`);
        this.modalCard = document.querySelectorAll('[modal_card]');
        this.modalClose = document.querySelector('.modal-close-button');
        this.openModal( cardAttr );
        this.closeModal();
    }

    openModal( cardAttr ) {
        let body = this.body;
        let isMobile = body.classList.contains('--mobile') ? true : false;
        
        this.fetchOneComment( cardAttr.id );
        document.querySelector(`.modal`).classList.add('--open');
    }

    fetchOneComment( id ) {
        let options = {
            method: 'GET',
            mode: 'no-cors',
            cache: 'no-cache',
            credentials: 'include',
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            }
        };

        fetch( API.oneComment.replace('id', id), options )
        .then( (res) => {
            res.json( res ).then( (comment ) => {
                console.log( comment );
                this.modalDOM.querySelector(".comment-title").innerHTML = comment.title;
                this.modalDOM.querySelector(".comment-desc").innerHTML = comment.content;
                this.modalDOM.querySelector(".comment-video").setAttribute('src', comment.video);
            })
        })
    }

    closeModal() {
        this.modalClose.addEventListener('click', (ev) => {
            let current = ev.currentTarget;
            document.querySelector(`.modal`).classList.remove('--open');
        })
    }
}