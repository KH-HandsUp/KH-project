const Sequelize = require("sequelize");

class Class extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        room: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: true,
        },
        member: {
          type: Sequelize.INTEGER(),
        },
        limitMember: {
          type: Sequelize.INTEGER(),
        },
        code: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        teacherName: {
          type: Sequelize.STRING(5),
          allowNull: false,
        }
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Class",
        tableName: "class",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.Class.hasMany(db.Lesson);
  }
}

module.exports = Class;
