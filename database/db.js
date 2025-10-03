import { Sequelize } from "sequelize";
import TaskModel from "../models/task.js";
import UserModel from "../models/user.js";
import { config } from "dotenv";
config();

const sequelize = new Sequelize(process.env.POSTGRES_CS, {
  dialect: "postgres",
});

export const Task = TaskModel(sequelize);
export const User = UserModel(sequelize);

User.hasMany(Task, { foreignKey: "userId" });
Task.belongsTo(User, { foreignKey: "userId" });

sequelize
  .sync({alter:true})
  .then(() => console.log("Database & tables created!"))
  .catch((err) => console.error("Error creating tables:", err));

export default sequelize;
