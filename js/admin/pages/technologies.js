import {technologiesTemplate} from '../templates/technologies.js'
import {isAuth, attItems} from '../fns.js'
import { header } from '../header.js'

const isAuthenticated = await isAuth()

if(isAuthenticated) {

const body = document.querySelector("#body")

    body.innerHTML = technologiesTemplate()
    await header()
    await attItems("http://localhost:3000/api/v1/technologies", "technologies");


} else {
    window.location.href = '/unauthorized'
}

