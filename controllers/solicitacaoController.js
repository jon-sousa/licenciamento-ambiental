const {Usuario, Solicitacao, Estado} = require('../models')

module.exports = {
    async cadastrarSolicitacao(req, res){
        try{
            
            let usuario = req.user;
            let {imovel} = req.body;
            let file = req.file
    
            if(!imovel) {
                return res.status(406).json({error: "informe o imovel"})
            }
            
            let estado = {
                nome: 'cadastro inicial',
                data: new Date()
            }

            let solicitacao = await Solicitacao.create(
                {
                    imovel: imovel,
                    ultimoEstado: estado,
                    Estados: [estado]
                },
                {
                    include: [Estado]
                }
            )
                
            if(file){
                await solicitacao.createDocumento({nome: file.filename})
            }

            await usuario.addSolicitacao(solicitacao)
            await usuario.save()
    
            return res.status(201).json({result: 'solicitacao incluido com sucesso'})
        }
        catch(error){
            return res.status(500).json({error: error.message})
        }
    } , 

    async consultaSolicitacoesPorUsuario(req, res){
        try{
            let usuario = req.user
            let solicitacoes = await usuario.getSolicitacaos({
                attributes: ['id', 'imovel', 'ultimoEstado'], include: {
                    model: Estado,
                    as: 'estados',
                    attributes: ['id', 'nome', 'data']
                }
            });
    
            if(!solicitacoes){
                return res.status(204).send()
            }
    
            return res.status(200).json(solicitacoes)
        }
        catch(error){
            return res.status(500).json({error: error.message})
        }
    }
}