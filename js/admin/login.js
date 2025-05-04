import { isAuth } from "./fns.js";

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
    let data = await axios.post(url, loginData);

    if (data.status === 200 || response.status === 201) {
      data = data.data.data;
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("refreshToken", data.refreshToken);

      window.location.href = "/admin/admin.html";
    }
  } catch (err) {
    event.preventDefault();
    if (err.status === 401) {
      window.location.href = "/unauthorized";
    }
  }
});
