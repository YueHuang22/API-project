const express = require('express')
const { Op, } = require('sequelize');
const { setTokenCookie, requireAuth, } = require('../../utils/auth');
const { Image, Event, Group, Venue, Attendee, Member, User, Sequelize, } = require('../../db/models');
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

router.get(
    '/:eventId/attendees',
    async (req, res) => {
        const { eventId, } = req.params
        const userId = req.user?.id
        const event = await Event.findByPk(eventId)
        if (!event) {
            const err = new Error('Not Found');
            err.message = 'Event couldn\'t be found';
            err.status = 404;
            throw err;
        }
        if (userId) {
            const group = await event.getGroup()
            const members = await group.getMemberships({ where: { userId, }, })
            if (group.organizerId == userId ||
                (members.length && members[0].status == 'co-host')) {
                const attendees = await event.getAttendees({ include: 'user', })
                res.json({
                    Attendees: attendees.map(
                        ({ status, user: { id, firstName, lastName, }, }) =>
                            ({ id, firstName, lastName, Attendance: { status, }, })),
                })
                return
            }
        }
        const attendees = await event.getAttendees({
            where: { status: { [Op.ne]: 'pending', }, },
            include: 'user',
        })
        res.json({
            Attendees: attendees.map(
                ({ status, user: { id, firstName, lastName, }, }) =>
                    ({ id, firstName, lastName, Attendance: { status, }, })),
        })


    }
)

router.post(
    '/:eventId/attendees',
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
        const members = await group.getMemberships({ where: { userId, status: { [Op.ne]: 'pending', }, }, })
        if (members.length == 0) {
            const error = new Error('Forbidden')
            error.message = 'Forbidden'
            error.status = 403
            throw error
        }
        const attendees = await event.getAttendees({ where: { userId, }, })
        if (attendees.length != 0) {
            const error = new Error('Error')
            if (attendees[0].status == 'pending') {
                error.message = 'Attendance has already been requested'
            } else {
                error.message = 'User is already an attendee of the event'
            }
            error.status = 400
            throw error
        } else {
            const attendee = await Attendee.create({ eventId, userId, status: 'pending', })
            res.json(attendee)
        }
    }
)

router.put(
    '/:eventId/attendees/:attendeeId',
    requireAuth,
    async (req, res) => {
        const { eventId, attendeeId, } = req.params
        const { id: userId, } = req.user
        const { status, } = req.body

        const event = await Event.findByPk(eventId)
        if (!event) {
            const err = new Error('Not Found');
            err.message = 'Event couldn\'t be found';
            err.status = 404;
            throw err;
        }
        const group = await event.getGroup()
        const members = await group.getMemberships({ where: { userId, status: 'co-host', }, })
        if (group.organizerId != userId && members.length == 0) {
            const error = new Error('Forbidden')
            error.message = 'Forbidden'
            error.status = 403
            throw error
        }
        const attendee = await Attendee.findOne({ where: { userId: attendeeId, eventId, }, })
        if (!attendee) {
            const error = new Error('Not found')
            error.message = 'Attendance between the user and the event does not exist'
            error.status = 404
            throw error
        }
        attendee.status = status
        await attendee.save()
        res.json(attendee)
    }
)

router.delete(
    '/:eventId/attendees/:attendeeId',
    requireAuth,
    async (req, res) => {
        const { eventId, attendeeId, } = req.params
        const { id: userId, } = req.user

        const event = await Event.findByPk(eventId)
        if (!event) {
            const err = new Error('Not Found');
            err.message = 'Event couldn\'t be found';
            err.status = 404;
            throw err;
        }
        const group = await event.getGroup()
        const members = await group.getMemberships({ where: { userId, status: 'co-host', }, })
        const attendee = await Attendee.findOne({ where: { userId: attendeeId, eventId, }, })
        if (!attendee) {
            const error = new Error('Not found')
            error.message = 'Attendance does not exist for this User'
            error.status = 404
            throw error
        }
        if (group.organizerId != userId && members.length == 0 && attendee.userId != userId) {
            const error = new Error('Forbidden')
            error.message = 'Only the User or organizer may delete an Attendance'
            error.status = 403
            throw error
        }
        await attendee.destroy()
        res.json({
            message: 'Successfully deleted attendance from event',
        })
    }
)

router.post(
    '/:eventId/images',
    requireAuth,
    async (req, res) => {
        const { eventId, } = req.params
        const { id: userId, } = req.user
        const { url, } = req.body
        const event = await Event.findByPk(eventId)
        if (!event) {
            const err = new Error('Not Found');
            err.message = 'Event couldn\'t be found';
            err.status = 404;
            throw err;
        }
        const attendee = event.getAttendees({ where: { userId, status: 'member', }, })
        if (attendee.length == 0) {
            const error = new Error('Forbidden')
            error.message = 'Forbidden'
            error.status = 403
            throw error
        } else {
            const image = await Image.create({ url, eventId, ownerId: userId, })
            res.json({ id: image.id, imageableId: eventId, imageableType: 'Event', url, })
        }
    }
)

module.exports = router