'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {

    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: "https://i.imgur.com/twJk9oo.jpg"
      },
      {
        reviewId: 2,
        url: "https://i.imgur.com/ti48t6H.jpg"
      },
      {
        reviewId: 3,
        url: "https://i.imgur.com/othYiDT.jpg"
      },
      {
        reviewId: 4,
        url: "https://i.imgur.com/I9hvqi6.jpg"
      },
      {
        reviewId: 5,
        url: "https://i.imgur.com/HaGYx8H.jpg"
      },
      {
        reviewId: 6,
        url: "https://i.imgur.com/XwdGyFR.jpg"
      },
      {
        reviewId: 7,
        url: "https://i.imgur.com/1G2k6I4.jpg"
      },
      {
        reviewId: 8,
        url: "https://i.imgur.com/RL729I7.jpg"
      },
      {
        reviewId: 9,
        url: "https://i.imgur.com/sPx2e4w.jpg"
      },
      {
        reviewId: 10,
        url: "https://i.imgur.com/SRm3BFd.jpg"
      },
      {
        reviewId: 11,
        url: "https://i.imgur.com/B5jXMHK.jpg"
      },
      {
        reviewId: 12,
        url: "https://i.imgur.com/SG4jfJu.jpg"
      },
      {
        reviewId: 13,
        url: "https://i.imgur.com/aLERoKN.jpg"
      },
      {
        reviewId: 14,
        url: "https://i.imgur.com/1Lyt6QK.jpg"
      },
      {
        reviewId: 15,
        url: "https://i.imgur.com/PaOIoLS.jpg"
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [1, 2, 3] }
    }, {})
  }
};
