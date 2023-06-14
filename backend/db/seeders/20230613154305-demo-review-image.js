'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {

    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: 'https://getpaidforyourpad.com/wp-content/uploads/2017/03/Airbnb-review-with-feedback.png',
      },
      {
        reviewId: 2,
        url: 'https://jetstreamtech.io/media/01_Addressing-a-problem-with-your-guests-stay-fosters-loyalty-and-shows-future-guests-youre-open-to-improvements.jpg',
      },
      {
        reviewId: 3,
        url: 'https://birdeye.com/blog/wp-content/uploads/airbnb-host-reviews.jpg',
      }
      ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [1, 2, 3]}
    },{})
  }
};
