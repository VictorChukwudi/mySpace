const {DataTypes}=require("sequelize")
module.exports=sequelize.define("Space",{
    creator_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    space_id:{
        type:DataTypes.UUIDV4,
        unique:true
    },
    spaceName:{
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    }
})