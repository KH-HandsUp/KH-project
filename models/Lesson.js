const Sequelize = require("sequelize");

class Lesson extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            name:{
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true,
            },
        },{
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: "Lesson",
            tableName: "lesson",
            paranoid: false,
            charset: "utf8",
            collate: "utf8_general_ci",
        })
    }

    static associate(db) {
        db.Lesson.belongsTo(db.Class);
  }
}

module.exports = Lesson;