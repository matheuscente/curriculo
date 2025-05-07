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
         'invalid role': 'tipo de usuário inválido',
         'role invalid or not provided': "tipo de usuário invalido ou não fornecido"

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
        "not found project": "projeto não econtrado",
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
    },

    "uniqueViolation": {
        "please send a new userName for users": "por favor, informe outro username",
         "please send a new title for technologies": "por favor, informe um novo nome para a tecnologia",
         "please send a new title for areas": "por favor, informe um novo nome para a area",
         "please send a new title for projects": "por favor, informe um novo nome para o projeto"

    },

    "nullViolation": {
        "set a title value for areas": "por favor, informe o título da area",
        "set a title value for technologies": "por favor, informe o título da tecnologia",
        "set a title value for projects": "por favor, informe o título do projeto",
        "set a title value for areas": "por favor, informe o título da area",
        "set a year value for projects": "por favor, informe o ano do projeto",
        "set a year areaId for projects": "por favor, informe a area do projeto",
        "set a url value for projects": "por favor, informe o link do projeto",
        "set a inProgress value for projects": "por favor, informe o estado do projeto",
        "set a name value for users": "por favor, informe um nome",
        "set a userName value for users": "por favor, informe um username",
        "set a password value for users": "por favor, informe uma senha",
        "set a role value for users": "por favor, informe o tipo do usuário"
    },

    "validationError": {
        //required
        "title is not allowed to be empty": "informe um titulo",
        "name is not allowed to be empty": "informe um nome",
        "role is not allowed to be empty": "informe o tipo do usuário",
        "field is not allowed to be empty": "informe o campo a ser modificado",
        "description is not allowed to be empty": "informe uma descrição",
        "url is not allowed to be empty": "informe o link do projeto",
        "year is not allowed to be empty": "informe o ano do projeto",
        "area is not allowed to be empty": "informe uma area para o projeto",
        "inProgress is not allowed to be empty": "informe o estado do projeto",
        "userName is not allowed to be empty": "informe um username",
        "password is not allowed to be empty": "informe um password",

        //format invalid
        "title length must be less than or equal to 40 characters long": "o título deve ter no máximo 40 caracteres",
        "description length must be less than or equal to 150 characters long": "a descrição deve ter no máximo 150 caracteres",
        "id must be a number": "o id deve ser um número",
         "url length must be less than or equal to 120 characters long": "o link do projeto deve ter no máximo 120 caracteres",
        "title must be a string": "o título deve ser um texto",
         "description must be a string": "a descrição deve ser uma texto",
         "inProgress must be a boolean": "O progresso deve ser 'sim' ou 'não'",
         "technologies must be an array": "tecnologias deve ser uma lista de tecnologias",
         




        "year must be a number": "informe um ano válido",
        "technologies must contain at least 1 items": "informe pelo menos uma tecnologia",
        "area must be a number": "informe uma area válida"
    }
}

export default class Errors {
    compareError(returnedError) {
        for(const error in errors) {
            
            if(returnedError.name === error) {
                console.log(error)
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

    returnErrors(errors) {
        const listedErrors = this.listErrors(errors)
        let returnErrors;
        for(let i = 0; i < listedErrors.length; i++) {
          returnErrors = returnErrors ? returnErrors  + "\n" + listedErrors[i] : "\n" + listedErrors[i]
        }
        window.alert(returnErrors)
    }
}



