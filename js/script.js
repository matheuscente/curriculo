import {toggleMenu} from './toggleMenu.js'
import { scrollBehavior } from './scrollBehavior.js'

const nav = document.querySelector('.nav-header'),
            btnMobile = document.getElementById('btn-mobile'),
            btnHeader = document.querySelectorAll('.btn-header-list')

btnMobile.addEventListener('click', (event) => {
    toggleMenu(event, nav)
})
btnMobile.addEventListener('touchstart', (event) => {
    toggleMenu(event, nav)
})

btnHeader.forEach((btn) =>{
    btn.addEventListener('touchstart', () => {
        scrollBehavior()
        nav.classList.remove('show')
    })
    btn.addEventListener('click', () => {
        scrollBehavior()
        nav.classList.remove('show')
    })
    
})