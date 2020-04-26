!function(e){var t={};function o(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}([function(e,t,o){"use strict";o.r(t);var n={allComments:"https://blog-demo-create.herokuapp.com/comments",oneComment:"https://blog-demo-create.herokuapp.com/comments/id"};class r{constructor(e){this.body=document.querySelector("body"),this.modalDOM=document.querySelector(".modal"),this.modalCard=document.querySelectorAll("[modal_card]"),this.modalClose=document.querySelector(".modal-close-button"),this.openModal(e),this.closeModal()}openModal(e){this.body.classList.contains("--mobile");this.fetchOneComment(e.id),document.querySelector(".modal").classList.add("--open")}fetchOneComment(e){fetch(n.oneComment.replace("id",e)).then(e=>{e.json(e).then(e=>{console.log(e),this.modalDOM.querySelector(".comment-title").innerHTML=e.title,this.modalDOM.querySelector(".comment-desc").innerHTML=e.content,this.modalDOM.querySelector(".comment-video").setAttribute("src",e.video)})})}closeModal(){this.modalClose.addEventListener("click",e=>{e.currentTarget;document.querySelector(".modal").classList.remove("--open")})}}class c{constructor(e){this.body=document.querySelector("body"),this.card=document.querySelectorAll(".card"),this.commentsDOM="",this.renderCards(e)}renderCards(e){e.map((e,t)=>this.commentsDOM+=`<div class="card" modal="" \n                    index="${t}"\n                    id="${e.id}" \n                    title="${e.title}" \n                    desc="${e.content}"\n                    video="${e.video}"\n                    modal_card\n                    >\n                    <img src="/assets/images/profile.png" alt="User" class="comment-user">\n                    \n                    <div class="comment-details">\n                        <h4>${e.title}</h4>\n                        <p>${e.content}</p>\n                        \n                    </div>\n                </div>`),document.querySelector(".homepage-content .comments-wrapper").innerHTML=this.commentsDOM;let t=document.querySelectorAll(".card");this.cardHandeler(t)}cardHandeler(e){this.body.classList.contains("--mobile");e.forEach(e=>{e.addEventListener("click",t=>{t.currentTarget;let o={id:e.getAttribute("id"),title:e.getAttribute("title"),desc:e.getAttribute("desc"),video:e.getAttribute("video")};t.preventDefault(),console.log(o),new r(o)})})}}class s{constructor(e){this.body=document.querySelector("body"),this.importDoc=document.querySelectorAll('link[data*="import"]'),this.reloading=e,this.initDocuments(this.reloading)}initDocuments(e){let t=this.body,o=(document.body.querySelector("content .imported-content .imported-content-wrapper"),new URL(document.URL),this);this.reloading=e,this.importDoc.forEach((e,n)=>{let r=e.getAttribute("data");switch(t.classList.add("--loading"),r){case"import-header":return fetch(e.href).then(e=>{e.text().then(e=>{let o=document.createElement("header");o.classList.add("imported-header"),o.innerHTML=e,document.body.insertBefore(o,document.body.firstChild),t.classList.remove("--loading")})}).catch(e=>{console.warn(e)});case"import-contPage":return fetch(e.href).then(e=>{e.text().then(e=>{let n=document.createElement("section");n.classList.add("imported-content"),n.innerHTML=e,document.body.querySelector(".content").appendChild(n),o.reloading?(new Router(o.reloading),o.reloading=!1):new i,t.classList.remove("--loading")})}).catch(e=>{console.warn(e)});case"import-footer":return fetch(e.href).then(e=>{e.text().then(e=>{let o=document.createElement("footer");o.classList.add("imported-footer"),o.innerHTML=e,document.body.insertBefore(o,document.body.lastChild),t.classList.remove("--loading")})}).catch(e=>{console.warn(e)})}})}}class i{constructor(e){this.content,this.contentTag,this.body=document.querySelector("body"),this.returnHomePage(e)}returnHomePage(e){let t=this.body;return t.classList.add("--loading"),fetch("../views/partials/homepage.html").then(e=>{e.text().then(e=>{document.body.querySelector(".imported-content .imported-content-wrapper").innerHTML=e,t.classList.remove("--loading")})}).catch(e=>{console.warn(e)})}}class d{constructor(){this.body=document.querySelector("body"),this.importDoc=document.querySelectorAll('link[data*="import"]'),this.general(),this.fetchComments(),this.commentsDOM=""}general(){this.body;let e=new URL(document.URL);document.querySelectorAll('[path*="path"]').forEach(t=>{let o,n=t.getAttribute("path").replace("path-","");t.addEventListener("click",r=>{o=t.getAttribute("data-url"),window.pathURL=o,"homepage"!==n?window.history.pushState("router","",e.origin+"/"+n):window.history.pushState("router","",e.origin),window.dispatchEvent(new Event("popstate"))})})}fetchComments(){fetch(n.allComments).then(e=>{e.json().then(e=>{new c(e)})}).catch(e=>{console.error(e),document.querySelector(".homepage-content .comments-wrapper").innerHTML=e})}}new class{constructor(){this.fallBack()}fallBack(){let e=new URL(document.URL);this.realoding=!1;let t=e.pathname.replace("/","");new Promise((e,o)=>{""!==t&&(this.realoding=!0),e(new s(this.realoding))}).then(e=>{setTimeout(()=>{new d},1e3)}).catch(e=>{console.log(e)})}},new class{constructor(){this.body=document.querySelector("body"),this.importDoc=document.querySelectorAll('link[data*="import"]'),this.initUI()}initUI(){let e=this.body;new URL(document.URL),this.body.classList.add("--white"),window.onload=function(){e.classList.add("--ready")},matchMedia("only screen and (max-width: 768px)").matches&&e.classList.add("--mobile"),1366==screen.width&&768==screen.height&&e.classList.add("--lowResLaptop"),1280==screen.width&&768==screen.height&&e.classList.add("--oldLaptop"),1280==screen.width&&720==screen.height&&e.classList.add("--reallyOldLaptop"),1280==screen.width&&600==screen.height&&e.classList.add("--seriouslyOldLaptop"),1024==screen.width&&768==screen.height&&e.classList.add("--OMGchangeYourLaptop")}}}]);