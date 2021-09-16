const Sequelize = require("sequelize");

class ClassUser extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        UserId: {
          type: Sequelize.INTEGER,
        },
        ClassId: {
          type: Sequelize.INTEGER,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "ClassUser",
        tableName: "classUser",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
}

module.exports = ClassUser;
