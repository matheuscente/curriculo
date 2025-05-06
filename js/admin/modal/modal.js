import Api from "../api/api.js"
import { getCookie } from "../fns/fns.js";

const api = new Api()

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
  async modalTemplate(template) {
    if (template === "projects") {
      return ` <div class="modal-project-overlay" id="modalProjectOverlay">
      <div class="modal-project-container">
        <button class="modal-project-close-btn">×</button>
  
        <form class="formulario" method="POST">
          <label for="titulo" class="modal-project-label">Título</label>
          <input type="text" id="titulo" name="titulo" class="modal-project-input">
    
          <label for="descricao" class="modal-project-label">Descrição</label>
          <textarea id="descricao" name="descricao" rows="4" class="modal-project-textarea"></textarea>
    
          <label for="ano" class="modal-project-label">Ano</label>
          <input type="text" id="ano" name="ano" class="modal-project-input">
  
          <label for="url" class="modal-project-label">link do projeto</label>
          <input type="text" id="url" name="url" class="modal-project-input">
    
    
    
    <legend class="modal-project-label">Tecnologias</legend>
    
      ${(await this.getTechs()).join("")}
    
          <label for="area" class="modal-project-label">Área</label>
          <select id="area" name="area" class="modal-project-select">
            ${await this.getAreas()}
          </select>
    
          <label for="progresso" class="modal-project-label">Em progresso?</label>
          <select id="progresso" name="progresso" class="modal-project-select">
          <option value="true" selected disabled>Selecione uma opção</option>
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
          <input type="text" id="titulo" name="titulo" class="modal-project-input">
    
          <label for="descricao" class="modal-project-label">Descrição</label>
          <textarea id="descricao" name="descricao" rows="4" class="modal-project-textarea"></textarea>
  
          <button type="submit" class="modal-project-submit-btn">Enviar</button>
        </form>
      </div>
    </div>`;
    }
  }

  
//abre o modal
 async openModal(target) {
    const main = document.querySelector(".content");
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = await this.modalTemplate(target.id);
  
    main.appendChild(modal);
  }
  
  //recebe o item clicado e a ação desejada. Faz a requisição de acordo com a ação e id do target
   async sendModalData(target, action) {
    const modal = document.querySelector(".modal");
    const form = modal.querySelector("form");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      this.closeModal();
  
      const formData = new FormData(form);
  
      const checkboxes = form.querySelectorAll(
        'input[name="tecnologias"]:checked'
      );
      const tecnologiasSelecionadas = Array.from(checkboxes).map((cb) => {
        return Number.parseInt(cb.value);
      });
  
      if (action === "post") {
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
        try {
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
          window.location.reload();
        } catch (err) {
          console.log(err);
        }
      } else if (action === "patch") {
        const data = {
          title: formData.get("titulo"),
          description: formData.get("descricao"),
          year: formData.get("ano"),
          technologies: tecnologiasSelecionadas,
          area: formData.get("area"),
          inProgress: formData.get("progresso"),
        };
        for (let field in data) {
          if (data[field]) {
            const update = {
              field: field,
              value: data[field],
            };
            try {
              await api.patchData(
                `http://localhost:3000/api/v1/${target.id}/${target.value}`,
                update,
                {
                  withCredentials: true,
                  headers: {
                     'X-CSRF-Token': getCookie('XSRF-TOKEN')
                  },
                }
              );
            } catch (err) {
              console.log(err);
            }
          }
        }
        window.location.reload();
      }
    });
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