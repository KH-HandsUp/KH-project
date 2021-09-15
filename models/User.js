const Sequelize = require("sequelize");

class User extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            name: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true,
            },
            password:{
                type: Sequelize.STRING(100),
                allowNull:false,
                unique:true,
            },
            grade:{
                type:Sequelize.INTEGER(),
                allowNull:false,
                unique:true,
            },
            class:{
                type:Sequelize.INTEGER(),
                allowNull:false,
                unique:true,
            },
            number:{
                type:Sequelize.INTEGER(),
                allowNull:false,
                unique:true,
            },
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
}

module.exports = User;