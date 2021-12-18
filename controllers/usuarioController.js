const {Usuario} = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const usuario = require('../models/usuario')

function validarUsuario(usuario){
    if(!usuario){
        return "Informe os valores para usuario"
    }

    if(!usuario.nome){
        return "O campo nome nao foi informado"
    }
    
    if(!usuario.senha){
        return "O campo senha nao foi informado"
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

function alteraUsuario(usuarioOriginal, usuarioAlterado){
    if(usuarioAlterado.nome){
        usuarioOriginal.nome = usuarioAlterado.nome
    }
    
    if(usuarioAlterado.endereco){
        usuarioOriginal.endereco = usuarioAlterado.endereco
    }
    
    if(usuarioAlterado.telefone){
        usuarioOriginal.telefone = usuarioAlterado.telefone
    }
    
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

    async login(req, res){

        try{
            const {cpf} = req.user
        
            jwt.sign({cpf: cpf}, process.env.TOKEN_SECRET, (erro, token) => {
                if(erro){
                    return res.status(500).json({Error: `Erro ao gerar token ${erro}`})
                }
                
                res.append('Authorization', token)
				res.append("Access-Control-Expose-Headers", "*")
                res.status(204).send()
            })
            
        }
        catch(e){
            return res.status(500).json({Error: `Aconteceu um erro: ${e}`})
        }

    },

    async alterarUsuario(req, res){
        try{
            let usuario = req.user

            if(!usuario){
                return res.status(404).json({error: 'usuario nao encontrado'})
            }

            alteraUsuario(usuario, req.body)  
            await usuario.save()         
            return res.status(200).json({result: "usuario alterado com sucesso"}) 
        }
        catch(error){
            return res.status(500).json({error: error})
        }
    }
}