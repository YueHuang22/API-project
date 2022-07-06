const express = require('express')
const { Op, } = require('sequelize');
const { setTokenCookie, requireAuth, } = require('../../utils/auth');
const { Group, Member, User, Sequelize, } = require('../../db/models');
const router = express.Router();
const { check, } = require('express-validator');
const { handleValidationErrors, } = require('../../utils/validation');


router.get(
    '/',
    async (req, res) => {
        const groups = await Group.findAll({
            attributes: {
                include: [[Sequelize.fn('COUNT', Sequelize.col('members.id')), 'numMembers']],
            },
            include: [{
                model: Member, attributes: [],
                where: { 'status': { [Op.ne]: 'pending', }, },
            }],
        }
        )
        res.json({ Groups: groups, })
    }
)

router.get(
    '/:groupId',
    async (req, res) => {
        const { groupId, } = req.params
        const group = await Group.findByPk(groupId, {
            attributes: {
                include: [[Sequelize.fn('COUNT', Sequelize.col('members.id')), 'numMembers']],
            },
            include: [
                {
                    model: Member, attributes: [],
                    where: { 'status': { [Op.ne]: 'pending', }, },
                },
                'organizer'],
        })
        if (group) {
            res.json(group)
        } else {
            res.status(404).json({
                message: "Group couldn't be found",
                statusCode: 404,
            })
        }
    }
)

// router.post('/', async (req, res) => {
//     const { name, email, } = req.body
//     const group = await Group.create({ name, email, })
//     return res.json(group)
// })

// router.put('/:groupId',
//     async (req, res) => {
//         const groupId = req.params
//         const { name, email, } = req.body
//         const group = await Group.findOne({
//             where: { groupId, },
//         })
//         group.name=name
//         group.email = email
//         await group.save()
//         return res.json(group)
//     })

// router.delete('/:groupId',
//     async (req, res) => {
//         const groupId = req.params
//         const group = await Group.findOne({
//             where: { groupId, },
//         })
//         await group.destroy()
//         return res.json({ message: 'group deleted', })
//     })

module.exports = router