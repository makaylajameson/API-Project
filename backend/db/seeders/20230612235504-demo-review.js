'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {

    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      // {
      //   spotId: 1,
      //   userId: 1,
      //   review: "This spot was amazing!",
      //   stars: 5
      // },
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
      },
      // {
      //   spotId: 1,
      //   userId: 1,
      //   review: "Beautiful spot with stunning views.",
      //   stars: 5,
      // },
      // {
      //   spotId: 1,
      //   userId: 2,
      //   review: "A hidden gem in nature.",
      //   stars: 4,
      // },
      // {
      //   spotId: 1,
      //   userId: 3,
      //   review: "Disappointed with the lack of facilities.",
      //   stars: 2,
      // },
      {
        spotId: 2,
        userId: 1,
        review: "Great spot for a picnic with family.",
        stars: 4,
      },
      {
        spotId: 2,
        userId: 4,
        review: "Enjoyed the peaceful ambiance.",
        stars: 5,
      },
      {
        spotId: 2,
        userId: 5,
        review: "Not enough parking space available.",
        stars: 3,
      },
      {
        spotId: 3,
        userId: 1,
        review: "A must-visit spot for nature lovers.",
        stars: 5,
      },
      {
        spotId: 3,
        userId: 2,
        review: "The hiking trails are well-maintained.",
        stars: 4,
      },
      {
        spotId: 3,
        userId: 3,
        review: "Too crowded during weekends.",
        stars: 3,
      },
      {
        spotId: 4,
        userId: 1,
        review: "Impressive spot with diverse wildlife.",
        stars: 5,
      },
      {
        spotId: 4,
        userId: 4,
        review: "Had a great bird-watching experience.",
        stars: 4,
      },
      {
        spotId: 4,
        userId: 5,
        review: "The information boards need updating.",
        stars: 3,
      },
      {
        spotId: 5,
        userId: 1,
        review: "Perfect spot for photography enthusiasts.",
        stars: 5,
      },
      {
        spotId: 5,
        userId: 2,
        review: "The sunset views are breathtaking.",
        stars: 5,
      },
      {
        spotId: 5,
        userId: 3,
        review: "Too crowded during peak hours.",
        stars: 3,
      },
      {
        spotId: 6,
        userId: 1,
        review: "A serene spot for relaxation.",
        stars: 4,
      },
      {
        spotId: 6,
        userId: 4,
        review: "Loved the picturesque walking trails.",
        stars: 5,
      },
      {
        spotId: 6,
        userId: 5,
        review: "The restroom facilities need improvement.",
        stars: 3,
      },
      {
        spotId: 7,
        userId: 1,
        review: "Excellent spot for camping and stargazing.",
        stars: 5,
      },
      {
        spotId: 7,
        userId: 2,
        review: "The campsite was clean and well-maintained.",
        stars: 4,
      },
      {
        spotId: 7,
        userId: 3,
        review: "Limited firewood available for campfires.",
        stars: 3,
      },
      {
        spotId: 8,
        userId: 1,
        review: "A great spot for outdoor adventures.",
        stars: 4,
      },
      {
        spotId: 8,
        userId: 4,
        review: "Enjoyed the thrilling zip-lining experience.",
        stars: 5,
      },
      {
        spotId: 8,
        userId: 5,
        review: "The parking area is too small.",
        stars: 3,
      },
      {
        spotId: 9,
        userId: 1,
        review: "A peaceful spot with a serene lake.",
        stars: 5,
      },
      {
        spotId: 9,
        userId: 2,
        review: "Loved kayaking on the calm waters.",
        stars: 4,
      },
      {
        spotId: 9,
        userId: 3,
        review: "The picnic area needs more shade.",
        stars: 3,
      },
      {
        spotId: 10,
        userId: 1,
        review: "Impressive spot with beautiful waterfalls.",
        stars: 5,
      },
      {
        spotId: 10,
        userId: 4,
        review: "Hiking trails offer stunning scenic views.",
        stars: 4,
      },
      {
        spotId: 10,
        userId: 5,
        review: "Lack of restroom facilities on the trails.",
        stars: 3,
      },
      {
        spotId: 11,
        userId: 1,
        review: "A lovely spot for bird-watching.",
        stars: 4,
      },
      {
        spotId: 11,
        userId: 2,
        review: "Enjoyed spotting various bird species.",
        stars: 5,
      },
      {
        spotId: 11,
        userId: 3,
        review: "The entrance fee is quite expensive.",
        stars: 3,
      },
      {
        spotId: 12,
        userId: 1,
        review: "One of the best spots for fishing.",
        stars: 5,
      },
      {
        spotId: 12,
        userId: 4,
        review: "Caught some big fish during my visit.",
        stars: 4,
      },
      {
        spotId: 12,
        userId: 5,
        review: "Lack of picnic tables and benches.",
        stars: 3,
      },
      {
        spotId: 13,
        userId: 1,
        review: "A great spot for hiking and photography.",
        stars: 5,
      },
      {
        spotId: 13,
        userId: 2,
        review: "The trails are well-marked and maintained.",
        stars: 4,
      },
      {
        spotId: 13,
        userId: 3,
        review: "Need more parking spaces near the entrance.",
        stars: 3,
      },
      {
        spotId: 14,
        userId: 1,
        review: "A picturesque spot with breathtaking views.",
        stars: 5,
      },
      {
        spotId: 14,
        userId: 2,
        review: "Enjoyed exploring the surrounding trails.",
        stars: 4,
      },
      {
        spotId: 14,
        userId: 3,
        review: "Not as impressive as I expected.",
        stars: 3,
      },
      {
        spotId: 15,
        userId: 1,
        review: "A tranquil spot for meditation and reflection.",
        stars: 5,
      },
      {
        spotId: 15,
        userId: 4,
        review: "The perfect place to unwind and destress.",
        stars: 5,
      },
      {
        spotId: 15,
        userId: 5,
        review: "Lack of restroom facilities in the vicinity.",
        stars: 3,
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {})
  }
};
