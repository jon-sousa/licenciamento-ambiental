'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Estado extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Estado.belongsTo(models.Funcionario, {foreignKey: 'funcionarioId'})

      Estado.hasOne(models.Solicitacao, {foreignKey: 'ultimoEstado', as: 'estadoAtual'})
      Estado.belongsTo(models.Solicitacao, {foreignKey: 'solicitacaoId', as: 'estados'})
    }
  };
  Estado.init({
    nome: DataTypes.STRING,
    data: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Estado',
  });
  return Estado;
};