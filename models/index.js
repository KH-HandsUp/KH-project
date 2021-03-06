const Sequelize = require("sequelize");
const config = require("../config/config");
const Class = require("./Class");
const User = require("./User");
const Lesson = require("./Lesson");
const ClassUser = require("./ClassUser");
const db = {};

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  config.development
);

db.sequelize = sequelize;

db.User = User;
db.Class = Class;
db.Lesson = Lesson;
db.classUser = ClassUser;

User.init(sequelize);
Class.init(sequelize);
Lesson.init(sequelize);
ClassUser.init(sequelize);

User.associate(db);
Class.associate(db);
Lesson.associate(db);

module.exports = db;
