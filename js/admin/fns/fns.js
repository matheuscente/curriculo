  import Api from '../api/api.js'
  import Modal from '../modal/modal.js'
  import Areas from '../templates/areas.js'
  import Technologies from '../templates/technologies.js'
  import Project from '../templates/projects.js'


  const api = new Api()
  const areas = new Areas()
  const technologies = new Technologies()
  const project = new Project()

  const modal = new Modal( {getAreas: areas.getAreas.bind(areas),
    getTechs: technologies.getTechs.bind(technologies)})
  
  //seleciona os itens de acordo com o pathName, faz a requisição pro bd e cria os itens do DOM
  export async function attItems(url, template) {

    try{
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
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        };
        let data = await api.getData(url, options);
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
              li.innerHTML = project.project(item, template);
            } else if (template === "technologies" || template === "areas") {
              li.innerHTML = areas.techAndArea(item, template);
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
    }catch(err) {
      console.log(err)
    }

  }

  export async function  makeAction(event){
    if (event.target.classList.contains("post")) {
      await modal.openModal(event.target);
      await modal.sendModalData(event.target, "post");
    } else if (event.target.classList.contains("patch")) {
      await modal.openModal(event.target);
      await modal.sendModalData(event.target, "patch");
    } else if (event.target.classList.contains("delete")) {
      modal.showDeleteConfirmationModal(async () => {
        try {
          await api.deleteData(
            `http://localhost:3000/api/v1/${event.target.id}/${event.target.value}`,
            {
              headers: {
                Authorization: sessionStorage.getItem("token"),
              },
            }
          );
          window.location.reload();
        } catch (err) {
          console.error("Erro ao excluir projeto:", err);
        }
      });
    } else if (event.target.classList.contains("modal-project-close-btn")) {
      modal.closeModal();
    }
  }