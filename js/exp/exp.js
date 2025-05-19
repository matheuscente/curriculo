
export default class Exp {
  constructor (api, technologies) {
    this.api = api
    this.technologies = technologies
  }

  async projectsIndex () {
    (this.api)
    const ul = document.querySelector('.experiencia-lista')
    const url = 'https://cms-gkqy.onrender.com/api/v1/projects'
    
    try {
        let data = await this.api.getData(url)
        data = data.data
    data.forEach(item => {
        const project = document.createElement('li')
        project.innerHTML = this.project(item)
        ul.appendChild(project)
    });
    } catch (err) {
        (err)
    }

} 


  project(item) {
     let title;
    (item.inProgress)
     item.inProgress ? title =  `<h2 class="titulo1">${item.title} <span>em andamento</span></h2>` : title = `<h2 class="titulo1">${item.title} <span>finalizado</span></h2>`

    return ` 
        <a class="exp-lista-item" href="${item.url}" target="_blank">
            <span class="ano">${item.year}</span>
            ${title}
            <p class="exp-p">${item.description}</p>
            <h2 class="titulo2">Desenvolvedor ${item.area.title}</h2>
            <ul class="lista-habilidades">
                ${(this.technologies.listTechs(item.technologies)).join("")}
            </ul>
        </a>`;
  }
}
