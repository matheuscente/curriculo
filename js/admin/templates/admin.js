import AbstractTemplate from './abstract.js'

export default class Admin extends AbstractTemplate{
    constructor(modal) {
        super(modal)
    }


      adminTemplate() {
        return `   <header class="admin-header">
            <div class="admin-header-conteiner">
                <span id="user-type"></span>
                <nav>
                    <ul class="header-nav">
                        <li class="header-nav-item"><a href="./projects.html">projetos</a></li>
    
                        <li class="header-nav-item"><a href="./areas.html">areas</a></li>
    
                        <li class="header-nav-item"><a href="./technologies.html">tecnologias</a></li>
                        <li class="header-nav-item"><button class="header-button">Sair</button>
                        </li>
                    </ul>
                </nav>
    
            </div>
    
        </header>
        <main class="content">
            <section id="projects-section">
                <div class="item-header">
                    <h2 class="admin-title">Projetos</h2>
                    <a class=" button-item-options" href="./projects.html">editar itens</a>
                    <button id="projects" class="post button-item-options">criar novo projeto</a>
    
                </div>
                <ul class="items-list">
    
                </ul>
            </section>
    
            <section id="areas-section">
                <div class="item-header">
                    <h2 class="admin-title">Áreas</h2>
                    <a class="button-item-options" href="./areas.html">editar itens</a>
                     <button id="areas" class="post button-item-options">criar nova area</a>
                </div>
    
                <ul class="items-list">
    
                </ul>
    
    
    
    
            </section>
    
            <section id="technologies-section">
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
                <a href="https://www.linkedin.com/in/vicente-dos-santos-b48805196/" target="_blank"><img src="../img/linkedin.svg"> <a>
            </div>
            <div>Vicente Matheus dos Santos Souza</div>
        </footer>
    `
    }
}

