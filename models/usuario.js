'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Usuario.hasMany(models.Solicitacao, {
        foreignKey: 'usuarioId'
      })
    }
  };
  Usuario.init({
    nome: DataTypes.STRING,
    cpf: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    endereco: DataTypes.STRING,
    telefone: DataTypes.STRING,
    senha: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};