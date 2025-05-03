import { getData } from "./getData.js";
import { logout } from "./fns.js";

const info = await getData('http://localhost:3000/api/v1/users/info')
const DOMrole = document.querySelector('#user-type')

DOMrole.innerHTML = info.data.role === "admin" ? "administrador"  : "convidado" 

const logoutButton = document.querySelector('.header-button')

logoutButton.addEventListener("click", logout)