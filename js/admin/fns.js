import { getData } from "../admin/getData.js";

//recebe as tecnologias e retorna uma lista de LIs
export function listTechs(techs) {
  const list = techs.map((item) => {
    return `<li>${item.title}</li>`;
  });

  return list;
}

//busca as areas no BD e retorna um array de option com cada area
//se vazio, retorna um option informando que não há areas
export async function getAreas() {
  const data = [
    '<option value="false" disabled selected>Selecione uma opção</option>',
  ];
  try {
    let areas = await getData("http://localhost:3000/api/v1/areas");
    areas = areas.data;

    data.push(
      areas.map((item) => {
        return `<option value="${item.id}">${item.title}</option>`;
      })
    );
    return data;
  } catch (err) {
    console.log(err);
    if (err.status === 400) {
      return `<option disabled>Não há areas cadastradas, favor cadastrar uma area</option>`;
    }
  }
}

//busca as techs no BD e retorna um array de checkbox com cada tecnologia
//se vazio, retorna span informando que não há techs
export async function getTechs() {
  try {
    let techs = await getData("http://localhost:3000/api/v1/technologies");
    techs = techs.data;

    return techs.map((item) => {
      return ` <label>
      <input type="checkbox" name="tecnologias" value="${item.id}" class="modal-project-checkbox"> ${item.title}
    </label>`;
    });
  } catch (err) {
    console.log(err);
    if (err.status === 400) {
      return [
        ` <span>Não há tecnologias cadastradas, favor cadastrar uma tecnologia.</span>`,
      ];
    }
  }
}

//remove modal com classe ".modal"
export function closeModal() {
  const modal = document.querySelector(".modal");
  modal.remove();
}

//template dos formularios de edição
async function modalTemplate(template) {
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
  
    ${(await getTechs()).join("")}
  
        <label for="area" class="modal-project-label">Área</label>
        <select id="area" name="area" class="modal-project-select">
          ${await getAreas()}
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

//faz umaa requisição com o token salvo, caso não autorizado, direciona pra pag unauthorized
export async function unauthorized() {
  try {
    const token = sessionStorage.getItem("token");

    const response = await getData("http://localhost:3000/api/v1/users/info");
    if (response.status === 200 || response.status === 201) {
      return;
    }
  } catch (err) {
    if (err.status === 401) {
      window.location.href = "/unauthorized";
    }
  }
}

//faz o logout e limpa o storage

export async function logout() {
  try {
    const refreshToken = sessionStorage.getItem("refreshToken");

    await axios.post("http://localhost:3000/api/v1/session/logout", {
      refreshToken
    }, {
      headers: {
        Authorization: sessionStorage.getItem("token")
      }
    });

    sessionStorage.removeItem("token")
    sessionStorage.removeItem("refreshToken")

    window.location.href ='/admin/login.html'

  } catch (err) {
    console.log("erro ao fazer logout");
  }
}

//abre o modal
export async function openModal(target) {
  const main = document.querySelector(".content");
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = await modalTemplate(target.id);

  main.appendChild(modal);
}

//recebe o item clicado e a ação desejada. Faz a requisição de acordo com a ação e id do target
export async function sendModalData(target, action) {
  console.log(target);
  const modal = document.querySelector(".modal");
  const form = modal.querySelector("form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    closeModal();

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
        await axios[action](
          `http://localhost:3000/api/v1/${target.id}/${target.value}`,
          data,
          {
            headers: {
              Authorization: sessionStorage.getItem("token"),
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
            await axios[action](
              `http://localhost:3000/api/v1/${target.id}/${target.value}`,
              update,
              {
                headers: {
                  Authorization: sessionStorage.getItem("token"),
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

//template de projeto
export function project(item, template) {
  return `
      <div class="exp-lista-item padding-bottom-none margin-bottom-none">
          <h2 class="titulo1">${item.title}<span>${
    item.inProgress === true ? "em andamento" : "finalizado"
  }</span> <span>${item.year}</span></h2>
          <p class="exp-p">${item.description || ""}</p>
          <h2 class="titulo2">Desenvolvedor ${item.area.title}</h2>
  
          <ul class="lista-habilidades">
          ${listTechs(item.technologies).join("")}
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

//template de area e tech
export function techAndArea(item, template) {
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

//seleciona os itens de acordo com o pathName, faz a requisição pro bd e cria os itens do DOM
export async function attItems(url, template) {
  let projectSession;
  let itemClass;
  let errCase;

  if (window.location.pathname === "/admin/areas.html") {
    if (template === "areas") {
      itemClass = ["area-item", "project-bg"];
      errCase = "areas";
      projectSession = document.querySelectorAll(".items-list")[0];
    }
  } else if (window.location.pathname === "/admin/technologies.html") {
    if (template === "technologies") {
      itemClass = ["area-item", "project-bg"];
      errCase = "tecnologias";
      projectSession = document.querySelectorAll(".items-list")[0];
    }
  } else if (window.location.pathname === "/admin/admin.html") {
    if (template === "projects") {
      itemClass = "project-bg";
      errCase = "projetos";
      projectSession = document.querySelectorAll(".items-list")[0];
    }
    if (template === "technologies") {
      itemClass = ["area-item", "project-bg"];
      errCase = "tecnologias";
      projectSession = document.querySelectorAll(".items-list")[2];
    }
    if (template === "areas") {
      itemClass = ["area-item", "project-bg"];
      errCase = "areas";
      projectSession = document.querySelectorAll(".items-list")[1];
    }
  } else if (window.location.pathname === "/admin/projects.html") {
    if (template === "projects") {
      itemClass = ["project-bg"];
      errCase = "projetos";
      projectSession = document.querySelectorAll(".items-list")[0];
    }
  }

  try {
    let data = await getData(url);
    data = data.data;
    if (projectSession) {
      data.forEach((item) => {
        const li = document.createElement("li");
        if (Array.isArray(itemClass)) {
          itemClass.forEach((item) => {
            li.classList.add(item);
          });
        } else {
          li.classList.add(itemClass);
        }

        if (template === "projects") {
          li.innerHTML = project(item, template);
        } else if (template === "technologies" || template === "areas") {
          li.innerHTML = techAndArea(item, template);
        }

        projectSession.appendChild(li);
      });
    } else {
      return;
    }
  } catch (err) {
    if (err.status === 400 && projectSession) {
      const li = document.createElement("li");
      li.innerText = `Você não tem ${errCase} cadastrado(a)`;
      projectSession.appendChild(li);
    }
  }
}

//Modal de confirmação de exclusão
export function showDeleteConfirmationModal(onConfirm) {
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
