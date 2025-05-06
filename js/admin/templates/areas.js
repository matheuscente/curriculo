<<<<<<< HEAD
export function areasTemplate() {
    return `   <header class="admin-header">
        <div class="admin-header-conteiner">
            <span id="user-type">Administrador</span>
            <nav>
                <ul class="header-nav">
                    <li class="header-nav-item"><a href="./projects.html">projetos</a></li>

                    <li class="header-nav-item"><a href="./areas.html">areas</a></li>

                    <li class="header-nav-item"><a href="./technologies.html">tecnologias</a></li>
                    <li class="header-nav-item"><button class="header-button">Sair</button></li>
                </ul>
            </nav>
        </div>

    </header>
    <main class="content">
            <div class="item-header">
                <h2 class="admin-title">Áreas</h2>
                <button id="areas" class="post project-create button-item-options">criar área</button></div>
            <ul class="items-list">
                
            </ul>
    </main>

    <footer class="admin-footer">
        <div class="footer-icon">
            <img src="../img/linkedin.svg">
        </div>
        <div>Vicente Matheus dos Santos Souza</div>
    </footer>
`
}
=======
import AbstractTemplate from "./abstract.js";
import Api from '../api/api.js'

const api = new Api()

export default class Areas extends AbstractTemplate{
  constructor(modal) {
    super(modal)
}

    //retorna o template de areas
     areasTemplate() {
        return `   <header class="admin-header">
            <div class="admin-header-conteiner">
                <span id="user-type">Administrador</span>
                <nav>
                    <ul class="header-nav">
                        <li class="header-nav-item"><a href="./projects.html">projetos</a></li>
    
                        <li class="header-nav-item"><a href="./areas.html">areas</a></li>
    
                        <li class="header-nav-item"><a href="./technologies.html">tecnologias</a></li>
                        <li class="header-nav-item"><button class="header-button">Sair</button></li>
                    </ul>
                </nav>
            </div>
    
        </header>
        <main class="content">
                <div class="item-header">
                    <h2 class="admin-title">Áreas</h2>
                    <button id="areas" class="post project-create button-item-options">criar área</button></div>
                <ul class="items-list">
                    
                </ul>
        </main>
    
        <footer class="admin-footer">
             <div class="footer-icon">
                <a href="https://www.linkedin.com/in/vicente-dos-santos-b48805196/" target="_blank"><img src="../img/linkedin.svg"> <a>
            </div>
            <div>Vicente Matheus dos Santos Souza</div>
        </footer>
    `
    }

    //busca as areas no BD e retorna um array de option com cada area
    //se vazio, retorna um option informando que não há areas
     async getAreas() {
      const data = [
        '<option value="false" disabled selected>Selecione uma opção</option>',
      ];
      try {
        const options = {
          headers: {
            Authorization: sessionStorage.getItem('token'),
          },
        }
        let areas = await api.getData("http://localhost:3000/api/v1/areas", options);
        areas = areas.data;
    
        data.push(
          areas.map((item) => {
            return `<option value="${item.id}">${item.title}</option>`;
          })
        );
        return data;
      } catch (err) {

        if (err.status === 400) {
          return `<option disabled>Não há areas cadastradas, favor cadastrar uma area</option>`;
        }
      }
    }

}

>>>>>>> origin/refactor/js
