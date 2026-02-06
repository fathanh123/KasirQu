'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'sku', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addIndex('products', ['sku'], {
      unique: true,
      name: 'products_sku_unique'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'sku');
  }
};
