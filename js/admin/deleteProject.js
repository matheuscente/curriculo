import { showDeleteConfirmationModal } from "./fns.js";

document.addEventListener("click", async (event) => {
  console.log(event.target)
  if (event.target.classList.contains("delete")) {
    
     showDeleteConfirmationModal(async () => {
      try {
          await axios.delete(`http://localhost:3000/api/v1/${event.target.id}/${event.target.value}`);
          window.location.reload();
        } catch (err) {
          console.error('Erro ao excluir projeto:', err);
        }
    });

    document.addEventListener("click", (event) => {
      if (event.target.classList.contains("modal-project-close-btn")) {
        closeModal();
      }
    });
  }
});



 