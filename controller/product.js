const { DataTypes } = require("sequelize");

const sequelize = require("../helpers/db");

const Product = sequelize.define("product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: DataTypes.STRING,
  price: {
    type: DataTypes.DOUBLE,
    allowNull: null,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: null,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: null,
  },
});

module.exports = Product;