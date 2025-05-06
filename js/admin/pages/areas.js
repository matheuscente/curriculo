import Areas from '../templates/areas.js'
import {attItems, makeAction} from '../fns/fns.js'
import Auth from '../auth/auth.js'


const auth = new Auth()
const template = new Areas()



const isAuthenticated = await auth.isAuth()

if(isAuthenticated) {

const body = document.querySelector("#body")

    body.innerHTML = template.areasTemplate()
    await template.header(auth)
    await attItems("http://localhost:3000/api/v1/areas", "areas");

    body.addEventListener("click", async (event) => {
        await makeAction(event)
    })
    


} else {
    window.location.href = '/unauthorized'
}

