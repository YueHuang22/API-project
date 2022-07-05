const express = require('express')
const { setTokenCookie, requireAuth, } = require('../../utils/auth');
const { Group, User, } = require('../../db/models');
const router = express.Router();
const { check, } = require('express-validator');
const { handleValidationErrors, } = require('../../utils/validation');

router.get(
    '/',
    async (req, res) => {
        const groups = await Group.findAll()
        res.json({ Groups: groups, })
    }
)

router.get(
    '/:groupId',
    async (req, res) => {
        const { groupId, } = req.params
        const group = await Group.findByPk(groupId, { include: 'Organizer', })
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

module.exports = router;