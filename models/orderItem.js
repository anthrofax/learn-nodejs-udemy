const { DataTypes } = require("sequelize");

const sequelize = require("../helpers/db");

const OrderItem = sequelize.define("order_item", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  qty: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = OrderItem;
