'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {

    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: "https://i.imgur.com/WhTOyTB.jpg",
        preview: true
      },
      {
        spotId: 1,
        url: "https://i.imgur.com/U9ac4Kq.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://i.imgur.com/llz47lB.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://i.imgur.com/DRZeAau.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://i.imgur.com/gHMy3Nz.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://i.imgur.com/HBFc0Rx.jpg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://i.imgur.com/MAVyLb7.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://i.imgur.com/3z6Aqgs.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://i.imgur.com/yBjHnRZ.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://i.imgur.com/JrvK3c8.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://i.imgur.com/rcyq3w4.jpg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://i.imgur.com/jkq9sEX.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://i.imgur.com/yLv7y4w.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://i.imgur.com/foeUB5V.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://i.imgur.com/foeUB5V.jpg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://i.imgur.com/SiGQ5k5.jpg",
        preview: true
      },
      {
        spotId: 4,
        url: "https://i.imgur.com/Bh2iYnZ.jpg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://i.imgur.com/CfZN4aC.jpg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://i.imgur.com/gflvgM7.jpg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://i.imgur.com/Ux3aRwd.jpg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://i.imgur.com/2tk5ZcW.jpg",
        preview: true
      },
      {
        spotId: 5,
        url: "https://i.imgur.com/L0WxpP5.jpg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://i.imgur.com/weNt3kQ.jpg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://i.imgur.com/1nNDRkA.jpg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://i.imgur.com/CKk66HU.jpg",
        preview: false
      },
      {
        spotId: 6,
        url: "https://i.imgur.com/Gf6tqu9.jpg",
        preview: true
      },
      {
        spotId: 6,
        url: "https://i.imgur.com/aqyaXd0.jpg",
        preview: false
      },
      {
        spotId: 6,
        url: "https://i.imgur.com/yvDarlA.jpg",
        preview: false
      },
      {
        spotId: 6,
        url: "https://i.imgur.com/07KDt1O.jpg",
        preview: false
      },
      {
        spotId: 6,
        url: "https://i.imgur.com/UngoPrW.jpg",
        preview: false
      },
      {
        spotId: 7,
        url: "https://i.imgur.com/qCPdZG6.jpg",
        preview: true
      },
      {
        spotId: 7,
        url: "https://i.imgur.com/SNRVWns.jpg",
        preview: false
      },
      {
        spotId: 7,
        url: "https://i.imgur.com/e5qR5ED.jpg",
        preview: false
      },
      {
        spotId: 7,
        url: "https://i.imgur.com/wuVM0zf.jpg",
        preview: false
      },
      {
        spotId: 7,
        url: "https://i.imgur.com/HivPYXC.jpg",
        preview: false
      },
      {
        spotId: 8,
        url: "https://i.imgur.com/P8kCjm1.jpg",
        preview: true
      },
      {
        spotId: 8,
        url: "https://i.imgur.com/cWO2Vvo.jpg",
        preview: false
      },
      {
        spotId: 8,
        url: "https://i.imgur.com/9ebAKCX.jpg",
        preview: false
      },
      {
        spotId: 8,
        url: "https://i.imgur.com/gWPVVoN.jpg",
        preview: false
      },
      {
        spotId: 8,
        url: "https://i.imgur.com/9LBfDSA.jpg",
        preview: false
      },
      {
        spotId: 9,
        url: "https://i.imgur.com/W0pe8Cl.jpg",
        preview: true
      },
      {
        spotId: 9,
        url: "https://i.imgur.com/fQ52gQ1.jpg",
        preview: false
      },
      {
        spotId: 9,
        url: "https://i.imgur.com/HbNHrHX.jpg",
        preview: false
      },
      {
        spotId: 9,
        url: "https://i.imgur.com/ZfFsix9.jpg",
        preview: false
      },
      {
        spotId: 9,
        url: "https://i.imgur.com/VUNSgJU.jpg",
        preview: false
      },
      {
        spotId: 10,
        url: "https://i.imgur.com/qhsfg7p.jpg",
        preview: true
      },
      {
        spotId: 10,
        url: "https://i.imgur.com/97TqhaD.jpg",
        preview: false
      },
      {
        spotId: 10,
        url: "https://i.imgur.com/ZwwcP6V.jpg",
        preview: false
      },
      {
        spotId: 10,
        url: "https://i.imgur.com/kQWPjex.jpg",
        preview: false
      },
      {
        spotId: 10,
        url: "https://i.imgur.com/VBeBCxT.jpg",
        preview: false
      },
      {
        spotId: 11,
        url: "https://i.imgur.com/5BSKBlO.jpg",
        preview: true
      },
      {
        spotId: 11,
        url: "https://i.imgur.com/2gT1Hzv.jpg",
        preview: false
      },
      {
        spotId: 11,
        url: "https://i.imgur.com/4LPLSny.jpg",
        preview: false
      },
      {
        spotId: 11,
        url: "https://i.imgur.com/ii8zuKH.jpg",
        preview: false
      },
      {
        spotId: 11,
        url: "https://i.imgur.com/UGsQfQU.jpg",
        preview: false
      },
      {
        spotId: 12,
        url: "https://i.imgur.com/K2P6xT1.jpg",
        preview: true
      },
      {
        spotId: 12,
        url: "https://i.imgur.com/TFUgOrk.jpg",
        preview: false
      },
      {
        spotId: 12,
        url: "https://i.imgur.com/5WyLcu5.jpg",
        preview: false
      },
      {
        spotId: 12,
        url: "https://i.imgur.com/MZ7cmjY.jpg",
        preview: false
      },
      {
        spotId: 12,
        url: "https://i.imgur.com/EbZZfBR.jpg",
        preview: false
      },
      {
        spotId: 13,
        url: "https://i.imgur.com/Pc1JxH6.jpg",
        preview: true
      },
      {
        spotId: 13,
        url: "https://i.imgur.com/lUpTEIY.jpg",
        preview: false
      },
      {
        spotId: 13,
        url: "https://i.imgur.com/nvGdXB0.jpg",
        preview: false
      },
      {
        spotId: 13,
        url: "https://i.imgur.com/bA0xdDC.jpg",
        preview: false
      },
      {
        spotId: 13,
        url: "https://i.imgur.com/RelX2gB.jpg",
        preview: false
      },
      {
        spotId: 14,
        url: "https://i.imgur.com/LOGXLrA.jpg",
        preview: true
      },
      {
        spotId: 14,
        url: "https://i.imgur.com/UoP9mM2.jpg",
        preview: false
      },
      {
        spotId: 14,
        url: "https://i.imgur.com/j350V9k.jpg",
        preview: false
      },
      {
        spotId: 14,
        url: "https://i.imgur.com/cZSoWh9.jpg",
        preview: false
      },
      {
        spotId: 14,
        url: "https://i.imgur.com/rlfSfxl.jpg",
        preview: false
      },
      {
        spotId: 15,
        url: "https://i.imgur.com/hiwXT1C.jpg",
        preview: true
      },
      {
        spotId: 15,
        url: "https://i.imgur.com/RktA3cd.jpg",
        preview: false
      },
      {
        spotId: 15,
        url: "https://i.imgur.com/R7ucB0a.jpg",
        preview: false
      },
      {
        spotId: 15,
        url: "https://i.imgur.com/iarcb8c.jpg",
        preview: false
      },
      {
        spotId: 15,
        url: "https://i.imgur.com/wLGu6vs.jpg",
        preview: false
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {})
  }
};
