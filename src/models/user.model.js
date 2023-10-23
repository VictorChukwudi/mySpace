const { DataTypes } = require("sequelize");
module.exports = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    // allowNull: true,
  },
  lastName: {
    type: DataTypes.STRING,
    // allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    // allowNull: true,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    // allowNull: true,
    unique: true,
  },
  isAdmin:{
    type: DataTypes.BOOLEAN,
   defaultValue:false
  }
});
