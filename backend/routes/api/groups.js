const express = require('express')
const { Op, } = require('sequelize');
const { setTokenCookie, requireAuth, } = require('../../utils/auth');
const { Group, Member, Event, Venue, User, Sequelize, } = require('../../db/models');
const router = express.Router();
const { check, } = require('express-validator');
const { handleValidationErrors, } = require('../../utils/validation');
const { route, } = require('./session');


router.get(
    '/',
    async (_req, res) => {
        const groups = await Group.findAll()
        res.json({ Groups: groups, })
    }
)

router.post(
    '/',
    requireAuth,
    async (req, res) => {
        const { name, about, type, private: isPrivate, city, state, } = req.body
        const organizerId = req.user.id

        const group = await Group.create({ name, organizerId, about, type, private: isPrivate, city, state, })
        res.status(201)
        return res.json(group)
    })

router.get(
    '/my',
    requireAuth,
    async (req, res) => {
        const groups = await req.user.getGroups()
        const organizedGroups = await req.user.getOrganizedGroups()
        res.json({ Groups: [...groups, ...organizedGroups], })
    }
)



router.get(
    '/:groupId',
    async (req, res) => {
        const { groupId, } = req.params
        const group = await Group.findByPk(groupId)
        if (!group) {
            const err = new Error('Not Found');
            err.message = 'Group couldn\'t be found';
            err.status = 404;
            throw err;
        }
        res.json(group)
    }
)

router.put(
    '/:groupId',
    requireAuth,
    async (req, res) => {
        const groupId = req.params
        const { name, about, type, private: isPrivate, city, state, } = req.body

        const group = await Group.findByPk(groupId)
        if (!group) {
            const err = new Error('Not Found');
            err.message = 'Group couldn\'t be found';
            err.status = 404;
            throw err;
        }
        if (group.organizerId != req.user.id) {
            const err = new Error('Forbidden');
            err.message = 'Forbidden';
            err.status = 403;
            throw err;
        }

        group.name = name || group.name
        group.about = about || group.about
        group.type = type || group.type
        group.private = isPrivate || group.private
        group.city = city || group.city
        group.state = state || group.state

        await group.save()
        return res.json(group)
    })

router.delete(
    '/:groupId',
    requireAuth,
    async (req, res) => {
        const { groupId, } = req.params
        const group = await Group.findByPk(groupId)
        if (!group) {
            const err = new Error('Not Found');
            err.message = 'Group couldn\'t be found';
            err.status = 404;
            throw err;
        }
        if (group.organizerId != req.user.id) {
            const err = new Error('Forbidden');
            err.message = 'Forbidden';
            err.status = 403;
            throw err;
        }
        await group.destroy()
        return res.json({ message: 'Successfully deleted', statusCode: 200, })
    })

router.get(
    '/:groupId/members',
    async (req, res) => {
        const { groupId, } = req.params
        const group = await Group.findByPk(groupId, { include: 'members', })
        const members = group.members.map(
            ({ id, email, firstName, lastName, Member, }) => (
                {
                    id, email, firstName, lastName,
                    Membership: { status: Member.status, },
                }
            ))
        res.json({ Members: members, })
    }
)

router.post(
    '/:groupId/members',
    requireAuth,
    async (req, res) => {
        const { params: { groupId, }, user: { id: userId, }, } = req
        const group = await Group.findByPk(
            groupId,
            { include: { model: Member, where: { userId, }, }, required: false, })
        if (!group) {
            const err = new Error('Not Found');
            err.message = 'Group couldn\'t be found';
            err.status = 404;
            throw err;
        }
        if (group.Members) {
            const membership = group.Members[0]
            const err = new Error('Conflict');
            if (membership.status == 'pending') {
                err.message = 'Membership has already been requested';
            } else {
                err.message = 'Membership has already been requested';
            }
            err.status = 400;
            throw err;
        }
    }
)

router.put(
    '/:groupId/members/:memberId',
    requireAuth,
    async (res, req) => {

    }

)

router.get(
    '/:groupId/events',
    async (req, res) => {
        const { groupId, } = req.params
        const group = await Group.findByPk(groupId)
        if (!group) {
            const err = new Error('Not Found');
            err.message = 'Group couldn\'t be found';
            err.status = 404;
            throw err;
        }
        const events = await Event.findAll({
            where: { groupId, },
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

module.exports = router