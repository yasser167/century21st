// import Router from './router';
import Modal from './components/modal';
import UI from './ui';
import Card from './components/card';

export class InitDocuments {
    constructor(reloading) {
        this.body = document.querySelector('body');
        this.importDoc = document.querySelectorAll('link[data*="import"]');
        this.reloading = reloading;
        this.initDocuments(this.reloading);
    }
    
    initDocuments(reloading) {
        let body = this.body;
        let contentTag = document.body.querySelector('content .imported-content .imported-content-wrapper');
        let currentURL = new URL(document.URL);
        let that = this;
        this.reloading = reloading;


        this.importDoc.forEach((element, index) => {
            let content;
            let contentTag;
            let importName = element.getAttribute('data')

            body.classList.add('--loading');

            switch (importName) {
                case 'import-header':
                    return fetch(element.href)
                        .then((response) => {
                            response.text().then((data) => {
                                let node = document.createElement('header')
                                node.classList.add('imported-header');
                                node.innerHTML = data
                                document.body.insertBefore(node, document.body.firstChild);
                                body.classList.remove('--loading');
                            })
                        })
                        .catch((error) => {
                            console.warn(error)
                        })
                    break;

                case 'import-contPage':
                    return fetch(element.href)
                        .then((response) => {
                            response.text().then((data) => {
                                
                                let node = document.createElement('section')
                                node.classList.add('imported-content');
                                node.innerHTML = data
                                document.body.querySelector('.content').appendChild(node);

                                if (that.reloading) {
                                    new Router(that.reloading)
                                    that.reloading = false;
                                } else {
                                    new ReturnHomePage();
                                }
                                body.classList.remove('--loading');
                            })
                        })
                        .catch((error) => {
                            console.warn(error)
                        })
                    break;

                case 'import-footer':
                    return fetch(element.href)
                        .then((response) => {
                            response.text().then((data) => {
                                let node = document.createElement('footer')
                                node.classList.add('imported-footer');
                                node.innerHTML = data
                                document.body.insertBefore(node, document.body.lastChild);
                                body.classList.remove('--loading');
                            })
                        })
                        .catch((error) => {
                            console.warn(error)
                        })
                    break;
            }
        })

    }

}


export class FetchDocuments {
    constructor(path, url) {  // "path" & "url" parameters come as arguments from Router Class
        this.body = document.querySelector('body');
        this.importContentDoc = document.querySelectorAll('link[data*="import-content"]');
        this.fetchDocuments(path, url);
    }

    fetchDocuments(path, url) {
        let body = this.body;
        let contentTag = document.body.querySelector('content .imported-content .imported-content-wrapper');

        body.classList.add('--loading');

        var myHeaders = new Headers();
        myHeaders.append('cache-control', 'max-age=172800');

        var options = {
            method: 'GET',
            headers: myHeaders,
          };

        return fetch(url, options)
            .then((response) => {
                response.text().then((data) => {
                    contentTag.innerHTML = '';
                    contentTag.innerHTML = data;
                    body.classList.remove('--loading');

                    new Card();
                    new Modal();
                })
            })
            .catch((error) => {
                console.warn(error)
            })
    }
}


export class ReturnHomePage {
    constructor(data) {
        this.content;
        this.contentTag;
        this.body = document.querySelector('body');
        this.returnHomePage(data);
    }

    returnHomePage(data) {
        let body = this.body;
        body.classList.add('--loading');

        return fetch('../views/partials/homepage.html')
            .then( (response) => {
                response.text().then((data) => {
                    document.body.querySelector('.imported-content .imported-content-wrapper').innerHTML = data;
                    // new Router();
                    body.classList.remove('--loading');
                })
            })
            .catch( (error) => {
                console.warn( error )
            })

    }

}