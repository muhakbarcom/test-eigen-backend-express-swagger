'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Penalty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Penalty.belongsTo(models.Borrow, {
        foreignKey: 'borrowed_id',
        as: 'borrowed_book',
      });
    }
  }
  Penalty.init(
    {
      borrowed_id: DataTypes.INTEGER,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Penalty',
    }
  );
  return Penalty;
};
