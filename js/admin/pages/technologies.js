import TechnologiesTemplate from '../templates/technologies.js'
import {attItems} from '../fns/fns.js'
import Auth from '../auth/auth.js'

const auth = new Auth()
const template = new TechnologiesTemplate()

const isAuthenticated = await auth.isAuth()

if(isAuthenticated) {

const body = document.querySelector("#body")

    body.innerHTML = template.technologiesTemplate()
    await template.header()
    await attItems("http://localhost:3000/api/v1/technologies", "technologies");
    
    body.addEventListener("click", async (event) => {
        await template.makeAction(event)
    })
    


} else {
    window.location.href = '/unauthorized'
}

