'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Funcionario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Funcionario.hasMany(models.Estado, {
        foreignKey: 'funcionarioId'
      })
    }
  };
  Funcionario.init({
    nome: DataTypes.STRING,
    senha: DataTypes.STRING,
    matricula: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Funcionario',
  });
  return Funcionario;
};