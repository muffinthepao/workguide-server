'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.question.belongsTo(models.user)
    }
  }
  question.init({
    question: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
     type: DataTypes.INTEGER,
     allowNull: false
    }, 
  }, {
    sequelize,
    modelName: 'question',
  });
  return question;
};