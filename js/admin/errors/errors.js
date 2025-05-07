const errors = {
    "permissionDenied": {
        "invalid username or password": "usuário ou senha inválidos",
        "token invalid or not provided": "token inválido ou não fornecido",
        "forgot permission": "Permissão negada",
        "your session as expired, please login again": "Sua sessão inspirou, por favor, logue novamente.",
        "for gerenerate a new token, the atual token need to be invalid": "para gerar um novo token, o token atual deve ser inválido",
        "invalid session":"sessão inválida",
         "refresh token invalid or not provided": "refresh token inválido ou não fornecido",
         'not found user': "usuário não encontrado",
         'invalid role': 'tipo de usuário inválido'

    },

    "missingSession": {
        'not found session': 'sessão não encontrada'
    },

    "invalidAction": {
        'cannot delete technology because has a project who use it': 'Não é possível deletar essa tecnologia pois um projeto à usa.',
        'cannot delete area because has a project who use it' : 'Não é possível deletar essa area pois um projeto à usa.',
        'cannot edit jwt': "não permitido editar o token",
        'invalid session modification': "modificação de sessão inválida"
    },

    "missingArea": {
        "not found areas in id": "area não encontrada."
    },

    "missingProject": {
        "not found projects in id": "projeto não encontrado"
    },

    "missingTech": {
        "not found technologies in id": "tecnologia não encontrada",
        "an informed technology was not found": "uma tecnologia informada não foi encontrada"

    },

    "missingUser": {
        "not found user in provided id": "usuário não encontrado"
    },

    "internalError": {
        "an internal error was ocurred": "erro interno, por favor tente novamente"
    },

    "missingPassword": {
        "password undefined": "senha inválida ou não informada"
    }
}

export default class Errors {
    compareError(returnedError) {
        for(const error in errors) {
            console.log(error)
            if(returnedError.name === error) {

                    for(const errMsg in errors[error]) {
                        if(returnedError.error.includes(errMsg)) {
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



