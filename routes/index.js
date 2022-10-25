'use strict'

const models = require('../models/model')
const express = require('express')
const cors = require('cors')

const { db, sequelize, characters, episodes } = require('../database/db')
const { validationCharacters, validateEpisodes } = require('../database/validations')
const { searchDate, searchAllDate } = require('../database/searchs')

const router = express.Router()

const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));


const url = 'https://rickandmortyapi.com/api';
const options = {

	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'rickandmortyapi.com'
	}
};

router.get(`/episodes`, cors(), async (req, res) => {

	const query = req.query

	if(query.page !== undefined){

		//fetch(url + `/episode?page=${query.page}`, options)
			//.then(res => res.json())
			//.then(json => console.log(json))
			//.catch(err => console.error('error:' + err));
		try {
			let response = await fetch(url + `/episode?page=${query.page}`, options);
			response = await response.json();
			res.status(200).json(response);
		} catch (err) {
			console.error(err);
			return res.status(500).json({msg: `Internal Server Error.`});
		}
	} else {

		//fetch(url + `/episode`, options)
			//.then(res => res.json())
			//.then(json => console.log(json))
			//.catch(err => console.error('error:' + err));
		try {
			let response = await fetch(url + "/episode", options);
			response = await response.json();
			let episode = { database: await episodes.findAll()}
			const obj = Object.assign(episode, response)
			res.status(200).json(obj);
		} catch (err) {
			console.error(err);
			return res.status(500).json({msg: `Internal Server Error.`});
		}
	}
});

router.get("/episode", cors(), async (req, res) => {

	let { name, air_date, episode} = req.query
	try {
		let findDate = []
		if(searchAllDate(name, air_date, episode)){ const findDates = await episodes.findAll( {
			where: { name: name, air_date: air_date, episode: episode }})
			findDate.push(findDates)
		}
		if(searchDate(name) && !searchDate(air_date)){ const findName = await episodes.findAll( { 
			where: { name: name }})
			findDate.push(findName)
		}
		if(searchDate(air_date) && !searchDate(name)){ const findAir_Date = await episodes.findAll( {
			where: { air_date: air_date } } ) 
			findDate.push(findAir_Date)
		}
		if(searchDate(episode) && !searchDate(name)){ const findEpisode = await episodes.findAll( {
			where: { episode: episode } } )
			findDate.push(findEpisode)
		}
		if(findDate.length < 1){findDate = `Date not found`}
		res.status(200).json({msg: findDate})
	} catch(err) {
		console.error(err)
		return res.status(500).json({msg: `Internal Server Error ${err}`})
	}
})

router.get(`/characters`, cors(), async (req, res) => {
	
	const query = req.query

	if(query.page !== undefined){

		//fetch(url + `/character?page=${query.page}`, options)
			//.then(res => res.json())
			//.then(json => console.log(json))
			//.catch(err => console.error('error:' + err));
		try {
			let response = await fetch(url + `/character?page=${query.page}`, options);
			response = await response.json();
			res.status(200).json(response);
		} catch (err) {
			console.log(err);
			return res.status(500).json({msg: `Internal Server Error.`})
		}
	} else {

		//fetch(url + `/character`, options)
			//.then(res => res.json())
			//.then(json => console.log(json))
			//.catch(err => console.error('error:' + err));
		try {
			let response = await fetch(url + "/character", options);
			response = await response.json();
			let character = { database: await characters.findAll()}
			const obj = Object.assign(character, response)

			res.status(200).json(obj)
		} catch (err) {
			console.log(err);
			return res.status(500).json({msg: `Internal Server Error.`});
		}
	}
});
router.get("/character", cors(), async function (req, res) {

	let { name, status, species} = req.query
	try {
		let findDate = []
		if(searchAllDate(name, status, species)){ const findDates = await characters.findAll( {
			where: { name: name, status: status, species: species }})
			console.log(characters.findAll())
			findDate.push(findDates)
		}
		if(searchDate(name) && !searchDate(status)){ const findName = await characters.findAll( { 
			where: { name: name }})
			findDate.push(findName)
		}
		if(searchDate(status) && !searchDate(name)){ const findStatus = await characters.findAll( {
			where: { status: status } } ) 
			findDate.push(findStatus)
		}
		if(searchDate(species) && !searchDate(name)){ const findSpecies = await characters.findAll( {
			where: { species: species } } )
			findDate.push(findSpecies)
		}
		if(findDate.length < 1){findDate = `Date not found`}
		res.status(200).json({msg: findDate})
	} catch(err) {
		console.log(err);
		return res.status(500).json({msg: `Internal Server Error ${err}`})
	}
})

router.post("/insercharacter", cors(), async (req, res) => {
	const {name, status, species, gender, image} = req.body

	try {
		const newCharacter = await characters.create(validationCharacters(name, status, species, gender, image))
		return res.status(201).json({msg: newCharacter})
	} catch(err) {
		console.log(err);
		return res.status(400).json({error: err.message})
	}
})
router.delete("/character", async (req, res) => {
	const { name, status } = req.query
	try {
		const delCharacter = await characters.destroy({
			where: {
				name: name,
				status: status
			}
		})
		res.status(200).json({msg: `Character ${name} with status: ${status} has been removed`})
	} catch(err) {
		console.log(err);
		return res.dtatus(500).json({msg: err})
	}
})

router.patch("/characters/status", cors(), async (req, res) => {
	const character = models.listCharacters()
	try {
		const name = req.query.name
		const character = await characters.findAll({
			where: {
				name: name
			}
		})
		let updateCharacter = ''
		if(character[0].dataValues.status === "alive"){
			updateCharacter = await characters.update(
				{status: "death"},
				{	
					where: {
						name: name
					}
				}
			)
		} else {
			updateCharacter = await characters.update(
				{status: "alive"},
				{	
					where: {
						name: name
					}
				}
			)
		}
		const characterUpdated = await characters.findAll({
			where: {
				name: name
			}
		})
		return res.status(200).json({msg: characterUpdated})
	} catch(err) {
		console.log(err);
		return res.status(404).json({error: err.message})
	}
})

router.post("/inserepisode", cors(), async (req, res) => {
	const {name, air_date, episode} = req.body
	try {
		const newEpisode = await episodes.create(validateEpisodes(name, air_date, episode))
		return res.status(201).json({msg: newEpisode})
	} catch(err) {
		console.log(err);
		return res.status(400).json({error: err.message})
	}
})
router.delete("/episode", async (req, res) => {
	const { name, air_date } = req.query
	try {
		const delEpisode = await episodes.destroy({
			where: {
				name: name,
				air_date: air_date
			}
		})
		res.status(200).json({msg: `Episode ${name} with dated: ${air_date}  has been removed`})
	} catch(err) {
		console.log(err);
		return res.dtatus(500).json({msg: err})
	}
})

module.exports = router;

