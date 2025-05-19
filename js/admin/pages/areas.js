import Areas from '../templates/areas.js'
import {attItems, makeAction} from '../fns/fns.js'
import Auth from '../auth/auth.js'
import Errors from '../errors/errors.js'
import { toggleMenu } from "../../toggleMenu.js";



const errorHandler = new Errors()

try{const auth = new Auth();
const areas = new Areas();


const isAuthenticated = await auth.isAuth();

  const body = document.querySelector("#body");


if (isAuthenticated) {

  body.innerHTML = areas.areasTemplate();
  await areas.header(auth);
  await attItems("https://cms-gkqy.onrender.com/api/v1/areas", "areas");


const btnMobile = document.getElementById('btn-mobile')
const nav = document.querySelector('.nav-header')

btnMobile.addEventListener('click', (event) => {
  toggleMenu(event, nav)
})
btnMobile.addEventListener('touchstart', (event) => {
  toggleMenu(event, nav)
})


    body.addEventListener("click", async (event) => {
     await makeAction(event, auth)
    });
}
} catch(err) {
          const errors = err.response.data.errors
          errorHandler.returnErrors(errors)

}