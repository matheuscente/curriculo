import { attItems, makeAction } from "../fns/fns.js";
import Auth from "../auth/auth.js";
import Admin from "../templates/admin.js";
import { toggleMenu } from "../../toggleMenu.js";
import Errors from "../errors/errors.js";

const errorHandler = new Errors()


try{const auth = new Auth();
const admin = new Admin();


const isAuthenticated = await auth.isAuth();

  const body = document.querySelector("#body");


if (isAuthenticated) {

  body.innerHTML = admin.adminTemplate();
  await admin.header(auth);
  await attItems("http://localhost:3000/api/v1/projects", "projects");
  await attItems("http://localhost:3000/api/v1/areas", "areas");
  await attItems("http://localhost:3000/api/v1/technologies", "technologies");

  const projectsList = body.querySelectorAll('.items-list')

      if(window.innerWidth <= 900) {
    if(projectsList[0].childNodes.length >= 3) {
  
      projectsList[0].style.justifyContent = 'left'
    }
  
    if(projectsList[1].childNodes.length >= 4) {
  
      projectsList[1].style.justifyContent = 'left'
    }
  
    if(projectsList[2].childNodes.length >= 4) {
      projectsList[2].style.justifyContent = 'left'
    }
  } else {
    for(let i = 0; i < 3; i++) {
      projectsList[i].style.justifyContent = 'center'
    }
  }

  window.addEventListener('resize', () => {
    if(window.innerWidth <= 900) {
    if(projectsList[0].childNodes.length >= 3) {
  
      projectsList[0].style.justifyContent = 'left'
    }
  
    if(projectsList[1].childNodes.length >= 4) {
  
      projectsList[1].style.justifyContent = 'left'
    }
  
    if(projectsList[2].childNodes.length >= 4) {
      projectsList[2].style.justifyContent = 'left'
    }
  } else {
    for(let i = 0; i < 3; i++) {
      projectsList[i].style.justifyContent = 'center'
    }
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
 // window.location.href = '/admin/unauthorized.html'
} 
} catch(err) {
  console.log(err)
          const errors = err.response.data.errors
          errorHandler.returnErrors(errors)

}