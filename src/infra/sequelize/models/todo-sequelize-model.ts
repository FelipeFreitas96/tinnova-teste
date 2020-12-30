import { Sequelize, DataTypes } from "sequelize";

export default (sequelize: Sequelize) => {
    return sequelize.define('todo_list', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        hidden: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    }, {
        freezeTableName: true,
    });
}