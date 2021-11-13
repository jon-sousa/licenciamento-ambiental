'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Estados', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      data: {
        type: Sequelize.DATEONLY
      },
      solicitacaoId: {
        type: Sequelize.INTEGER,
        references: {model: 'Solicitacoes', key: 'id'},
        allowNull: false
      },
      funcionarioId: {
        type: Sequelize.STRING,
        references: {model: 'Funcionarios', key: 'matricula'},
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
    await queryInterface.dropTable('Estados');
  }
};