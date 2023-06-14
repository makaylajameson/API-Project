'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      Review.hasMany(models.ReviewImage, {
        foreignKey: 'reviewId',
        onDelete: 'CASCADE',
        hooks: true,
      })
      Review.belongsTo(models.Spot, {
        foreignKey: 'spotId'
      })
    }
  }
  Review.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      },
    review: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        needReviewText(val) {
          if (val === '') {
            throw new Error('Review text is required')
          }
        }
      }
      },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
  }
}, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
