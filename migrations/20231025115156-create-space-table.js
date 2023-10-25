'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   return  queryInterface.createTable("Spaces",{
    creator_id:{
      type: Sequelize.INTEGER,
      // allowNull: false,
  },
  space_id:{
      type:Sequelize.UUID,
      primaryKey: true,
      unique:true
  },
  spaceName:{
      type: Sequelize.STRING,
      // allowNull: false,
      unique:true
  },
  url:{
      type:Sequelize.STRING,
      // allowNull:false
  },
  createdAt: Sequelize.DATE,
  updatedAt:Sequelize.DATE
   })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable("Spaces")
  }
};
