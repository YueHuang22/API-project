const express = require('express')
const { Op, } = require('sequelize');
const { setTokenCookie, requireAuth, } = require('../../utils/auth');
const { Venue, venue, Group, Member, User, Sequelize, } = require('../../db/models');
const router = express.Router();
const { check, } = require('express-validator');
const { handleValidationErrors, } = require('../../utils/validation');
const { route, } = require('./session');

router.put(
    '/:venueId',
    requireAuth,
    async (req, res) => {
        const { venueId, } = req.params
        const { id: userId, } = req.user
        const { address, city, state, lat, lng, } = req.body
        const venue = await Venue.findByPk(venueId)
        if (!venue) {
            const err = new Error('Not Found');
            err.message = 'Venue couldn\'t be found';
            err.status = 404;
            throw err;
        }
        const group = await venue.getGroup()
        const membership = await group.getMemberships({ where: { userId, }, })
        if (userId == group.organizerId || membership[0].status == 'co-host') {
            venue.address = address || venue.address
            venue.city = city || venue.city
            venue.state = state || venue.state
            venue.lat = lat || venue.lat
            venue.lng = lng || venue.lng
            await venue.save()
            res.json(venue)
        } else {
            const error = new Error('Forbidden')
            error.message = 'Forbidden'
            error.status = 403
            throw error
        }
    }
)

module.exports = router