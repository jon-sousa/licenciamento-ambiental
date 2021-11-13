'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Usuarios', {
      nome: {
        type: Sequelize.STRING
      },
      cpf: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.STRING
      },
      endereco: {
        type: Sequelize.STRING
      },
      senha: {
        type: Sequelize.STRING
      },
      telefone: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Usuarios');
  }
};