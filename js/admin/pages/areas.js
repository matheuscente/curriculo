import {areasTemplate} from '../templates/areas.js'
import {isAuth, attItems} from '../fns.js'
import { header } from '../header.js'

const isAuthenticated = await isAuth()

if(isAuthenticated) {

const body = document.querySelector("#body")

    body.innerHTML = areasTemplate()
    await header()
        await attItems("http://localhost:3000/api/v1/areas", "areas");
    


} else {
    window.location.href = '/unauthorized'
}

