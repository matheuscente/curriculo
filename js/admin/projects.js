import Exp from '../exp/exp.js'


const projects = new Exp()



function listTechs(techs) {
    const list = techs.map((item) => {
        return `<li>${item.name}</li>`
    })

    return list
}

function project(item) {
    return `
    <div class="exp-lista-item padding-bottom-none margin-bottom-none">
        <h2 class="titulo1">${item.title}<span>${item.year}</span></h2>
        <p class="exp-p">${item.description || ""}</p>
        <h2 class="titulo2">Desenvolvedor ${item.area.name}</h2>

        <ul class="lista-habilidades">
        ${listTechs(item.technologies)}
        </ul>
    </div>

    <div class="item-options">
        <button class="button-item-options">editar</button>
        <button class="button-item-options">excluir</button>
    </div>`
}

function techAndArea(item) {
    return `<h2 class="titulo1">${item.name}</h2>
                    <p class="exp-p">${item.description || ""}</p>
                    <div class="item-options">
                        <button class="button-item-options">editar</button>
                        <button class="button-item-options">excluir</button>
                    </div>`
}

async function attItems (url, template) {
    let projectSession;
    let itemClass;
    if(template === 'project') {
        projectSession = document.querySelectorAll('.items-list')[0]
        itemClass = 'project-bg'
    } else if (template === 'tech' || template === 'area') {
        itemClass = ['area-item', 'project-bg']
        if(template === 'tech') {
            projectSession = document.querySelectorAll('.items-list')[1]
        } else if(template === 'area') {
            projectSession = document.querySelectorAll('.items-list')[2]
        }
        
    }
    
    try {
        const data = await projects.getData(url)
    data.forEach(item => {

        const li = document.createElement('li')
        if(Array.isArray(itemClass)) {
            itemClass.forEach((item) => {
                li.classList.add(item)
            })
        } else {
            li.classList.add(itemClass)
        }
        
        if(template === 'project') {
            li.innerHTML = project(item)
        } else if (template === 'tech' || template === 'area') {
            li.innerHTML = techAndArea(item)
        }

        projectSession.appendChild(li)
    });
    } catch (err) {
        console.log(err)
    }

} 

await attItems('http://localhost:3000/api/v1/projects', 'project')
await attItems('http://localhost:3000/api/v1/technologies', 'tech')
await attItems('http://localhost:3000/api/v1/areas', 'area')