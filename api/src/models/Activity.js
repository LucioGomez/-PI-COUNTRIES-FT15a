const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.


module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    name:{
        type: DataTypes.STRING,
        allownull:false,
        unique: true
    },
    difficulty:{
        type: DataTypes.INTEGER
    },
    duration:{
        type: DataTypes.BIGINT
    },
    season: {
        type: DataTypes.STRING
    }
  }, {timestamps: false,});
};
