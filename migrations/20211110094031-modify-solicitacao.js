'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Solicitacoes', 'ultimoEstado', Sequelize.INTEGER)
    await queryInterface.addConstraint('Solicitacoes', {
      fields: ['ultimoEstado'],
      type: 'foreign key',
      name: 'ultimo_estado_fk',
      references: {
        table: 'Estados',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Solicitacoes', 'ultimo_estado_fk')
    await queryInterface.removeColumn('Solicitacoes', 'ultimoEstado')

  }
};
