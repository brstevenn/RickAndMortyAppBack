'use strict'
const router = require('./routes')
const express = require('express')
const app = express()
const index = require('./routes/index')
const cors = require('cors')

app.use(cors({
	methods: ['GET', 'POST', 'PATCH', 'DELETE']
}))
app.use(express.json())
app.use(router)


module.exports = app