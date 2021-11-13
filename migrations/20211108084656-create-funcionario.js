'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Funcionarios', {
      nome: {
        type: Sequelize.STRING
      },
      senha: {
        type: Sequelize.STRING
      },
      matricula: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
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
    await queryInterface.dropTable('Funcionarios');
  }
};