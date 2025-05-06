import {getData} from '../admin/getData.js'
import Exp from '../exp/exp.js'

const projects = new Exp()


async function projectsIndex () {
    const ul = document.querySelector('.experiencia-lista')
    const url = 'http://localhost:3000/api/v1/projects'
    
    try {
        let data = await getData(url, {
            headers: {
                Authorization: sessionStorage.getItem('token')
            }
        })
        data = data.data
    data.forEach(item => {
        const project = document.createElement('li')
        project.innerHTML = projects.project(item)
        ul.appendChild(project)
    });
    } catch (err) {
        console.log(err)
    }

} 

await projectsIndex()