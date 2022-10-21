"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init(
    {
      id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: DataTypes.VARCHAR,
      password : DataTypes.VARCHAR,
      nik : DataTypes.INTEGER,
      address : DataTypes.TEXT,
      phone : DataTypes.INTEGER,
      role: DataTypes.ENUM("admin", "kasir", "owner"),
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
      tableName: "user",
    }
  );
  return user;
};
