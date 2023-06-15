const express = require('express');
const { Spot, User, Booking, SpotImage, Review, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

// #1 Add an Image to a Review based on the Review's Id
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const reviewId = req.params.reviewId;
    const { url } = req.body;

    const review = await Review.findByPk(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review couldn't be found" });
    }

    if (review.userId !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized access to review" });
    }

    const maxImagesPerReview = 10;

    const imageCount = await ReviewImage.count({ where: { reviewId } });
    if (imageCount >= maxImagesPerReview) {
      return res.status(403).json({ message: "Maximum number of images for this review was reached" });
    }

    const newImage = await ReviewImage.create({ reviewId, url });

    return res.status(200).json({
      id: newImage.id,
      url: newImage.url
    });
  });

  // #2 Get All reviews by a current User
  router.get('/current', requireAuth, async (req, res) => {

    const userId = req.user.id;

    const reviews = await Review.findAll({
        where: { userId },
        include: [
        {
            model: User, attributes: ['id', 'firstName', 'lastName']
        },
        {
            model: Spot,
            attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
            include: [
            {
                model: SpotImage, attributes: ['url'],
            }
            ]
        },
        {
            model: ReviewImage, attributes: ['id', 'url']
        }
        ]
    });
      // Process each review.
        const formattedReviews = reviews.map(review => {

        const jsonReview = review.toJSON();

      //Spot object associated with the review is extracted and assigned to the spot variable.
        const spot = jsonReview.Spot;

      // If the Spot has any associated SpotImages, the url of the first image is assigned to the spot.previewImage
        if (spot.SpotImages.length > 0) {
        spot.previewImage = spot.SpotImages[0].url;
        }

        delete spot.SpotImages;
        return jsonReview;
    });

    res.status(200).json({ Reviews: formattedReviews });
    });

  // #3 Edit a Review
    router.put('/:reviewId', requireAuth, async (req,res) => {
        const reviewId = req.params.reviewId;
        const { review, stars } = req.body;
        const userId = req.user.id;

        const existingReview = await Review.findByPk(reviewId);

    if (!existingReview) return res.status(404).json({ message: "Review couldn't be found" });

    // Errors object
     const errors = {};

    if (!review) errors.review = 'Review text is required';
    if (!Number.isInteger(stars) || stars < 1 || stars > 5) errors.stars = 'Stars must be an integer from 1 to 5';

    if (Object.keys(errors).length > 0) {
    return res.status(400).json({ message: 'Bad Request', errors: errors });
  }

  if (existingReview.userId !== userId) {
    return res.status(403).json({ message: "Forbidden" });
  }

  let updateObj = {};

  if (existingReview.review) existingReview.review = review;
  if (existingReview.stars) existingReview.stars = stars;
  existingReview.set(updateObj)
  await existingReview.save();

  res.status(200).json(existingReview);

  })

  // #4 Delete a Review
  router.delete('/:reviewId', requireAuth, async (req, res) => {
    const reviewId = req.params.reviewId;
    const userId = req.user.id;

    const existingReview = await Review.findByPk(reviewId);

    if (!existingReview) {
      return res.status(404).json({ message: "Review couldn't be found" });
    }

    if (existingReview.userId !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await existingReview.destroy();

    res.status(200).json({ message: "Successfully deleted" });
  });

  module.exports = router;
