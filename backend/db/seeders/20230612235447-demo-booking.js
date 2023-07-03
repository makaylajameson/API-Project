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
          startDate: new Date("2023-06-15"),
          endDate: new Date("2023-06-20")
        },
        {
          spotId: 2,
          userId: 2,
          startDate: new Date("2023-07-01"),
          endDate: new Date ("2023-07-07")
        },
        {
          spotId: 3,
          userId: 3,
          startDate: new Date("2023-08-10"),
          endDate: new Date("2023-08-15")
        },
        {
          spotId: 11,
          userId: 4,
          startDate: new Date("2023-02-05"),
          endDate: new Date("2023-02-07")
        },
        {
          spotId: 13,
          userId: 5,
          startDate: new Date("2022-08-01"),
          endDate: new Date("2022-08-04")
        },
        {
          spotId: 8,
          userId: 3,
          startDate: new Date("2023-03-10"),
          endDate: new Date("2023-03-12")
        },
        {
          spotId: 2,
          userId: 1,
          startDate: new Date("2021-11-24"),
          endDate: new Date("2021-11-26")
        },
        {
          spotId: 5,
          userId: 2,
          startDate: new Date("2022-05-12"),
          endDate: new Date("2022-05-15")
        },
        {
          spotId: 1,
          userId: 3,
          startDate: new Date("2023-07-22"),
          endDate: new Date("2023-07-24")
        },
        {
          spotId: 14,
          userId: 4,
          startDate: new Date("2022-02-28"),
          endDate: new Date("2022-03-02")
        },
        {
          spotId: 7,
          userId: 5,
          startDate: new Date("2021-12-05"),
          endDate: new Date("2021-12-08")
        },
        {
          spotId: 9,
          userId: 1,
          startDate: new Date("2023-01-14"),
          endDate: new Date("2023-01-16")
        },
        {
          spotId: 15,
          userId: 5,
          startDate: new Date("2022-06-03"),
          endDate: new Date("2022-06-05")
        },
        {
          spotId: 4,
          userId: 2,
          startDate: new Date("2023-04-11"),
          endDate: new Date("2023-04-13")
        },
        {
          spotId: 6,
          userId: 2,
          startDate: new Date("2022-03-18"),
          endDate: new Date("2022-03-21")
        },
        {
          spotId: 10,
          userId: 3,
          startDate: new Date("2021-09-02"),
          endDate: new Date("2021-09-04")
        },
        {
          spotId: 3,
          userId: 4,
          startDate: new Date("2022-10-08"),
          endDate: new Date("2022-10-10")
        },
        {
          spotId: 11,
          userId: 5,
          startDate: new Date("2021-08-19"),
          endDate: new Date("2021-08-22")
        },
        {
          spotId: 9,
          userId: 2,
          startDate: new Date("2019-10-23"),
          endDate: new Date("2019-10-26")
        },
        {
          spotId: 15,
          userId: 3,
          startDate: new Date("2022-09-01"),
          endDate: new Date("2022-09-03")
        },
        {
          spotId: 2,
          userId: 4,
          startDate: new Date("2023-01-22"),
          endDate: new Date("2023-01-24")
        },
        {
          spotId: 5,
          userId: 5,
          startDate: new Date("2022-07-07"),
          endDate: new Date("2022-07-10")
        },
        {
          spotId: 1,
          userId: 1,
          startDate: new Date("2021-12-28"),
          endDate: new Date("2021-12-31")
        },
        {
          spotId: 14,
          userId: 2,
          startDate: new Date("2023-02-22"),
          endDate: new Date("2023-02-24")
        },
        {
          spotId: 7,
          userId: 3,
          startDate: new Date("2019-05-01"),
          endDate: new Date("2019-05-04")
        },
        {
          spotId: 11,
          userId: 4,
          startDate: new Date("2021-07-10"),
          endDate: new Date("2021-07-12")
        },
        {
          spotId: 15,
          userId: 5,
          startDate: new Date("2022-03-30"),
          endDate: new Date("2022-04-02")
        },
        {
          spotId: 4,
          userId: 1,
          startDate: new Date("2023-01-08"),
          endDate: new Date("2023-01-10")
        },
        {
          spotId: 6,
          userId: 2,
          startDate: new Date("2021-11-11"),
          endDate: new Date("2021-11-14")
        },
        {
          spotId: 10,
          userId: 3,
          startDate: new Date("2022-08-11"),
          endDate: new Date("2022-08-13")
        },
        {
          spotId: 3,
          userId: 4,
          startDate: new Date("2022-04-09"),
          endDate: new Date("2022-04-12")
        },
        {
          spotId: 11,
          userId: 5,
          startDate: new Date("2021-12-10"),
          endDate: new Date("2021-12-13")
        },
        {
          spotId: 13,
          userId: 1,
          startDate: new Date("2022-05-22"),
          endDate: new Date("2022-05-24")
        },
        {
          spotId: 8,
          userId: 2,
          startDate: new Date("2023-03-01"),
          endDate: new Date("2023-03-03")
        },
        {
          spotId: 2,
          userId: 3,
          startDate: new Date("2019-11-03"),
          endDate: new Date("2019-11-06")
        },
        {
          spotId: 7,
          userId: 4,
          startDate: new Date("2022-01-15"),
          endDate: new Date("2022-01-18")
        }
      ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3]}
    },{})
  }
};
