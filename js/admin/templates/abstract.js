
import Api from "../api/api.js"


const api = new Api()

export default class AbstractTemplate {
  constructor(modal) {
    this.modal = modal

  }

  //template de area e tech
  techAndArea(item, template) {
    return `<h2 class="titulo1">${item.title}</h2>
                        <p class="exp-p">${item.description || ""}</p>
                        <div class="item-options">
                            <button id="${template}" value="${
      item.id
    }" class=" ${template} button-item-options patch editProject">editar</button>
                            <button id="${template}" value="${
      item.id
    }" class=" ${template} button-item-options delete excludeProject">excluir</button>
                        </div>`;
  }

  async header(auth) { 
    try{
      const options = {
        withCredentials: true,
  
      }
      const info = await api.getData("http://localhost:3000/api/v1/users/info", options);
      const DOMrole = document.querySelector("#user-type");
  
      DOMrole.innerHTML =
        info.data.role === "admin" ? "administrador" : "convidado";

        if(info.data.role === "admin") {
          const usersButton = document.createElement('li')
          usersButton.innerHTML = '<a href="./users.html">usuários</a>'
          const headerNav = document.querySelector('.header-nav')
          usersButton.classList.add('header-nav-item')
          headerNav.insertBefore(usersButton, headerNav.firstChild)
        }
  
      const logoutButton = document.querySelector(".header-button");
  
      logoutButton.addEventListener("click", auth.logout);
    } catch (err) {
      console.log(err)
    }
   
  }
}
