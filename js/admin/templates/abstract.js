
import Api from "../api/api.js"


const api = new Api()

export default class AbstractTemplate {
  constructor(modal) {
    this.modal = modal

  }

  templateHeader() {
    return ` <header class="admin-header">
            <div class="admin-header-conteiner">
                <a href="./admin.html" id="user-type"></a>
                <nav class="nav-header">
                <button id="btn-mobile" aria-label="botão mostrar menu">
                <span id="hamburguer" class="admin"></span>
            </button>
                    <ul class="header-list admin">
                        <li class="hover"><a class="admin-header-color-link" href="./projects.html">projetos</a></li>
    
                        <li class="hover"><a class="admin-header-color-link" href="./areas.html">areas</a></li>
    
                        <li class="hover"><a href="./technologies.html" class="admin-header-color-link" >tecnologias</a></li>
                        <li class="hover"><button id="logout" class=" header-button">Sair</button>
                        </li>
                    </ul>
                </nav>
    
            </div>
    
        </header>`
  }

  templateFooter() {
    return ` <footer class="admin-footer">
            <div class="footer-icon">
                <a href="https://www.linkedin.com/in/vicente-dos-santos-b48805196/" target="_blank"><img src="../img/linkedin.svg" alt="developer linkedin link"> <a>
            </div>
            <div>Vicente Matheus dos Santos Souza</div>
        </footer>`
  }

  //template de area e tech
  techAndArea(item, template) {
    return `<h2 class="titulo1">${item.title}</h2>
                        ${item.description ? `<p class="exp-p">${item.description || ""}</p>` : ""}
                        <div class="item-options">
                            <button id="${template}" value="${
      item.id
    }" class=" ${template} button-item-options put editProject">editar</button>
                            <button id="${template}" value="${
      item.id
    }" class=" ${template} button-item-options delete excludeProject">excluir</button>
                        </div>`;
  }

  async header() { 
    try{
      const options = {
        withCredentials: true,
  
      }
      const info = await api.getData("https://cms-gwjr.onrender.com/api/v1/users/info", options);
      const DOMrole = document.querySelector("#user-type");
  
      DOMrole.innerHTML =
        info.data.role === "admin" ? "administrador" : "convidado";

        if(info.data.role === "admin") {
          const usersButton = document.createElement('li')
          usersButton.innerHTML = '<a class="admin-header-color-link" href="./users.html">usuários</a>'
          const headerNav = document.querySelector('.header-list')
          usersButton.classList.add('hover')
          headerNav.insertBefore(usersButton, headerNav.firstChild)
        }
  

    } catch (err) {
      console.log(err)
    }
   
  }
}
