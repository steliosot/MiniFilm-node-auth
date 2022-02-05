const hapiJoi = require('@hapi/joi')

const registerValidation = (data) =>{

    const schemaValidation = hapiJoi.object({
        name:hapiJoi.string().required().min(4).max(256),
        email:hapiJoi.string().required().min(6).max(256).email(),
        password:hapiJoi.string().required().min(6).max(1024)
    })
    return schemaValidation.validate(data)
}

const loginValidation = (data) =>{

    const schemaValidation = hapiJoi.object({
        email:hapiJoi.string().required().min(6).max(256).email(),
        password:hapiJoi.string().required().min(6).max(1024)
    })
    return schemaValidation.validate(data)
}
module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation