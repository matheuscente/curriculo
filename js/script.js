import {toggleMenu} from './toggleMenu.js'
import { scrollBehavior } from './scrollBehavior.js'

export const nav = document.querySelector('.nav-header'),
            btnMobile = document.getElementById('btn-mobile'),
            btnHeader = document.querySelectorAll('.btn-header-list')

btnMobile.addEventListener('click', toggleMenu)
btnMobile.addEventListener('touchstart', toggleMenu)

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