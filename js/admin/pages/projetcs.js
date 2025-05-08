import {attItems, makeAction} from '../fns/fns.js'
import Auth from '../auth/auth.js'
import Projects from "../templates/projects.js"

const auth = new Auth()
const projects = new Projects()

const isAuthenticated = await auth.isAuth()

if(isAuthenticated) {

const body = document.querySelector("#body")

    body.innerHTML = projects.projectsTemplate()
    await projects.header(auth)
    await attItems("http://localhost:3000/api/v1/projects", "projects");

    body.addEventListener("click", async (event) => {
        await makeAction(event, auth)
    })
    


} else {
    window.location.href = '/unauthorized'
}

