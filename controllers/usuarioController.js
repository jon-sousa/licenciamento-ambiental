const {Usuario} = require('../models')
const bcrypt = require('bcrypt')

function validarUsuario(usuario){
    if(!usuario){
        return "Informe os valores para usuario"
    }

    if(!usuario.nome){
        return "O campo nome nao foi informado"
    }

    
    if(!usuario.telefone){
        return "O campo telefone nao foi informado"
    }
    if(!usuario.endereco){
        return "O campo endereco nao foi informado"
    }
    
    if(!usuario.cpf){
        return "O campo CPF nao foi informado"        
    }

    if(usuario.cpf.length != 11){
        return "CPF deve conter 11 numeros"
    }

    if(isNaN(Number(usuario.cpf))){
        return "Informe somente numeros no campo CPF"
    }

    return null
}

async function existeUsuarioCadastrado(cpf){
    let usuario = await Usuario.findOne({
        where: {
            cpf: cpf
        }
    })
    console.log(usuario)
    return usuario
}

module.exports = {

    async cadastrarUsuario(req, res){
        try{
            let usuario = req.body
            let validacaoErro = validarUsuario(usuario)

            if(validacaoErro){
                return res.status(403).json({Error: validacaoErro})
            }

            let usuarioCadastrado = await existeUsuarioCadastrado(usuario.cpf)

            if(usuarioCadastrado){
                return res.status(406).json({Error: "Usuario ja cadastrado"})
            }
 
            usuario.senha = await bcrypt.hash(usuario.senha, 12)
            await Usuario.create(usuario)
            return  res.status(201).json(usuario)

        }
        catch(e){
            return res.status(500).json({Error: e})
        }
    },
}