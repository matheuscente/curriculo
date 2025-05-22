import Auth from "../auth/auth.js"

const auth = new Auth()

const url = "https://cms-gkqy.onrender.com/api/v1/login";

    const form = document.querySelector("#login-form");
    const errorSpan = document.createElement('span')

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

        errorSpan.innerText = 'Aguarde...'
        errorSpan.style.color = 'var(c--12)'
        
        form.insertBefore(errorSpan, form.lastChild)
        auth.login(url, form).then(() => {
            window.location.href = '/curriculo/admin/admin.html'
        }).catch((err) => {
             event.preventDefault();
             if(err.response.data.errors === "invalid userName or password") {
                errorSpan.style.color = '#FF0000'
                errorSpan.innerText = 'usuário ou senha invalidos'
             } else {
                const errors = err.response.data.errors
            formatErrors.returnErrors(errors)
             }
            
        })
    })

