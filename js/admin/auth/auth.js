import Api from "../api/api.js";

const api = new Api();

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
        let data = await api.postData(url, loginData);

        if (data.status === 200 || response.status === 201) {
          data = data.data.data;
          sessionStorage.setItem("token", data.token);
          sessionStorage.setItem("refreshToken", data.refreshToken);

          window.location.href = "/admin/admin.html";
        }
      } catch (err) {
        console.log(err)
        event.preventDefault();
        if (err.status === 401) {
          window.location.href = "/unauthorized";
        }
      }
    });
  }

  //faz uma requisição com o token salvo, caso não autorizado, direciona pra pag unauthorized
  async isAuth() {
    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        return false;
      }
      const options = {
        headers: {
          Authorization: token,
        },
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

  //faz o logout e limpa o storage
  async logout() {
    try {
      const refreshToken = sessionStorage.getItem("refreshToken");

      await api.postData(
        "http://localhost:3000/api/v1/session/logout",
        {
          refreshToken,
        },
        {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        }
      );

      sessionStorage.removeItem("token");
      sessionStorage.removeItem("refreshToken");

      window.location.href = "/admin/login.html";
    } catch (err) {
      console.log("erro ao fazer logout");
    }
  }
}
