import { attItems, makeAction } from "../fns/fns.js";
import Auth from "../auth/auth.js";
import Admin from "../templates/admin.js";

try{const auth = new Auth();
const admin = new Admin();



const isAuthenticated = await auth.isAuth();

if (isAuthenticated) {
  const body = document.querySelector("#body");

  body.innerHTML = admin.adminTemplate();
  await admin.header();
  await attItems("http://localhost:3000/api/v1/projects", "projects");
  await attItems("http://localhost:3000/api/v1/areas", "areas");
  await attItems("http://localhost:3000/api/v1/technologies", "technologies");


    body.addEventListener("click", async (event) => {
     await makeAction(event)
    });
} else {
  window.location.href = "/unauthorized";
} 
} catch(err) {
    console.log(err)
}
