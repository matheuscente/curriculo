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
  await attItems("http://localhost:3000/api/v1/areas", "areas");

  const areasList = body.querySelector('.items-list')

      if(window.innerWidth <= 900) {
  
    if(areasList.childNodes.length >= 4) {
  
      areasList.style.justifyContent = 'left'
    }
  
  } else {
      areasList.style.justifyContent = 'center'

  }

  window.addEventListener('resize', () => {
    if(window.innerWidth <= 900) {
  
    if(areasList.childNodes.length >= 4) {
      areasList.style.justifyContent = 'left'
    }
  } else {
      areasList.style.justifyContent = 'center'
  }

  })

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
} else {
  window.location.href = '/admin/unauthorized.html'
} 
} catch(err) {
          const errors = err.response.data.errors
          errorHandler.returnErrors(errors)

}