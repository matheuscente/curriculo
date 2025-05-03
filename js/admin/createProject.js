import { openModal, closeModal, sendModalData } from "./fns.js";

document.addEventListener("click", async (event) => {
  if (event.target.classList.contains("post")) {
    await openModal(event.target);
    await sendModalData(event.target, "post")


    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("modal-project-close-btn")) {
        closeModal();
      }
    });
  }
});
