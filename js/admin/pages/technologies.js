import TechnologiesTemplate from '../templates/technologies.js'
import {attItems, makeAction} from '../fns/fns.js'
import Auth from '../auth/auth.js'

const auth = new Auth()
const template = new TechnologiesTemplate()

const isAuthenticated = await auth.isAuth()

if(isAuthenticated) {

const body = document.querySelector("#body")

    body.innerHTML = template.technologiesTemplate()
    await template.header(auth)
    await attItems("http://localhost:3000/api/v1/technologies", "technologies");
    
    body.addEventListener("click", async (event) => {
        await makeAction(event)
    })
    


} else {
    window.location.href = '/unauthorized'
}

