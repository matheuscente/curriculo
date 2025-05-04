import {adminTemplate} from '../templates/admin.js'
import {isAuth, attItems} from '../fns.js'
import { header } from '../header.js'

const isAuthenticated = await isAuth()

if(isAuthenticated) {

const body = document.querySelector("#body")

    body.innerHTML = adminTemplate()
    await header()
    await attItems("http://localhost:3000/api/v1/projects", "projects");
    await attItems("http://localhost:3000/api/v1/areas", "areas");

    await attItems("http://localhost:3000/api/v1/technologies", "technologies");




} else {
    window.location.href = '/unauthorized'
}

