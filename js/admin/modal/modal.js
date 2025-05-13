import Api from "../api/api.js"
import { getCookie } from "../fns/fns.js";
import Errors
 from "../errors/errors.js";

const api = new Api()
const formatErrors = new Errors()

export default class Modal {
  constructor({getAreas, getTechs}) {
    this.getAreas = getAreas,
    this.getTechs = getTechs
  }
//remove modal com classe ".modal"
 closeModal() {
    const modal = document.querySelector(".modal");
    modal.remove();
  }
  
  //template dos formularios de edição
  async modalTemplate(template, action) {
    if (template === "projects") {
      return ` <div class="modal-project-overlay" id="modalProjectOverlay">
      <div class="modal-project-container">
        <button class="modal-project-close-btn">×</button>
  
        <form class="formulario" method="POST">
          <label for="titulo" class="modal-project-label">Título</label>
          <input type="text" id="titulo" name="titulo" class="modal-project-input" ${action === "post" && 'required'}>
    
          <label for="descricao" class="modal-project-label">Descrição</label>
          <textarea id="descricao" name="descricao" rows="4" class="modal-project-textarea" ${action === "post" && 'required'}></textarea>
    
          <label for="ano" class="modal-project-label">Ano</label>
          <input type="number" id="ano" name="ano" class="modal-project-input" ${action === "post" && 'required'}>
  
          <label for="url" class="modal-project-label">link do projeto</label>
          <input type="text" id="url" name="url" class="modal-project-input" ${action === "post" && 'required'}>
    
    
    
    <legend class="modal-project-label">Tecnologias</legend>
      <div class="modal-techs">
        ${(await this.getTechs()).join("")}
      </div>
    
          <label for="area" class="modal-project-label">Área</label>
          <select id="area" name="area" class="modal-project-select" ${action === "post" && 'required'}>
            ${await this.getAreas()}
          </select>
    
          <label for="progresso" class="modal-project-label">Em progresso?</label>
          <select id="progresso" name="progresso" class="modal-project-select" ${action === "post" && 'required'}>
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </select>
    
          <button type="submit" class="modal-project-submit-btn">Enviar</button>
        </form>
      </div>
    </div>`;
    } else if (template === "technologies" || template === "areas") {
      return ` <div class="modal-project-overlay" id="modalProjectOverlay">
      <div class="modal-project-container">
        <button class="modal-project-close-btn">×</button>
  
        <form class="formulario" method="POST">
          <label for="titulo" class="modal-project-label">Título</label>
          <input type="text" id="titulo" name="titulo" class="modal-project-input" ${action === "post" && 'required'}>
    
          <label for="descricao" class="modal-project-label">Descrição</label>
          <textarea id="descricao" name="descricao" rows="4" class="modal-project-textarea"></textarea>
  
          <button type="submit" class="modal-project-submit-btn">Enviar</button>
        </form>
      </div>
    </div>`;
    }
  }

  
//abre o modal
 async openModal(target, action) {
    const main = document.querySelector(".content");
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = await this.modalTemplate(target.id, action);
  
    main.appendChild(modal);
  }
  
  //recebe o item clicado e a ação desejada. Faz a requisição de acordo com a ação e id do target
   async sendModalData(target, action) {
    const modal = document.querySelector(".modal");
    const form = modal.querySelector("form");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const formData = new FormData(form);
  
      const checkboxes = form.querySelectorAll(
        'input[name="tecnologias"]:checked'
      );
      const tecnologiasSelecionadas = Array.from(checkboxes).map((cb) => {
        return Number.parseInt(cb.value);
      });
      
      try {
        if (action === "post") {
          await this.postItem(formData, target, tecnologiasSelecionadas)
            window.location.reload();
          
          
        } else if (action === "put") {
          await this.putItem(formData, target, tecnologiasSelecionadas)
              
            window.location.reload()
          
        }

        this.closeModal()
      }
      catch(err) {
        console.log(err)
        event.preventDefault()
        const errors = err.response.data.errors
        formatErrors.returnErrors(errors)
      }
      
    });
  }

  async putItem(formData, target, tecnologiasSelecionadas) {
    let data = {};
          if(target.id === "projects") {
            const formItems = {
            title: formData.get("titulo"),
            description: formData.get("descricao"),
            year: formData.get("ano"),
            technologies: tecnologiasSelecionadas,
            area: formData.get("area") === '0' ? false : Number.parseInt( formData.get("area")),
            inProgress: formData.get("progresso"),
          };

          for (const field in formItems) {
            if(field !== 'inProgress' && field !== 'technologies') {
              if(formItems[field]) {
    
                data[field] = formItems[field]
              }
            } else if(field === 'inProgress') {

              if(formItems[field] === 'true' || formItems[field] === 'false') {
                formItems[field] === 'true' ? data[field] = true : data[field] = false 
              }
            } else if(field === 'technologies') {
              if(formItems[field].length >= 1) {
                data[field] = formItems[field]
              }
            }
          }
          } else if(target.id === "areas" || target.id === "technologies") {
            data = {
            title: formData.get("titulo"),
            description: formData.get("descricao"),
            }
          }
  
             
                  await api.putData(
                    `http://localhost:3000/api/v1/${target.id}/${target.value}`,
                    data,
                    {
                      withCredentials: true,
                      headers: {
                         'X-CSRF-Token': getCookie('XSRF-TOKEN')
                      },
                    }
                  );
  }



  async postItem(formData, target, tecnologiasSelecionadas) {

          let data;
          if (target.id === "projects") {
            data = {
              title: formData.get("titulo"),
              description: formData.get("descricao"),
              year: formData.get("ano"),
              technologies: tecnologiasSelecionadas,
              area: formData.get("area"),
              url: formData.get("url"),
              inProgress: formData.get("progresso") === "true",
            };
          } else if (target.id === "areas" || target.id === "technologies") {
            data = {
              title: formData.get("titulo"),
              description: formData.get("descricao"),
            };
    
            if (!data.description) {
              delete data.description;
            }
          }
      
            await api.postData(
              `http://localhost:3000/api/v1/${target.id}/${target.value}`,
              data,
              {
                withCredentials: true,
                headers: {
                  'X-CSRF-Token': getCookie('XSRF-TOKEN')
                },
              }
            );
  }

  //Modal de confirmação de exclusão
  showDeleteConfirmationModal(onConfirm) {
    const modal = document.createElement("div");
    modal.classList.add("modal-confirm-overlay");
    modal.innerHTML = `
        <div class="modal-confirm-container">
          <p class="modal-confirm-text">Você realmente deseja excluir este item?</p>
          <div class="modal-confirm-buttons">
            <button class="confirm-no">Não</button>
            <button class="confirm-yes">Sim</button>
          </div>
        </div>
      `;
    document.body.appendChild(modal);
  
    modal
      .querySelector(".confirm-no")
      .addEventListener("click", () => modal.remove());
    modal.querySelector(".confirm-yes").addEventListener("click", () => {
      onConfirm();
      modal.remove();
    });
  }
}