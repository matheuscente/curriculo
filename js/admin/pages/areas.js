import Areas from '../templates/areas.js'
import {attItems} from '../fns/fns.js'
import Auth from '../auth/auth.js'
import Modal from '../modal/modal.js'
import Technologies from '../templates/technologies.js'


const auth = new Auth()
const template = new Areas()
const technologies = new Technologies()
const modal = new Modal(template.getAreas.bind(template), technologies.getTechs.bind(technologies))



const isAuthenticated = await auth.isAuth()

if(isAuthenticated) {

const body = document.querySelector("#body")

    body.innerHTML = template.areasTemplate()
    await template.header()
    await attItems("http://localhost:3000/api/v1/areas", "areas");

    body.addEventListener("click", async (event) => {
        await template.makeAction(event)
    })
    


} else {
    window.location.href = '/unauthorized'
}

