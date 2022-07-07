const express = require('express')
const { Op, } = require('sequelize');
const { setTokenCookie, requireAuth, } = require('../../utils/auth');
const { Group, Member, User, Sequelize, } = require('../../db/models');
const router = express.Router();
const { check, } = require('express-validator');
const { handleValidationErrors, } = require('../../utils/validation');
const group = require('../../db/models/group');
const { route, } = require('./session');


router.get(
    '/',
    async (_req, res) => {
        const groups = await Group.findAll()
        res.json({ Groups: groups, })
    }
)

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

module.exports = router