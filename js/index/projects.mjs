import Exp from '../exp/exp.js'


const projects = new Exp()

async function projectsIndex () {
    const url = 'http://localhost:3000/api/v1/projects'
    
    try {
        const data = await projects.getData(url)
    data.forEach(item => {
        projects.project(item)
    });
    } catch (err) {
        console.log(err)
    }

} 

await projectsIndex()