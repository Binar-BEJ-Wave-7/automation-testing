const sequelize = require('./sequelize')
const {Model, DataTypes} = require('sequelize')

class User extends Model {

}

User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    full_name: {
        type: DataTypes.STRING
    }
}, {
    paranoid: true,
    timestamps: true,
    underscored: true,
    sequelize,
    freezeTableName: true,
    tableName: 'users',
})

module.exports = User