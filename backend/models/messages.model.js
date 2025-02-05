import { DataTypes } from "sequelize";
import db from "../utils/database.js";

const Messages = db.define("messages", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Messages;
