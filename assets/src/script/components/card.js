import Modal from "./modal";

export default class Card {

    constructor( cards ) {
        this.body = document.querySelector('body');
        this.card = document.querySelectorAll('.card');
        this.commentsDOM = '';
        this.renderCards( cards );
    }

    renderCards( cards ) {
        cards.map( (item, index) => {
            // console.log( item );
            return (
                this.commentsDOM += 
                `<div class="card" modal="" 
                    index="${ index }"
                    id="${ item.id }" 
                    title="${ item.title }" 
                    desc="${ item.content }"
                    video="${ item.video }"
                    modal_card
                    >
                    <img src="/assets/images/profile.png" alt="User" class="comment-user">
                    
                    <div class="comment-details">
                        <h4>${ item.title }</h4>
                        <p>${ item.content }</p>
                        
                    </div>
                </div>`
            )
        })
        
        document.querySelector('.homepage-content .comments-wrapper').innerHTML = this.commentsDOM;
        
        let newCards = document.querySelectorAll('.card');
        this.cardHandeler( newCards);
    }

    cardHandeler( newCards ) {
        let body = this.body;
        let isMobile = body.classList.contains('--mobile') ? true : false;

        newCards.forEach( card => {
            card.addEventListener('click', ev => {
                let current = ev.currentTarget;
                let cardAttr = {
                    id: card.getAttribute('id'),
                    title: card.getAttribute('title'),
                    desc: card.getAttribute('desc'),
                    video: card.getAttribute('video'),
                };
                
                ev.preventDefault();

                // console.log( cardAttr );
                new Modal(cardAttr);
            });
        });
    }

}