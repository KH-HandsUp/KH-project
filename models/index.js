const Sequelize = require("sequelize");
const config = require("../config/config");
const User = require("./User");
const db = {};

const sequelize = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    config.development
)

db.sequelize = sequelize;

db.User = User;

User.init(sequelize);

module.exports = db;