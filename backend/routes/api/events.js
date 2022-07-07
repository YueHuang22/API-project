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
                }, {
                    model: Image,
                    as: 'Images',
                    attributes: ['url'],
                    required: false,
                }],
            }
        )
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
module.exports = router