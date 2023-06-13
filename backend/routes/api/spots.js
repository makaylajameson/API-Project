const express = require('express');
const { Spot, User, Booking, SpotImage, Review } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { urlencoded } = require('express');

const router = express.Router();


router.get('/', async (req, res) => {
    const spots = await Spot.findAll({
      include: [
        {
          model: SpotImage,
          attributes: ['url'] // pulls the url from the SpotImage Model
        },
        {
          model: Review
        }
      ]
    });

    const allSpots = spots.map(spot => { // creates a new array populated with the results of calling a provided function on every element in the calling array.
      const spotObj = spot.toJSON(); // convert the spot object to a plain JSON object

      let totalStars = 0;
      for (let review of spotObj.Reviews) {
        totalStars += review.stars;
      }

      spotObj.avgRating = totalStars / spotObj.Reviews.length;

      if (spotObj.SpotImages.length > 0) { // checking if the SpotImages array has at least one element before accessing the url property of the first element
        spotObj.previewImage = spotObj.SpotImages[0].url;
      }

      delete spotObj.Reviews; // By deleting - ensure that response includes only the desired fields and matches the structure specified
      delete spotObj.SpotImages;

      return spotObj;
    });

    res.json({ Spots: allSpots });
  });





module.exports = router;
