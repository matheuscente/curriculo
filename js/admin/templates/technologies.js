import AbstractTemplate from "./abstract.js";
import Api from '../api/api.js'

const api = new Api()


export default class Technologies extends AbstractTemplate {
  constructor(modal) {
    super(modal)
}
    //template de tecnologias
    technologiesTemplate() {
        return `  <header class="admin-header">
            <div class="admin-header-conteiner">
                <span id="user-type">Administrador</span>
                <nav>
                    <ul class="header-nav">
                        <li class="header-nav-item"><a href="./projects.html">projetos</a></li>
    
                        <li class="header-nav-item"><a href="./areas.html">areas</a></li>
    
                        <li class="header-nav-item"><a href="./technologies.html">tecnologias</a></li>
                        <li class="header-nav-item"><button class="header-button">Sair</button></li>
                    </ul>
                </nav>
            </div>
    
        </header>
        <main class="content">
                <div class="item-header">
                    <h2 class="admin-title">Tecnologias</h2>
                    <button id="technologies" class="post project-create button-item-options">criar tecnologia</button></div>
                <ul class="items-list">
                    
                </ul>
        </main>
    
        <footer class="admin-footer">
             <div class="footer-icon">
                <a href="https://www.linkedin.com/in/vicente-dos-santos-b48805196/" target="_blank"><img src="../img/linkedin.svg"> <a>
            </div>
            <div>Vicente Matheus dos Santos Souza</div>
        </footer>
    `
    }

    //recebe as tecnologias e retorna uma lista de LIs
  listTechs(techs) {
    const list = techs.map((item) => {
      return `<li>${item.title}</li>`;
    });
  
    return list;
  }
  
  //busca as techs no BD e retorna um array de checkbox com cada tecnologia
  //se vazio, retorna span informando que não há techs
   async getTechs() {
    try {
      
      const options = {
        withCredentials: true,

      }
      let techs = await api.getData("http://localhost:3000/api/v1/technologies", options);
      techs = techs.data;

      if(techs.length === 0) {
        return [
          ` <span>Não há tecnologias cadastradas, favor cadastrar uma tecnologia.</span>`,
        ];
      } else {
        return techs.map((item) => {
          return ` <label>
          <input type="checkbox" name="tecnologias" value="${item.id}" class="modal-project-checkbox"> ${item.title}
        </label>`;
        });
      }
      
    } catch (err) {
      console.log(err);
      if (err.status === 400) {
        return [
          ` <span>Não há tecnologias cadastradas, favor cadastrar uma tecnologia.</span>`,
        ];
      }
    }
  }
}

