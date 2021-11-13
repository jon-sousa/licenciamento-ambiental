const {Documento, Solicitacao} = require('../models')
const path = require('path')

module.exports = {
    async uploadDocumento(req, res){
       try{ 
            let file = req.file
            if(!file){
                return res.status(403).json({Error: 'Arquivo nao anexado'})
            }
            
            let solicitacao = await Solicitacao.create({imovel: 'casa dos bobos'})
            await Documento.create({nome: file.filename, solicitacaoId: solicitacao.id})
            
            return res.status('201').json({Response: "Documento inserido com sucesso"})
        }
        catch(e){
            return res.status(403).json({Error: e})            
        }
    },

    downloadDocumento(req, res){
        let filename = req.params.filename
        
        if(!filename){
            return res.status(403).json({Error: 'Arquivo nao anexado'})
        }
        
        let filepath = path.resolve(__dirname, '..', 'public', 'uploads', filename)

        let document = require(filepath)

        if(!document){
            return res.status(403).json({Error: 'Arquivo nao anexado'})
        }

        return res.download(filepath)
    }
}