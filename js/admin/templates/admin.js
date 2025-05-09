import AbstractTemplate from './abstract.js'

export default class Admin extends AbstractTemplate{
    constructor(modal) {
        super(modal)
    }


      adminTemplate() {
        return `  
        ${this.templateHeader()}
        <main class="content">
            <section id="projects-section" class="content-section">
                <div class="item-header">
                    <h2 class="admin-title">Projetos</h2>
                    <div class="item-header-options">
                        <a class=" button-item-options" href="./projects.html">editar itens</a>
                    <button id="projects" class="post button-item-options">criar novo projeto</button>
                    </div>
                </div>
                <ul class="items-list admin-page">
    
                </ul>
            </section>
    
            <section id="areas-section" class="content-section">
                <div class="item-header">
                    <h2 class="admin-title">Áreas</h2>
                    <div class=item-header-options>
                         <a class="button-item-options" href="./areas.html">editar itens</a>
                     <button id="areas" class="post button-item-options">criar nova area</button>
                    </div>
                   
                </div>
    
                <ul class="items-list admin-page">
    
                </ul>
    
    
    
    
            </section>
    
            <section id="technologies-section" class="content-section">
                <div class="item-header">
                    <h2 class="admin-title">Tecnologias</h2>
                    <div class="item-header-options">
                    <a class=" button-item-options" href="./technologies.html">editar itens</a>
                    <button id="technologies" class="post button-item-options">criar nova tecnologia</button>
                    </div>
                    

                </div>
    
                <ul class="items-list admin-page">
    
                </ul>
            </section>
    
        </main>
    
       ${this.templateFooter()}
    `
    }
}

