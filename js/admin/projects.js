
import {attItems} from './fns.js'

if(window.location.pathname === "/admin/admin.html") {
  await attItems("http://localhost:3000/api/v1/projects", "projects");
  await attItems("http://localhost:3000/api/v1/technologies", "technologies");
  await attItems("http://localhost:3000/api/v1/areas", "areas");
}
 else if (window.location.pathname === "/admin/areas.html") {
  await attItems("http://localhost:3000/api/v1/areas", "areas");
}
 else if (window.location.pathname === "/admin/technologies.html") {
  await attItems("http://localhost:3000/api/v1/technologies", "technologies");
} 
else if (window.location.pathname === "/admin/projects.html") {
  await attItems("http://localhost:3000/api/v1/projects", "projects");
}



