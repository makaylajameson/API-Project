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
        address: "123 Main St",
        city: "New York",
        state: "NY",
        country: "USA",
        lat: 40.7128,
        lng: -74.0060,
        name: "Cozy Apartment",
        description: "A lovely apartment in the heart of the city",
        price: 150.00
      },
      {
        ownerId: 1,
        address: "456 Elm St",
        city: "Los Angeles",
        state: "CA",
        country: "USA",
        lat: 34.0522,
        lng: -118.2437,
        name: "Modern House",
        description: "A beautiful modern house with a pool",
        price: 250.00
      },
      {
        ownerId: 1,
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
        ownerId: 2,
        address: "789 Pine Street",
        city: "Miami",
        state: "FL",
        country: "USA",
        lat: 25.7617,
        lng: -80.1918,
        name: "Luxury Villa",
        description: "A stunning villa with ocean views",
        price: 350.00
      },
      {
        ownerId: 2,
        address: "111 Pine St",
        city: "Seattle",
        state: "WA",
        country: "USA",
        lat: 47.6062,
        lng: -122.3321,
        name: "Luxury Condo",
        description: "A luxurious condominium with stunning views",
        price: 300.00
      },{
        ownerId: 2,
        address: "222 Cherry Ave",
        city: "Chicago",
        state: "IL",
        country: "USA",
        lat: 41.8781,
        lng: -87.6298,
        name: "Spacious Loft",
        description: "An open and spacious loft in downtown Chicago",
        price: 200.00
      },
      {
        ownerId: 3,
        address: "333 Oak St",
        city: "Austin",
        state: "TX",
        country: "USA",
        lat: 30.2672,
        lng: -97.7431,
        name: "Modern Apartment",
        description: "A modern and stylish apartment in downtown Austin",
        price: 180.00
      },
      {
        ownerId: 3,
        address: "444 Maple Ave",
        city: "Miami",
        state: "FL",
        country: "USA",
        lat: 25.7617,
        lng: -80.1918,
        name: "Beach House",
        description: "A beautiful beachfront house with ocean views",
        price: 350.00
      },
      {
        ownerId: 3,
        address: "555 Elm St",
        city: "Denver",
        state: "CO",
        country: "USA",
        lat: 39.7392,
        lng: -104.9903,
        name: "Cozy Cabin",
        description: "A cozy cabin retreat in the mountains",
        price: 220.00
      },
      {
        ownerId: 4,
        address: "666 Oak St",
        city: "Nashville",
        state: "TN",
        country: "USA",
        lat: 36.1627,
        lng: -86.7816,
        name: "Rustic Farmhouse",
        description: "A charming farmhouse with a peaceful atmosphere",
        price: 180.00
      },
      {
        ownerId: 4,
        address: "777 Pine St",
        city: "Boston",
        state: "MA",
        country: "USA",
        lat: 42.3601,
        lng: -71.0589,
        name: "Historic Townhouse",
        description: "A beautifully restored historic townhouse",
        price: 280.00
      },
      {
        ownerId: 4,
        address: "888 Cherry Ave",
        city: "San Diego",
        state: "CA",
        country: "USA",
        lat: 32.7157,
        lng: -117.1611,
        name: "Beachfront Villa",
        description: "A luxurious villa right on the beach",
        price: 400.00
      },
      {
        ownerId: 5,
        address: "999 Maple Ave",
        city: "Portland",
        state: "OR",
        country: "USA",
        lat: 45.5051,
        lng: -122.6750,
        name: "Hip Studio",
        description: "A trendy studio apartment in the heart of Portland",
        price: 160.00
      },
      {
        ownerId: 5,
        address: "1010 Elm St",
        city: "New Orleans",
        state: "LA",
        country: "USA",
        lat: 29.9511,
        lng: -90.0715,
        name: "French Quarter Charm",
        description: "A charming spot in the historic French Quarter",
        price: 240.00
      },
      {
        ownerId: 5,
        address: "1111 Pine St",
        city: "Las Vegas",
        state: "NV",
        country: "USA",
        lat: 36.1699,
        lng: -115.1398,
        name: "Luxury Suite",
        description: "A luxurious suite in a famous Las Vegas hotel",
        price: 380.00
      },
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
