'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.answer.belongsTo(models.question)
    }
  }
  answer.init({
    ansnwerUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "pending"
    },
    shotstackId: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "pending"
    },
    imageKitUrls:{ 
      type: DataTypes.TEXT,
      allowNull: false
    },
    imageKitIds: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM("failed", "pending", "completed"),
      defaultValue: "pending",
      allowNull: false
    }, 
    answerMethod: {
      type: Sequelize.ENUM("shotstack", "url"),
      defaultValue: "shotstack",
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'answer',
  });
  return answer;
};

