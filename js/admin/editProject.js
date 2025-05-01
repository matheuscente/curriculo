import { openModal, closeModal } from "./fns.js";

document.addEventListener("click", async (event) => {
  if (event.target.classList.contains("patch")) {
    await openModal(event.target, "patch");

    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("modal-project-close-btn")) {
        closeModal();
      }
    });
  }
});
