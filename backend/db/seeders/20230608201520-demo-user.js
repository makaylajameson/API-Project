'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {

    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        firstName: 'DemoFirstName',
        lastName: 'DemoLastName',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Makayla',
        lastName: 'Jameson',
        email: 'user2@user.io',
        username: 'makjamm',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Natalia',
        lastName: 'Ramirez',
        email: 'user3@user.io',
        username: 'natram',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Alex',
        lastName: 'Valle',
        email: 'user4@user.io',
        username: 'alexv',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        firstName: 'Alec',
        lastName: 'Tuttle',
        email: 'user5@user.io',
        username: 'alect',
        hashedPassword: bcrypt.hashSync('password5')
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
