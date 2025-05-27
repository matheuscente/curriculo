import { toggleMenu } from "./toggleMenu.js";
import { scrollBehavior } from "./scrollBehavior.js";
import Exp from "../js/exp/exp.js";
import Technologies from "../js/admin/templates/technologies.js";
import Api from "../js/admin/api/api.js";
import Modal from "../js/admin/modal/modal.js";
import Areas from "../js/admin/templates/areas.js";

const areas = new Areas();
const technologies = new Technologies();
const api = new Api();
const projects = new Exp(api, technologies);
const modal = new Modal({
  getAreas: areas.getAreas.bind(areas),
  getTechs: technologies.getTechs.bind(technologies),
});

const getAwaitMockTarget = {
  id: "getAwait",
};

await modal.openModal(getAwaitMockTarget, null, ".index-body");

const nav = document.querySelector(".nav-header"),
        btnMobile = document.getElementById("btn-mobile"),
        btnHeader = document.querySelectorAll(".btn-header-list");

      btnMobile.addEventListener("click", (event) => {
        toggleMenu(event, nav);
      });
      btnMobile.addEventListener("touchstart", (event) => {
        toggleMenu(event, nav);
      });

      btnHeader.forEach((btn) => {
        btn.addEventListener("touchstart", () => {
          scrollBehavior();
          nav.classList.remove("show");
        });
        btn.addEventListener("click", () => {
          scrollBehavior();
          nav.classList.remove("show");
        });
      });

projects
  .projectsIndex()
  .then(() => {
    const closeModalBtn = document.createElement("button");
    closeModalBtn.classList.add("modal-project-close-btn");
    closeModalBtn.innerText = "x";

    const modalConfirmConteiner = document.querySelector(
      ".modal-project-container"
    );

    modalConfirmConteiner.appendChild(closeModalBtn);

    closeModalBtn.addEventListener("click", () => {
      modal.closeModal();
    });

    setTimeout(() => {
      modal.closeModal();
    }, 5000);
  })
  .catch(() => {
    const modal = document.querySelector(".modal-project-container");
    modal.innerHTML = ` <p>
                            Ocorreu um erro ao buscar os projetos, por favor, recarregue a página e tente novamente.
                        <p>`;
  });
