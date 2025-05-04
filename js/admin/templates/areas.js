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