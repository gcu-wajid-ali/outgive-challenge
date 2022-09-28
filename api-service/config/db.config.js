const env = require('./config');

const Sequelize = require('sequelize');

/**
 * Get Database Env Variables and Set it in Sequelize 
 */

const sequelize = new Sequelize(env.development.database, env.development.username, env.development.password, {
  host: env.development.host,
  dialect: env.development.dialect,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

/**
 * Database Models and Sync with Sequelize
 */
db.task = require('../models/task')(sequelize, Sequelize);
db.subtask = require('../models/subtask')(sequelize, Sequelize);

/**
 *  Defining Relationships (Like ManyToOne & OneToMany) in between entities
 */

db.subtask.belongsTo(db.task, { foreignKey: 'taskId' });
db.task.hasMany(db.subtask, { foreignKey: 'taskId' });

module.exports = db;