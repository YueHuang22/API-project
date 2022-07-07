const express = require('express')
const { Op, } = require('sequelize');
const { setTokenCookie, requireAuth, } = require('../../utils/auth');
const { Event, Group, Venue, Image, Member, User, Sequelize, } = require('../../db/models');
const router = express.Router();
const { check, } = require('express-validator');
const { handleValidationErrors, } = require('../../utils/validation');
const { route, } = require('./session');

router.get(
    '/',
    async (_req, res) => {
        const events = await Event.findAll({
            include: [{
                model: Group,
                as: 'Group',
                attributes: ['id', 'name', 'city', 'state'],
            }, {
                model: Venue,
                as: 'Venue',
                attributes: ['id', 'city', 'state'],
                required: false,
            }],
        })
        res.json({ Events: events, })
    }
)

router.get(
    '/:eventId',
    async (req, res) => {
        const { eventId, } = req.params
        const event = await Event.findByPk(
            eventId,
            {
                include: [{
                    model: Group,
                    as: 'Group',
                    attributes: ['id', 'name', 'city', 'state'],
                }, {
                    model: Venue,
                    as: 'Venue',
                    attributes: ['id', 'city', 'state'],
                    required: false,
                }],
            }
        )
        const images = await event.getImages()
        event.dataValues.images = images.map(image => image.url)
        res.json(event)
    }
)

router.delete(
    '/:eventId',
    requireAuth,
    async (req, res) => {
        const { eventId, } = req.params
        const { id: userId, } = req.user
        const event = await Event.findByPk(eventId)
        if (!event) {
            const err = new Error('Not Found');
            err.message = 'Event couldn\'t be found';
            err.status = 404;
            throw err;
        }
        const group = await event.getGroup()
        const membership = await group.getMemberships({ where: { userId, }, })
        if (userId == group.organizerId || membership[0].status == 'co-host') {
            await event.destroy()
            res.json({ message: 'Successfully deleted', })
        } else {
            const error = new Error('Forbidden')
            error.message = 'Forbidden'
            error.status = 403
            throw error
        }
    }
)

router.put(
    '/:eventId',
    requireAuth,
    async (req, res) => {
        const { eventId, } = req.params
        const userId = req.user.id
        const { venueId, name, type, capacity,
            price, description, startDate, endDate, } = req.body
        const event = await Event.findByPk(eventId)
        if (!event) {
            const err = new Error('Not Found');
            err.message = 'Event couldn\'t be found';
            err.status = 404;
            throw err;
        }
        const group = await event.getGroup()
        const membership = await group.getMemberships({ where: { userId, }, })
        if (userId == group.organizerId || membership[0].status == 'co-host') {
            event.name = name || event.name
            event.venueId = venueId || event.venueId
            event.type = type || event.type
            event.capacity = capacity || event.capacity
            event.price = price || event.price
            event.description = description || event.description
            event.startDate = startDate || event.startDate
            event.endDate = endDate || event.endDate
            await event.save()
            res.json(event)
        } else {
            const error = new Error('Forbidden')
            error.message = 'Forbidden'
            error.status = 403
            throw error
        }
    }

)


module.exports = router