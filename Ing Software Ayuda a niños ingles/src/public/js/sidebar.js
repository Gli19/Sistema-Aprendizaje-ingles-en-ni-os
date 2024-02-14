

const btn = document.querySelector('#menu-btn');
const menu =  document.querySelector('#side-menu');

// document.addEventListener('DOMContentLoaded', init)

// function init(){
//     let query = window.matchMedia('(min-width: 551px)');    

//     if(query.matches){
//         menu.classList.toggle("menu-expanded");
//         menu.classList.toggle("menu-collapsed");

//         document.querySelector('body').classList.toggle('body-expanded');
//     }
// }


btn.addEventListener('click', e =>{
    menu.classList.toggle("menu-expanded");
    menu.classList.toggle("menu-collapsed");

    document.querySelector('body').classList.toggle('body-expanded');
});


