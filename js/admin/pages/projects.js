import {attItems, makeAction} from '../fns/fns.js'
import Auth from '../auth/auth.js'
import Projects from "../templates/projects.js"
import Errors from '../errors/errors.js'
import { toggleMenu } from "../../toggleMenu.js";



const errorHandler = new Errors()

try{const auth = new Auth();
const projects = new Projects();


const isAuthenticated = await auth.isAuth();

  const body = document.querySelector("#body");


if (isAuthenticated) {

  body.innerHTML = projects.projectsTemplate();
  await projects.header(auth);
  await attItems("http://localhost:3000/api/v1/projects", "projects");

  const projectsList = body.querySelector('.items-list')

      if(window.innerWidth <= 900) {
  
    if(projectsList.childNodes.length >= 4) {
      console.log(projectsList.childNodes)
  
      projectsList.style.justifyContent = 'left'
    }
  
  } else {
      projectsList.style.justifyContent = 'center'

  }

  window.addEventListener('resize', () => {
    if(window.innerWidth <= 900) {
  
    if(projectsList.childNodes.length >= 4) {
      projectsList.style.justifyContent = 'left'
    }
  } else {
      projectsList.style.justifyContent = 'center'
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
  console.log(err)
          const errors = err.response.data.errors
          errorHandler.returnErrors(errors)

}