const express = require('express');
const { Spot, User, Booking, SpotImage, Review, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize')

const router = express.Router();

// #1 Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id;

    const bookings = await Booking.findAll({
        where: { userId },
        include: [
            {
                model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
                include: [
                    {
                        model: SpotImage, attributes: ['url'],
                    },
                ],
            },
        ],
    });

    const formattedBookings = bookings.map(booking => {
        const jsonBooking = booking.toJSON();

        const spot = jsonBooking.Spot;

        if (spot.SpotImages.length > 0) {
            spot.previewImage = spot.SpotImages[0].url;
        }

        delete spot.SpotImages;

        // puts it in the right order
        return {
            id: jsonBooking.id,
            spotId: jsonBooking.spotId,
            Spot: spot,
            userId: jsonBooking.userId,
            startDate: jsonBooking.startDate,
            endDate: jsonBooking.endDate,
            createdAt: jsonBooking.createdAt,
            updatedAt: jsonBooking.updatedAt,
        };
    });

    res.status(200).json({ Bookings: formattedBookings });
});

// #2 Edit a Booking
router.put('/:bookingId', requireAuth, async (req, res) => {
    const userId = req.user.id;
    const { startDate, endDate } = req.body;

    const booking = await Booking.findByPk(req.params.bookingId);

    if (!booking) {
        return res.status(404).json({ message: "Booking couldn't be found" });
    }

    if (booking.userId !== req.user.id) {
        return res.status(403).json({ message: "Forbidden" });
    }

    const currentDate = new Date().toJSON().slice(0, 10);

    if (startDate < currentDate) {
        return res.status(403).json({ message: "Past bookings can't be modified" })
    }

    const conflictingBooking = await Booking.findOne({
        where: {
            spotId: req.params.bookingId,
            startDate: { [Op.lte]: endDate },
            endDate: { [Op.gte]: startDate },
        },
    });

    if (conflictingBooking) {
        return res.status(403).json({
            message: "Sorry, this spot is already booked for the specified dates",
            errors: {
                startDate: "Start date conflicts with an existing booking",
                endDate: "End date conflicts with an existing booking",
            },
        });
    }

    let updateObj = {};

    if (booking.startDate) booking.startDate = startDate;
    if (booking.endDate) booking.startDate = endDate;

    booking.set(updateObj)
    await booking.save();

    res.status(200).json(booking);
});

// Delete a booking
router.delete('/:bookingId', requireAuth, async (req, res) => {

    const bookingId = req.params.bookingId;

    const booking = await Booking.findByPk(bookingId);

    if (booking.userId !== req.user.id) {
        return res.status(403).json({ message: "Forbidden" });
    }

    if (!booking) {
        return res.status(404).json({ message: "Booking couldn't be found" });
    }

    const currentDate = new Date().toJSON().slice(0, 10)
    const bookingStartDate = new Date(booking.startDate);

    if (bookingStartDate <= currentDate) {
        return res.status(403).json({ message: "Bookings that have been started can't be deleted" });
    }

    await booking.destroy();

    res.status(200).json({ message: "Successfully deleted" });
});

module.exports = router;
