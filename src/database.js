var Sequelize = require('sequelize');

var sequelize = new Sequelize('nodejs-with-mysql', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

var Todo = sequelize.define('todos', {
  name: Sequelize.STRING,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});

module.exports = {
  Todo: Todo,
};
