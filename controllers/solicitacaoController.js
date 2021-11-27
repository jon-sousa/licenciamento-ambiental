const {Usuario, Solicitacao, Estado} = require('../models')

module.exports = {
    async cadastrarSolicitacao(req, res){
        try{
            
            let usuario = req.user;
            let {imovel} = req.body;
    
            if(!imovel) {
                return res.status(406).json({error: "informe o imovel"})
            }
    
            let solicitacao = await Solicitacao.create(
                {
                    imovel: imovel,
                    Estados: [{
                        nome: 'cadastro inicial',
                        data: new Date()
                    }]
                },
                {
                    include: [Estado]
                }
            )
    
            await usuario.addSolicitacao(solicitacao)
            await usuario.save()
    
            return res.status(201).json({result: 'resultado incluido com sucesso'})
        }
        catch(error){
            return res.status(500).json({error: error.message})
        }
    }  
}