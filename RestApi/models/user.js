const {DataTypes} = require("sequelize");
const sequelize = require("../database/db");


const User =sequelize.define("users",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
   },
   name: {
       type: DataTypes.STRING
   },
   password: {
       type: DataTypes.STRING(2000)
   },
}
);

module.exports=User;


