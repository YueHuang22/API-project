const express = require('express')
const { Op, } = require('sequelize');
const { setTokenCookie, requireAuth, } = require('../../utils/auth');
const { Group, Member, Event, Venue, Image, User, Sequelize, } = require('../../db/models');
const router = express.Router();
const { check, } = require('express-validator');
const { handleValidationErrors, } = require('../../utils/validation');

router.get(
    '/',
    async (_req, res) => {
        const groups = await Group.findAll()
        for (const group of groups) {
            group.dataValues.numMembers = await group.countMemberships();
        }
        res.json({ Groups: groups, })
    }
)

const validateCreateGroup = [
    check('name')
        .exists({ checkFalsy: true, })
        .withMessage('Name is required')
        .bail()
        .isLength({ max: 60, })
        .withMessage('Name must be 60 characters or less'),
    check('about')
        .exists({ checkFalsy: true, })
        .withMessage('About is required')
        .bail()
        .isLength({ min: 50, })
        .withMessage('About must be 50 characters or more'),
    check('type')
        .exists({ checkFalsy: true, })
        .withMessage('Type is required')
        .bail()
        .isIn(['Online', 'In Person'])
        .withMessage('Type must be Online or In Person'),
    check('private')
        .exists({ checkFalsy: true, })

        .isBoolean()
        .withMessage('Private must be a boolean'),
    check('city')
        .exists({ checkFalsy: true, })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true, })
        .withMessage('State is required'),
    handleValidationErrors
];
router.post(
    '/',
    [requireAuth, validateCreateGroup,],
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
        const groups = await Group.findAll({
            include: {
                model: Member,
                as: 'memberships',
                where: { userId: req.user.id, },
                attributes: [],
                required: true,
            },
        })
        const organizedGroups = await req.user.getOrganizedGroups()
        const allGroups = [...groups, ...organizedGroups]
        for (const group of allGroups) {
            group.dataValues.numMembers = await group.countMemberships();
        }
        res.json({ Groups: allGroups, })
    }
)

router.get(
    '/:groupId',
    async (req, res) => {
        const { groupId, } = req.params
        const group = await Group.findByPk(groupId, {
            include: 'organizer',
        })
        if (!group) {
            const err = new Error('Not Found');
            err.message = 'Group couldn\'t be found';
            err.status = 404;
            throw err;
        }
        const images = await group.getImages()
        group.dataValues.numMembers = await group.countMembers();
        group.dataValues.images = images.map(image => image.url)
        res.json(group)
    }
)

const validateEditGroup = [
    check('name')
        .optional()
        .isLength({ max: 60, })
        .withMessage('Name must be 60 characters or less'),
    check('about')
        .optional()
        .isLength({ min: 50, })
        .withMessage('About must be 50 characters or more'),
    check('type')
        .optional()
        .isIn(['Online', 'In Person'])
        .withMessage('Type must be Online or In Person'),
    check('private')
        .optional()
        .isBoolean()
        .withMessage('Private must be a boolean'),
    handleValidationErrors
];
router.put(
    '/:groupId',
    [requireAuth, validateEditGroup],
    async (req, res) => {
        const { groupId, } = req.params
        const { name, about, type, private: isPrivate, city, state, } = req.body

        const group = await Group.findByPk(parseInt(groupId))
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
            { include: { model: Member, as: 'memberships', where: { userId, }, required: false, }, })
        if (!group) {
            const err = new Error('Not Found');
            err.message = 'Group couldn\'t be found';
            err.status = 404;
            throw err;
        }
        if (group.memberships.length != 0) {
            const membership = group.memberships[0]
            const err = new Error('Conflict');
            if (membership.status == 'pending') {
                err.message = 'Membership has already been requested';
            } else {
                err.message = 'User is already a member of the group';
            }
            err.status = 400;
            throw err;
        } else {
            const membership = await Member.create({ groupId, userId, status: 'pending', })
            const { userId: memberId, status, } = membership
            res.json({ groupId, memberId, status, })
        }
    }
)

router.put(
    '/:groupId/members/:memberId',
    requireAuth,
    async (req, res) => {
        const { groupId, memberId, } = req.params
        const userId = req.user.id
        const { status, } = req.body
        const group = await Group.findByPk(groupId)
        if (!group) {
            const err = new Error('Not Found');
            err.message = 'Group couldn\'t be found';
            err.status = 404;
            throw err;
        }
        const member = await Member.findOne({ where: { userId: memberId, groupId: groupId, }, })
        if (!member) {
            const err = new Error('Not Found');
            err.message = 'Membership does not exist for this User';
            err.status = 404;
            throw err;
        }
        const membership = await group.getMemberships({ where: { userId, }, })
        if (userId == group.organizerId || membership[0].status == 'co-host') {
            if (status == 'pending') {
                const error = new Error('Error')
                error.message = 'Cannot change a membership status to pending'
                error.status = 400
                throw error
            }

            member.status = status
            await member.save
            res.json(member)
        } else {
            const error = new Error('Forbidden')
            error.message = 'Forbidden'
            error.status = 403
            throw error
        }

    }

)

