const { Sequelize } = require('sequelize');
const characters = require('./models/characters');
const episodes = require('./models/episodes')

const sequelize = new Sequelize(
  "postgres://brstevenn:458312@localhost:5432/rickandmorty",
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