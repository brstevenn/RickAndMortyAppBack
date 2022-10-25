const {  DataTypes } = require('sequelize');

module.exports = sequelize => {
	
	sequelize.define('characters', 
  
  		{
    		name: {
      			type: DataTypes.STRING
    		},
    		status: {
      			type: DataTypes.STRING
    		},
    		species: {
      			type: DataTypes.STRING
    		},
    		gender: {
      			type: DataTypes.STRING
    		},
    		image: {
      			type: DataTypes.STRING
    		}
  		},

  		{
    		timestamps: true,
      		createdAt: false,
      		updateAt: true
  		}
	)
}