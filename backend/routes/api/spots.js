const express = require('express');
const { Spot, User, Booking, SpotImage, Review } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { urlencoded } = require('express');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

// Get all Spots
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


// Get all Spots owned by the Current User
  router.get('/current', requireAuth, async (req, res) => {
    const spots = await Spot.findAll({
        where: { ownerId: req.user.id },
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

    res.json({Spots: allSpots})
  })

  // Get details of a Spot from an id
  router.get('/:spotId', async (req, res) => {

    const spotId = req.params.spotId;

    const spot = await Spot.findByPk(spotId, {
      include: [
        {
          model: Review,
        },
        {
          model: SpotImage,
          attributes: ['id', 'url', 'preview'],
        },
        {
          model: User,
          as: 'Owner',
          attributes: ['id', 'firstName', 'lastName'],
        },
      ],
    });

    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    const spotObj = spot.toJSON();

    let totalStars = 0;
    for (let review of spotObj.Reviews) {
      totalStars += review.stars;
    }

    spotObj.numReviews = spotObj.Reviews.length;
    spotObj.avgStarRating = totalStars / spotObj.Reviews.length;

    delete spotObj.Reviews;

    // if (spotObj.SpotImages.length > 0) {
    //   spotObj.SpotImages = spotObj.SpotImages.map((image) => ({
    //     id: image.id,
    //     url: image.url,
    //     preview: image.preview,
    //   }));
    // }

    res.json(spotObj);
  });












module.exports = router;
