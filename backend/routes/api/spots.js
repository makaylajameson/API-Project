const express = require('express');
const { Spot, User, Booking, SpotImage, Review, ReviewImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { urlencoded, request } = require('express');
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');
const moment = require('moment');


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

// Create a spot
router.post('/', requireAuth, async (req, res) => {

  const {
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price
  } = req.body;

// Errors Array
const errors = {};

  // Validate the request body
  if (!address) errors.address = 'Street address is required';
  if (!city) errors.city = 'City is required';
  if (!state) errors.state = 'State is required';
  if (!country) errors.country = 'Country is required';
  if (typeof lat !== 'number' || isNaN(lat)) errors.lat = 'Latitude is not valid';
  if (typeof lng !== 'number' || isNaN(lng)) errors.lng = 'Longitude is not valid';
  if (!name || name.length > 50) errors.name = 'Name must be less than 50 characters';
  if (!description) errors.description = 'Description is required';
  if (!price) errors.price = 'Price per day is required';

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      message: 'Bad Request',
      errors: errors
    });
  }
    // Create the spot
    const spot = await Spot.create({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
      ownerId: req.user.id
    });

    res.status(201).json(spot);
})

// Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res) => {
  const spotId = req.params.spotId;
  const { url, preview } = req.body;

  // Find the spot by id and check if it exists
  const spot = await Spot.findByPk(spotId);

  // If it does not exist
  if (!spot) {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }

   // Check if the spot belongs to the current user
   if (spot.ownerId !== req.user.id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const image = await SpotImage.create({ url, preview, spotId });

  res.status(200).json({
    id: image.id,
    url: image.url,
    preview: image.preview
  });
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

    res.json(spotObj);
  });

  // Edit a spot
  router.put('/:spotId', requireAuth, async (req, res) => {
    const spotId = req.params.spotId;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const spot = await Spot.findByPk(spotId);

    if (!spot) return res.status(404).json({ message: "Spot couldn't be found" });

    // Errors Array
    const errors = {};

    // Validate the request body
    if (!address) errors.address = 'Street address is required';
    if (!city) errors.city = 'City is required';
    if (!state) errors.state = 'State is required';
    if (!country) errors.country = 'Country is required';
    if (typeof lat !== 'number' || isNaN(lat)) errors.lat = 'Latitude is not valid';
    if (typeof lng !== 'number' || isNaN(lng)) errors.lng = 'Longitude is not valid';
    if (!name || name.length > 50) errors.name = 'Name must be less than 50 characters';
    if (!description) errors.description = 'Description is required';
    if (!price) errors.price = 'Price per day is required';

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
      message: 'Bad Request',
      errors: errors
  });
}
    // Check if the spot belongs to the current user
    if (spot.ownerId !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    let updateObj = {};

    // Update the spot
    if(spot.address) spot.address = address;
    if(spot.city) spot.city = city;
    if(spot.state) spot.state = state;
    if(spot.country) spot.country = country;
    if(spot.lat) spot.lat = lat;
    if(spot.lng) spot.lng = lng;
    if(spot.name) spot.name = name;
    if(spot.description) spot.description = description;
    if(spot.price) spot.price = price;

    // update the object
    spot.set(updateObj)
    // save the edits
    await spot.save();

    res.status(200).json(spot);
  });

  // Delete a Spot
  router.delete('/:spotId', requireAuth, async (req, res) => {
    const spotId = req.params.spotId;

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    if (spot.ownerId !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await spot.destroy();

    res.status(200).json({ message: "Successfully deleted" });
  });

  // Create a Review for a spot based on the spot's id
  router.post('/:spotId/reviews', requireAuth, async (req, res) => {
  const spotId = req.params.spotId;
  const { review, stars } = req.body;

  // Find the spot by id and check if it exists
  const spot = await Spot.findByPk(spotId);

     // Errors Array
     const errors = {};

     // Validate the request body
     if (!review) errors.review = 'Review text is required';
     if (stars > 5 || stars < 1) errors.stars = 'Stars must be an integer from 1 to 5';


     if (Object.keys(errors).length > 0) {
       return res.status(400).json({
       message: 'Bad Request',
       errors: errors
   });
  }

  // If it does not exist
  if (!spot) {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }

  // Check if the user already has a review for this spot
  const existingReview = await Review.findOne({
    where: { spotId, userId: req.user.id },
  });

  if (existingReview) {
    return res.status(403).json({ message: "User already has a review for this spot" });
  }

  // Create the review
  const newReview = await Review.create({
    spotId,
    userId: req.user.id,
    review,
    stars,
  });

  res.status(201).json({
    id: newReview.id,
    userId: newReview.userId, // delete this line
    spotId: newReview.spotId, // delete this line
    review: newReview.review, // delete this line
    stars: newReview.stars // delete this line
})
});

// Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res) => {
  const spotId = req.params.spotId;

  const spot = await Spot.findByPk(spotId);

  // If the spot does not exist
  if (!spot) {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }

  // Find all the reviews for the spot
  const reviews = await Review.findAll({
    where: { spotId },
    include: [
      { model: User, attributes: ['id', 'firstName', 'lastName'] },
      { model: ReviewImage, attributes: ['id', 'url'] },
    ],
  });

  // Respond with the reviews
  res.status(200).json({ Reviews: reviews });
});

// Create a booking from a spot based on the spot's ID
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
  const spotId = req.params.spotId;
  const { startDate, endDate } = req.body;
  const userId = req.user.id;

  const parsedStartDate = moment(startDate, 'YYYY-MM-DD');
  const parsedEndDate = moment(endDate, 'YYYY-MM-DD');

  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }

  const existingBooking = await Booking.findOne({
    where: {
      spotId,
      startDate: { [Op.lte]: parsedEndDate },
      endDate: { [Op.gte]: parsedStartDate }
    }
  });

  if (existingBooking) {
    return res.status(403).json({ message: "Sorry, this spot is already booked for the specified dates", errors: { startDate: "Start date conflicts with an existing booking", endDate: "End date conflicts with an existing booking" } });
  }

  const booking = await Booking.create({
    spotId,
    userId,
    startDate,
    endDate
  });

  // Return the formatted booking
  res.status(200).json({
    id: booking.id,
    spotId: booking.spotId,
    userId: booking.userId,
    startDate: booking.startDate.toISOString().split('T')[0],
    endDate: booking.endDate.toISOString().split('T')[0],
    createdAt: booking.createdAt.toISOString().split('T')[0],
    updatedAt: booking.updatedAt.toISOString().split('T')[0]
  });
});

//Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
  const spotId = req.params.spotId;
  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }

  if (spot.ownerId === req.user.id) {
    // If the owner
    const bookings = await Booking.findAll({
      where: { spotId },
      include: [
        { model: User, attributes: ['id', 'firstName', 'lastName'] }
      ],
    });

    return res.status(200).json({ Bookings: bookings });
  } else {
    // If not the owner
    const bookings = await Booking.findAll({
      where: { spotId },
      attributes: ['spotId', 'startDate', 'endDate']
    });

    return res.status(200).json({ Bookings: bookings });
  }
});


module.exports = router;
