'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {

    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: "123 Main Street",
        city: "New York",
        state: "NY",
        country: "USA",
        lat: 95,
        lng: -74.0060,
        name: "Beautiful Spot",
        description: "A cozy and comfortable spot",
        price: 100.50
      },
      {
        ownerId: 2,
        address: "789 Oak Street",
        city: "Seattle",
        state: "WA",
        country: "USA",
        lat: 47.6097,
        lng: -122.3331,
        name: "Seaside Cottage",
        description: "A charming cottage by the beach",
        price: 120.00
      },
      {
        ownerId: 3,
        address: "789 Pine Street",
        city: "Miami",
        state: "FL",
        country: "USA",
        lat: 25.7617,
        lng: -80.1918,
        name: "Luxury Villa",
        description: "A stunning villa with ocean views",
        price: 350.00
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';

    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
