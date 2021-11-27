const {Funcionario} = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

function validarFuncionario(funcionario){
    if(!funcionario){
        return "Informe os valores para funcionario"
    }

    if(!funcionario.nome){
        return "O campo nome nao foi informado"
    }

    if(!funcionario.senha){
        return "O campo senha nao foi informado"
    }
    
    if(!funcionario.matricula){
        return "O campo matricula nao foi informado"        
    }

    if(isNaN(Number(funcionario.matricula))){
        return "Informe somente numeros no campo matricula"
    }

    return null
}

async function existeFuncionarioCadastrado(matricula){
    let funcionario = await Funcionario.findOne({
        where: {
            matricula: matricula
        }
    })
    console.log(funcionario)
    return funcionario
}

module.exports = {

    async cadastrarFuncionario(req, res){
        try{
            let funcionario = req.body
            let validacaoErro = validarFuncionario(funcionario)

            if(validacaoErro){
                return res.status(403).json({Error: validacaoErro})
            }

            let funcionarioCadastrado = await existeFuncionarioCadastrado(funcionario.matricula)

            if(funcionarioCadastrado){
                return res.status(406).json({Error: "funcionario ja cadastrado"})
            }
 
            funcionario.senha = await bcrypt.hash(funcionario.senha, 12)
            await Funcionario.create(funcionario)
            return  res.status(201).json({result: "resultado cadastrado com sucesso"})

        }
        catch(e){
            console.log(e)
            return res.status(500).json({Error: e.message})
        }
    },

    async login(req, res){

        try{
            const {matricula} = req.user
        
            jwt.sign({matricula: matricula}, process.env.TOKEN_SECRET, (erro, token) => {
                if(erro){
                    return res.status(500).json({Error: `Erro ao gerar token ${erro}`})
                }
                
                res.append('token', token)
                res.status(204).send()
            })
            
        }
        catch(e){
            return res.status(500).json({Error: `Aconteceu um erro: ${e}`})
        }

    }
}