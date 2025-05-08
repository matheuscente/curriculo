import Technologies from "./technologies.js";
import AbstractTemplate from "./abstract.js";


const technologies = new Technologies()

export default class Projects extends AbstractTemplate {
    constructor(modal) {
        super(modal)
    }
    
    //template de projeto
  project(item, template) {
    return `
        <div class="exp-lista-item padding-bottom-none margin-bottom-none">
            <h2 class="titulo1">${item.title}<span>${
      item.inProgress === true ? "em andamento" : "finalizado"
    }</span> <span>${item.year}</span></h2>
            <p class="exp-p">${item.description || ""}</p>
            <h2 class="titulo2">Desenvolvedor ${item.area.title}</h2>
    
            <ul class="lista-habilidades">
            ${technologies.listTechs(item.technologies).join("")}
            </ul>
        </div>
    
        <div class="item-options">
            <button id="${template}" value="${
      item.id
    }" class=" ${template} button-item-options projects patch editProject">editar</button>
            <button id="${template}" value="${
      item.id
    }" class=" ${template} delete button-item-options projects delete excludeProject">excluir</button>
        </div>`;
  }
    //retorna o template da pag de projetos
    projectsTemplate() {
        return `   <header class="admin-header">
            <div class="admin-header-conteiner">
                <span id="user-type"></span>
                <nav class="nav-header">
                <button id="btn-mobile" aria-label="botão mostrar menu">
                <span id="hamburguer"></span>
            </button>
                    <ul class="header-list">
                        <li class="header-nav-item hover"><a href="./projects.html">projetos</a></li>
    
                        <li class="header-nav-item hover"><a href="./areas.html">areas</a></li>
    
                        <li class="header-nav-item hover"><a href="./technologies.html">tecnologias</a></li>
                        <li class="header-nav-item hover"><button class="header-button">Sair</button>
                        </li>
                    </ul>
                </nav>
    
            </div>
    
        </header>
        <main class="content">
                <div class="item-header">
                    <h2 class="admin-title">Projetos</h2>
                    <button id="projects" class="post project-create button-item-options">criar projeto</button></div>
                <ul class="items-list">
                    
                </ul>
        </main>
    
        <footer class="admin-footer">
             <div class="footer-icon">
                <a href="https://www.linkedin.com/in/vicente-dos-santos-b48805196/" target="_blank"><img src="../img/linkedin.svg" alt="developer linkedin link"> <a>
            </div>
            <div>Vicente Matheus dos Santos Souza</div>
        </footer>
    `
    }
}

