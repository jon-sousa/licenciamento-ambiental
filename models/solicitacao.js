'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Solicitacao extends Model {
    
    static associate(models) {
      Solicitacao.hasMany(models.Documento, {
        foreignKey: 'solicitacaoId'
      })
      
      Solicitacao.hasMany(models.Estado, {
        foreignKey: 'solicitacaoId'
      })

      Solicitacao.belongsTo(models.Usuario)
    }
  };
  Solicitacao.init({
    imovel: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Solicitacao',
    tableName: 'Solicitacoes'
  });
  return Solicitacao;
};