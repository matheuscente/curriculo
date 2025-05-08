
 export function toggleMenu(event, nav) {

    if (event.type === 'touchstart' || event.type === 'click') {
        event.preventDefault()
    }
    
    nav.classList.toggle('show')
}