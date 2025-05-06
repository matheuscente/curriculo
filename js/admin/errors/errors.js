const errors = {
    "permission denied": {
        "invalid userName or password": "usuário ou senha inválidos",
        "token invalid or not provided": "token inválido ou não fornecido",
        "forgot permission": "Permissão negada",
        "your session as expired, please login again": "Sua sessão inspirou, por favor, logue novamente.",
        "for gerenerate a new token, the atual token need to be invalid": "para gerar um novo token, o token atual deve ser inválido",
        "invalid session":"sessão inválida"
    },

    "invalid action": {
        'cannot delete technology because has a project who use it': 'Não é possível deletar essa tecnologia pois um projeto à usa.',
        'cannot delete area because has a project who use it' : 'Não é possível deletar essa area pois um projeto à usa.'
    }
}

export default class Errors {
    compareError(returnedError) {
        for(const error in errors) {
            console.log(error)
            if(returnedError.name === error) {

                    for(const errMsg in errors[error]) {
                        if(returnedError.error === errMsg) {
                            return errors[error][errMsg]
                        }
                    }
             
            }
        }
    }
    
    listErrors(errors) {
        return errors.map((error) => {
            return this.compareError(error)
        })
    }
}



