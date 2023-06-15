const express = require('express');
const { Spot, User, Booking, SpotImage, Review, ReviewImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { urlencoded, request } = require('express');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

// Delete a Review Image
router.delete('/:imageId', requireAuth, async (req, res) => {

    const imageReview = await ReviewImage.findOne({
      where: { id: req.params.imageId },
      include: [{ model: Review }]
    });

    if (!imageReview) {
      return res.status(404).json({ message: "Review Image couldn't be found" });
    }

    if (imageReview.Review.userId !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await imageReview.destroy();
    return res.status(200).json({ message: 'Successfully deleted' });
  });

module.exports = router;
