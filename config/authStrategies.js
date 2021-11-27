const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const bearerStrategy = require('passport-http-bearer').Strategy
const {Usuario, Funcionario} = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

passport.use('local-usuario', new localStrategy(
    {
        usernameField: 'cpf',
        passwordField: 'senha'
    }, 
    async (cpf, senha, done)=>{
        
        try{
    
            if(!cpf || !senha){
                return done(null, false, {message: 'Informe cpf e senha'})
            }
            
            let usuario = await Usuario.findOne({
                where: {cpf: cpf}  
            })
            
            if(!usuario){
                return done(null, false, {message: 'Efetue o cadastro'})
            }
            
            senhaValida = await bcrypt.compare(senha, usuario.senha)
            
            if(!senhaValida){
                return done(null, false, {message: 'E-mail ou senha incorretos'})
            }

            return done(null, usuario)
        }
        catch(error){
            return done(error)
        }
    })
)

passport.use('local-funcionario', new localStrategy(
    {
        usernameField: 'matricula',
        passwordField: 'senha'
    }, 
    async (matricula, senha, done)=>{
        
        try{
    
            if(!matricula || !senha){
                return done(null, false, {message: 'Informe matricula e senha'})
            }
            
            let funcionario = await Funcionario.findOne({
                where: {matricula: matricula}
            })
            
            if(!funcionario){
                return done(null, false, {message: 'Efetue o cadastro'})
            }
            
            senhaValida = await bcrypt.compare(senha, funcionario.senha)
            
            if(!senhaValida){
                return done(null, false, {message: 'E-mail ou senha incorretos'})
            }

            return done(null, funcionario)
        }
        catch(error){
            return done(error)
        }
    })
)

passport.use('bearer-usuario', new bearerStrategy(
    async (token, done)=>{
        try{
            if(!token){
                return done(null, false, {message: 'Usuário não autenticado'})
            }
    
            let payload = jwt.verify(token, process.env.TOKEN_SECRET)
            let usuario = await Usuario.findOne({where: {cpf: payload.cpf}})
    
            if(!usuario){
                return done(null, false, {message: 'Usuário não encontrado'})
            }
    
            return done(null, usuario, {token: token})
        }
        catch(error){
            return done(error)
        }
    }
))

passport.use('bearer-funcionario', new bearerStrategy(
    async (token, done)=>{
        try{
            if(token){
                return done(null, false, {message: 'Usuário não autenticado'})
            }
    
            let payload = jwt.verify(token, process.env.TOKEN_SECRET)
            let funcionario = await Funcionario.findOne({where: {matricula: payload.matricula}})
    
            if(!funcionario){
                return done(null, false, {message: 'Usuário não encontrado'})
            }
    
            return done(null, funcionario, {token: token})
        }
        catch(error){
            return done(error)
        }
    })
)
