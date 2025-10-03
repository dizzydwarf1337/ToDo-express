import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define(
    "Task",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    },
    {
      tableName: "tasks",
      timestamps: false,
    }
  );
};
