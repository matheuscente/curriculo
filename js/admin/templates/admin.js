import AbstractTemplate from './abstract.js'

export default class Admin extends AbstractTemplate{
    constructor(modal) {
        super(modal)
    }


      adminTemplate() {
        return `   <header class="admin-header">
            <div class="admin-header-conteiner">
                <span id="user-type"></span>
                <nav class="nav-header">
                <button id="btn-mobile" aria-label="botão mostrar menu">
                <span id="hamburguer" class="admin"></span>
            </button>
                    <ul class="header-list">
                        <li class="header-nav-item hover"><a href="./projects.html">projetos</a></li>
    
                        <li class="header-nav-item hover"><a href="./areas.html">areas</a></li>
    
                        <li class="header-nav-item hover"><a href="./technologies.html">tecnologias</a></li>
                        <li class="header-nav-item hover"><button class=" header-button">Sair</button>
                        </li>
                    </ul>
                </nav>
    
            </div>
    
        </header>
        <main class="content">
            <section id="projects-section" class="content-section">
                <div class="item-header">
                    <h2 class="admin-title">Projetos</h2>
                    <a class=" button-item-options" href="./projects.html">editar itens</a>
                    <button id="projects" class="post button-item-options">criar novo projeto</a>
    
                </div>
                <ul class="items-list">
    
                </ul>
            </section>
    
            <section id="areas-section" class="content-section">
                <div class="item-header">
                    <h2 class="admin-title">Áreas</h2>
                    <a class="button-item-options" href="./areas.html">editar itens</a>
                     <button id="areas" class="post button-item-options">criar nova area</a>
                </div>
    
                <ul class="items-list">
    
                </ul>
    
    
    
    
            </section>
    
            <section id="technologies-section" class="content-section">
                <div class="item-header">
                    <h2 class="admin-title">Tecnologias</h2>
                    <a class=" button-item-options" href="./technologies.html">editar itens</a>
                    <button id="technologies" class="post button-item-options">criar nova tecnologia</a>

                </div>
    
                <ul class="items-list">
    
                </ul>
            </section>
    
        </main>
    
        <footer class="admin-footer">
            <div class="footer-icon">
                <a href="https://www.linkedin.com/in/vicente-dos-santos-b48805196/" target="_blank"><img src="../img/linkedin.svg" alt="developer linkedin link"> <a>
            </div>
            <div>Vicente Matheus dos Santos Souza</div>
        </footer>
    `
    }
}

