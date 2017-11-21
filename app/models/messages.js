const Sequelize = require('sequelize');

/**
 * Модель сообщени
 * @param Sequelize sequelize 
 */
module.exports = (sequelize) => {
    const ModelMessages = sequelize.define("messages", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        message: {
            type: Sequelize.TEXT
        }
    });

    return ModelMessages;
};