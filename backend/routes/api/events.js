const express = require('express')
const { Op, } = require('sequelize');
const { setTokenCookie, requireAuth, } = require('../../utils/auth');
const { Event, Group, Venue, Member, User, Sequelize, } = require('../../db/models');
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
        res.json(event)
    }
)

module.exports = router