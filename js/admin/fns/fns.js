import Api from "../api/api.js";
import Modal from "../modal/modal.js";
import Areas from "../templates/areas.js";
import Technologies from "../templates/technologies.js";
import Project from "../templates/projects.js";
import Errors from "../errors/errors.js";

const api = new Api();
const areas = new Areas();
const technologies = new Technologies();
const project = new Project();
const returnError = new Errors()

const modal = new Modal({
  getAreas: areas.getAreas.bind(areas),
  getTechs: technologies.getTechs.bind(technologies),
});

//seleciona os itens de acordo com o pathName, faz a requisição pro bd e cria os itens do DOM
export async function attItems(url, template) {
  try {
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
      const options = {
        withCredentials: true,
      };
      let data = await api.getData(url, options);
      data = data.data;
      if (projectSession) {
        if (data.length === 0) {
          const li = document.createElement("li");
          li.innerText = `Você não tem ${errCase} cadastrado(a)`;
          projectSession.appendChild(li);
        } else {
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
              li.innerHTML = project.project(item, template);
            } else if (template === "technologies" || template === "areas") {
              li.innerHTML = areas.techAndArea(item, template);
            }
            projectSession.appendChild(li);
          });
        }
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
  } catch (err) {
    (err);
  }
}

export async function makeAction(event, auth) {
  if(event.target.classList.contains("header-button")) {
    await auth.logout()
  } else if (event.target.classList.contains("post")) {
    await modal.openModal(event.target, "post");
    await modal.sendModalData(event.target, "post");
  } else if (event.target.classList.contains("put")) {
    await modal.openModal(event.target, "put");
    await modal.sendModalData(event.target, "put");
  } else if (event.target.classList.contains("delete")) {
    modal.showDeleteConfirmationModal(async () => {
      try {
        const cookie = getCookie("XSRF-TOKEN");
        await api.deleteData(
          `https://cms-gkqy.onrender.com/api/v1/${event.target.id}/${event.target.value}`,
          {
            withCredentials: true,
            headers: {
              "X-CSRF-Token": cookie,
            },
          }
        );
        window.location.reload();
      } catch (err) {
        const errors = err.response.data.errors
        returnError.returnErrors(errors)
      }
    });
  } else if (event.target.classList.contains("modal-project-close-btn")) {
    modal.closeModal();
  }
}

export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
