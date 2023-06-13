'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {

    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
        {
          spotId: 1,
          userId: 1,
          startDate: "2023-06-15",
          endDate: "2023-06-20"
        },
        {
          spotId: 2,
          userId: 2,
          startDate: "2023-07-01",
          endDate: "2023-07-07"
        },
        {
          spotId: 3,
          userId: 3,
          startDate: "2023-08-10",
          endDate: "2023-08-15"
        }
      ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3]}
    })
  }
};