router.delete(
    '/:groupId/members/:memberId',
    requireAuth,
    async (req, res) => {
        const { groupId, memberId, } = req.params
        const { id: userId, } = req.user
        const group = await Group.findByPk(groupId)
        if (!group) {
            const err = new Error('Not Found');
            err.message = 'Group couldn\'t be found';
            err.status = 404;
            throw err;
        }
        const member = await Member.findOne({ where: { userId: memberId, groupId: groupId, }, })
        if (!member) {
            const err = new Error('Not Found');
            err.message = 'Membership does not exist for this User';
            err.status = 404;
            throw err;
        }
        if (group.organizerId == userId || member.userId == userId) {
            await member.destroy()
            res.json({
                message: 'Successfully deleted membership from group',
            })
        } else {
            const error = new Error('Forbidden')
            error.message = 'Forbidden'
            error.status = 403
            throw error
        }

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

const validateCreateEvent = [
    check('venueId')
        .custom(async value => {
            if (!await Venue.findByPk(value)) throw new Error()
        })
        .withMessage('Venue does not exist'),
    check('name')
        .exists({ checkFalsy: true, })
        .withMessage('Name is required')
        .bail()
        .isLength({ min: 5, })
        .withMessage('Name must be 60 characters or less'),
    check('type')
        .exists({ checkFalsy: true, })
        .withMessage('Type is required')
        .bail()
        .isIn(['Online', 'In Person'])
        .withMessage('Type must be Online or In Person'),
    check('capacity')
        .optional()
        .isInt({ mix: 0, }),
    check('capacity')
        .optional()
        .isDecimal({ mix: 0, }),
    check('description')
        .exists({ checkFalsy: true, })
        .withMessage('Description is required'),
    check('startDate')
        .exists({ checkFalsy: true, })
        .withMessage('Type is required')
        .bail()
        .custom(value => {
            const startDate = new Date(value)
            const now = new Date()
            if (startDate < now) throw new Error()
        })
        .withMessage('Start date must be in the future'),
    check('endDate')
        .optional()
        .custom((value, { req, }) => {
            const startDate = new Date(req.body.startDate)
            const endDate = new Date(value)
            if (endDate < startDate) throw new Error()
            else return true
        })
        .withMessage('End date is less than start date'),
    handleValidationErrors
];
router.post(
    '/:groupId/events',
    [requireAuth, validateCreateEvent],
    async (req, res) => {
        const { groupId, } = req.params
        const userId = req.user.id
        const { venueId, name, type, capacity, price, description, startDate, endDate, } = req.body
        const group = await Group.findByPk(groupId)
        if (!group) {
            const err = new Error('Not Found');
            err.message = 'Group couldn\'t be found';
            err.status = 404;
            throw err;
        }
        const membership = await group.getMemberships({ where: { userId, }, })
        if (userId == group.organizerId || membership[0].status == 'co-host') {
            const event = await Event.create({
                venueId, groupId, name, type, capacity,
                price, description, startDate, endDate,
            })
            res.json(event)
        } else {
            const error = new Error('Forbidden')
            error.message = 'Forbidden'
            error.status = 403
            throw error
        }
    }

)

const validateCreateVenue = [
    check('address')
        .exists({ checkFalsy: true, })
        .withMessage('Address is required'),
    check('city')
        .exists({ checkFalsy: true, })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true, })
        .withMessage('State is required'),
    check('lat')
        .exists({ checkFalsy: true, })
        .withMessage('Latitude is required')
        .isNumeric()
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true, })
        .withMessage('Longtude is required')
        .isNumeric()
        .withMessage('Longitude is not valid'),
    handleValidationErrors
];
router.post(
    '/:groupId/venues',
    [requireAuth, validateCreateVenue],
    async (req, res) => {
        const { groupId, } = req.params
        const { id: userId, } = req.user
        const { address, city, state, lat, lng, } = req.body
        const group = await Group.findByPk(groupId)
        if (!group) {
            const err = new Error('Not Found');
            err.message = 'Group couldn\'t be found';
            err.status = 404;
            throw err;
        }
        const membership = await group.getMemberships({ where: { userId, }, })
        if (userId == group.organizerId || membership[0].status == 'co-host') {
            const venue = await Venue.create({ address, city, state, lat, lng, groupId, })
            res.json(venue)
        } else {
            const error = new Error('Forbidden')
            error.message = 'Forbidden'
            error.status = 403
            throw error
        }

    }
)

router.post(
    '/:groupId/images',
    requireAuth,
    async (req, res) => {
        const { groupId, } = req.params
        const { id: userId, } = req.user
        const { url, } = req.body
        const group = await Group.findByPk(groupId)
        if (!group) {
            const err = new Error('Not Found');
            err.message = 'Group couldn\'t be found';
            err.status = 404;
            throw err;
        }
        if (group.organizerId == userId) {
            const image = await Image.create({ url, groupId, ownerId: userId, })
            res.json({ id: image.id, imageableId: groupId, imageableType: 'Group', url, })
        } else {
            const error = new Error('Forbidden')
            error.message = 'Forbidden'
            error.status = 403
            throw error
        }
    }
)

module.exports = router