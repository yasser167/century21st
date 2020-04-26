import { InitDocuments, ImportDocuments, FetchDocuments } from './importDocument';
import UI from './ui';
import Card from './components/card';
import General from './general';

export class FallBack {

    constructor() {
        this.fallBack();
    }

    fallBack() {
        let currentURL = new URL(document.URL);
        this.realoding = false
        let pATH = currentURL.pathname.replace('/', '');

        new Promise( (resolve, reject) => {
            if (pATH !== '') {
                this.realoding = true;
            } 
            resolve( new InitDocuments(this.realoding) );
        }).then( (data) => {
            setTimeout( () => {
                new General();
            }, 1000);
        }).catch( error => {
            console.log( error)
        })
    }
}