const express = require('express');
const { Spot, User, Booking, SpotImage, Review, ReviewImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();


// Delete a Spot Image
router.delete('/:imageId', requireAuth, async (req, res) => {

    const spotImage = await Spot.findOne({
        where: { id: req.params.imageId },
        include: { model: SpotImage }
    });

    if (!spotImage) {
        return res.status(404).json({ message: "Spot Image couldn't be found" });
    }

    if (spotImage.ownerId !== req.user.id) {
        return res.status(403).json({ message: "Forbidden" });
    }

        await spotImage.destroy();

        return res.status(200).json({ message: 'Successfully deleted' });

});


module.exports = router;
