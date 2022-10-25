
const {  DataTypes } = require('sequelize');

module.exports = sequelize => {
	
	sequelize.define('episodes', 
	  
	    {
		    name: {
		      type: DataTypes.STRING
		    },
		    air_date: {
		      type: DataTypes.STRING
		    },
		    episode: {
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