'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Borrow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Borrow.hasOne(models.Penalty, {
        foreignKey: 'borrowed_id',
        as: 'penalty',
      });
      Borrow.belongsTo(models.Member, {
        foreignKey: 'member_id',
        as: 'member',
      });
    }
  }
  Borrow.init(
    {
      member_id: DataTypes.STRING,
      returned_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Borrow',
    }
  );
  return Borrow;
};
