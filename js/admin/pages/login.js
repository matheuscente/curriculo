import Auth from "../auth/auth.js"
import Errors from "../errors/errors.js";
const auth = new Auth()
const formatErrors = new Errors()

const url = "https://cms-gwjr.onrender.com/api/v1/login";

    const form = document.querySelector("#login-form");
    const errorSpan = document.createElement('span')
    const btn = document.querySelector('.login-item-button')

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
    window.alert('Este projeto utiliza uma instância gratuíta para backend, estando sujeita a inicialização a frio e lentidão. Conto com sua compreensão!')
    errorSpan.style.display = 'block'
    errorSpan.style.textAlign = 'center'
    errorSpan.style.fontFamily = 'Arial'
    errorSpan.style.fontSize = '0.9 rem'
    errorSpan.style.marginBottom = '1rem'
    errorSpan.style.color = '#000000'
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

