import AbstractTemplate from "./abstract.js";
import Api from '../api/api.js'

const api = new Api()

export default class Areas extends AbstractTemplate{
  constructor(modal) {
    super(modal)
}

    //retorna o template de areas
     areasTemplate() {
        return ` ${this.templateHeader()}
        <main class="content">
                <div class="item-header">
                    <h2 class="admin-title">Áreas</h2>
                    <button id="areas" class="post project-create button-item-options">criar área</button></div>
                <ul class="items-list">
                    
                </ul>
        </main>
    
        ${this.templateFooter()}
    `
    }

    //busca as areas no BD e retorna um array de option com cada area
    //se vazio, retorna um option informando que não há areas
     async getAreas() {
      try {
        const options = {
          withCredentials: true,

        }
        let areas = await api.getData("http://localhost:3000/api/v1/areas", options);
        areas = areas.data;

        if(areas.length === 0 ) {
          return `<option disabled>Não há areas cadastradas, favor cadastrar uma area</option>`;
        } else {
          const data = [
            '<option value="0" disabled selected>Selecione uma opção</option>',
          ];
          data.push(
            areas.map((item) => {
              return `<option value="${item.id}">${item.title}</option>`;
            })
          );
          return data;
        }
       
      } catch (err) {
        (err)
          return `<option disabled>Não há areas cadastradas, favor cadastrar uma area</option>`;

      }
    }

}

