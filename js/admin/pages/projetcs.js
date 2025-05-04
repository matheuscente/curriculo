import {projectsTemplate} from '../templates/projects.js'
import {isAuth, attItems} from '../fns.js'
import { header } from '../header.js'

const isAuthenticated = await isAuth()

if(isAuthenticated) {

const body = document.querySelector("#body")

    body.innerHTML = projectsTemplate()
    await header()
    await attItems("http://localhost:3000/api/v1/projects", "projects");


} else {
    window.location.href = '/unauthorized'
}

