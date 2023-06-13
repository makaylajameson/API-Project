'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {

    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'https://townsquare.media/site/204/files/2018/08/spectacular-celebrity-homes.jpg?w=1200&h=0&zc=1&s=0&a=t&q=89',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://images.mansionglobal.com/im-697060?width=1280&size=1.33333333',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://www.palmbeachpost.com/gcdn/presto/2021/01/12/NPBD/08d0fd5e-2255-4d49-b608-e83342ae4615-PBN_POOL_REAR_535_N_County_Road_HiRes_PictureItSoldFL.jpg?crop=1279,720,x0,y64&width=1279&height=720&format=pjpg&auto=webp',
        preview: true
      }
      ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3]}
    },{})
  }
};
