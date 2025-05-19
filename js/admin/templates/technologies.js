import AbstractTemplate from "./abstract.js";
import Api from '../api/api.js'

const api = new Api()


export default class Technologies extends AbstractTemplate {
  constructor(modal) {
    super(modal)
}
    //template de tecnologias
    technologiesTemplate() {
        return `  ${this.templateHeader()}
        <main class="content">
                <div class="item-header">
                    <h2 class="admin-title">Tecnologias</h2>
                    <button id="technologies" class="post project-create button-item-options">criar tecnologia</button></div>
                <ul class="items-list">
                    
                </ul>
        </main>
    
        ${this.templateFooter()}
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
      let techs = await api.getData("https://cms-gkqy.onrender.com/api/v1/technologies", options);
      techs = techs.data;

      if(techs.length === 0) {
        return [
          ` <span>Não há tecnologias cadastradas, favor cadastrar uma tecnologia.</span>`,
        ];
      } else {
        return techs.map((item) => {
          return ` <label class="modal-tech-item">
          <input type="checkbox" name="tecnologias" value="${item.id}" class="modal-project-checkbox"> ${item.title}
        </label>`;
        });
      }
      
    } catch (err) {
      (err);
      if (err.status === 400) {
        return [
          ` <span>Não há tecnologias cadastradas, favor cadastrar uma tecnologia.</span>`,
        ];
      }
    }
  }
}

