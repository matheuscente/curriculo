import Auth from "../auth/auth.js"
import Errors from "../errors/errors.js";
const auth = new Auth()
const formatErrors = new Errors()

const url = "https://cms-gkqy.onrender.com/api/v1/login";

    const form = document.querySelector("#login-form");
    const errorSpan = document.createElement('span')
    const btn = document.querySelector('.login-item-button')

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      errorSpan.style.marginBottom = '1rem'
        errorSpan.style.color = 'var(c--12)'
        errorSpan.innerText = 'Aguarde...'

        form.insertBefore(errorSpan, btn)
        auth.login(url, form).then(() => {
            window.location.href = '/curriculo/admin/admin.html'
        }).catch((err) => {
             event.preventDefault();
             if(err.response.data.errors[0].error === "invalid username or password") {
                errorSpan.style.color = '#FF0000'
                errorSpan.innerText = 'usuário ou senha invalidos'
             } else {
                const errors = err.response.data.errors
                formatErrors.returnErrors(errors)
             }
            
        })
    })

