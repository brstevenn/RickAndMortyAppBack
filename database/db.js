require('dotenv').config()
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env
const { Sequelize } = require('sequelize');
const characters = require('./models/characters');
const episodes = require('./models/episodes')

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    logging: false
  }
);

characters(sequelize);
episodes(sequelize);


module.exports = {
  ...sequelize.models,
  db: sequelize
}