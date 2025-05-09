import Api from "../api/api.js";
import { getCookie } from "../fns/fns.js";
import Errors from "../errors/errors.js";

const api = new Api();
const formatErrors = new Errors()

export default class Auth {

  // faz uma requisição na rota de login com os dados fornecidos pelo usuário
  async login() {
    const url = "http://localhost:3000/api/v1/login";

    const form = document.querySelector("#login-form");

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      try {
        const formData = new FormData(form);

        const loginData = {
          userName: formData.get("username"),
          password: formData.get("password"),
        };


        let data = await api.postData(url, loginData, {
          withCredentials: true
        });

        if (data.status === 200 || data.status === 201) {
          
          await api.getData('http://localhost:3000/api/v1/session/csrfToken', {
            withCredentials: true
          }) 

          window.location.href = "/admin/admin.html";
        }
      } catch (err) {
        event.preventDefault();
        console.log(err)
      }
    });
  }

  //faz uma requisição com o token salvo, caso não autorizado, direciona pra pag unauthorized
  async isAuth() {
    try {

      const options = {
        withCredentials: true
      };
      const response = await api.getData(
        "http://localhost:3000/api/v1/users/info",
        options
      );
      if (response.status === 200 || response.status === 201) {
        return true;
      }
    } catch (err) {
      if (err.status === 401) {
        return false;
      }
    }
  }

  //faz o logout
  async logout() {
    try {
      await api.postData(
        "http://localhost:3000/api/v1/session/logout",
        null,{
          withCredentials: true,
          headers: {
             'X-CSRF-Token': getCookie('XSRF-TOKEN')
          },
        }
      );
      window.location.href = "/admin/login.html";
    } catch (err) {
      const errors = err.response.data.errors
      formatErrors.returnErrors(errors)
    }
  }
}
