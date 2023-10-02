const {DataTypes} = require("sequelize");
const sequelize = require("../database/db");

const Products =sequelize.define("products",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
   },
   name: {
       type: DataTypes.STRING
   },
   description: {
       type: DataTypes.STRING(2000)
   },
   price:{
    type:DataTypes.INTEGER
   }
}
);

module.exports=Products;
