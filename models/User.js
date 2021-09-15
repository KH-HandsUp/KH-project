const Sequelize = require("sequelize");

class User extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            name: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            user_id: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true,
            },
            password:{
                type: Sequelize.STRING(100),
                allowNull:false,
            },  
            question:{
                type:Sequelize.STRING(100),
                allowNull:false,
            },
            answer:{
                type:Sequelize.STRING(100),
                allowNull:false,
            }
        },{
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: "User",
            tableName: "users",
            paranoid: false,
            charset: "utf8",
            collate: "utf8_general_ci",
        })
    }

    static associate(db) {
        db.User.belongsToMany(db.Class, {through: 'classUser'});
  }
}

module.exports = User;