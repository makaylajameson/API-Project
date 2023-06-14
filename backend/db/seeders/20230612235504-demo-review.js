'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {

    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        review: "This spot was amazing!",
        stars: 5
      },
      {
        spotId: 2,
        userId: 2,
        review: "Great experience overall.",
        stars: 4
      },
      {
        spotId: 3,
        userId: 3,
        review: "Could be better.",
        stars: 2
      }
      ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3]}
    },{})
  }
};
