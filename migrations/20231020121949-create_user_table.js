'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable("Users",{
      id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: Sequelize.STRING,
        // allowNull: true,
      },
      lastName: {
        type: Sequelize.STRING,
        // allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        // allowNull: true,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        // allowNull: true,
        unique: true,
      },
      isAdmin:{
        type:Sequelize.BOOLEAN,
        defaultValue:false
      },
      createdAt: Sequelize.DATE,
      updatedAt:Sequelize.DATE
    })
  },

  async down (queryInterface, Sequelize) {
   return queryInterface.dropTable("Users")
  }
};
