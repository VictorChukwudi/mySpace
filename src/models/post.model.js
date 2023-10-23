const {DataTypes}=require("sequelize")
module.exports=sequelize.define("Post",{
    author_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    space_id:{
        type: DataTypes.UUIDV4,
        unique:true
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    body:{
        type:DataTypes.STRING,
        allowNull:false
    },
    images:{
        type:DataTypes.ARRAY,   
    }
})