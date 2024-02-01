 import {nav} from './script.js'

 export function toggleMenu(event) {

    if (event.type === 'touchstart') {
        event.preventDefault()
    }
    
    nav.classList.toggle('show')
}