'use strict'

const sequelize = require('../database/db')

let characters = []


module.exports = {

	listCharacters: function(){
		return characters
	},

	insertCharacter: function(name, status, especies, gender, image) {
		const character = characters.find((character) => character.name === name)

		if(!character) {
			characters.push({name, status, especies, gender, image})
			return `Character ${name} insert sucesli`
		} else {
			throw new Error(`Caracter ${name} exist`)
		}
	},

	changeStatus: function(name){

		if(name.includes("%20")){
			name.replace("%20", " ")
		}

		const character = characters.find((character) => character.name === name)

		if(character) {
			if(character.status === "alive") {
				character.status = "death"
				return `${character.name}, now is ${character.status}`
			}
			if(character.status === "death") {
				character.status = "alive"
				return `${character.name} now is ${character.status}`
			}
		}
		throw new Error(`${character.name} inexist`)
	}
}