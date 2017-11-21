const Sequelize = require('sequelize');

/**
 * Модель пользвоателя
 * @param Sequelize sequelize 
 */
module.exports = (sequelize) => {
    const ModelUsers = sequelize.define("users", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        ip: {
            type: Sequelize.STRING,
            allowNull: false
        },
        active: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    });

    return ModelUsers;
};