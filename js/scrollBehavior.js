

export function scrollBehavior() {
    event.preventDefault()
    const element = event.target,
        id = element.getAttribute('href'),
        section = document.querySelector(id),
        top = section.offsetTop
    if (window.innerWidth < 900) {
        if (id === "#experiencia") {
            window.scroll({
                top: top - 50,
                behavior: "smooth"

            })
        } else {
            window.scroll({
                top: top,
                behavior: "smooth"
            })
        }
    } else {
        if (id === "#experiencia") {
            window.scroll({
                top: top - 80,
                behavior: "smooth"

            })
        } else {
            window.scroll({
                top: top,
                behavior: "smooth"
            })
        }
    }

}