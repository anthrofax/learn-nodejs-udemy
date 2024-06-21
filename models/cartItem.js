const { DataTypes } = require("sequelize");

const sequelize = require("../helpers/db");

const CartItem = sequelize.define("cart_item", {
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

module.exports = CartItem;
