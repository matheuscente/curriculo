import Exp from '../exp/exp.js'
import Technologies from "../admin/templates/technologies.js";
import Api from '../admin/api/api.js'

const technologies = new Technologies()
const api = new Api()
const projects = new Exp(api, technologies)

await projects.projectsIndex()