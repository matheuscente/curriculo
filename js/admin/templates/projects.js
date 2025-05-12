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
    }" class=" ${template} button-item-options projects put editProject">editar</button>
            <button id="${template}" value="${
      item.id
    }" class=" ${template} delete button-item-options projects delete excludeProject">excluir</button>
        </div>`;
  }
    //retorna o template da pag de projetos
    projectsTemplate() {
        return `  ${this.templateHeader()}
        <main class="content">
                <div class="item-header">
                    <h2 class="admin-title">Projetos</h2>
                    <button id="projects" class="post project-create button-item-options">criar projeto</button></div>
                <ul class="items-list">
                    
                </ul>
        </main>
    
        ${this.templateFooter()}
    `
    }
}

