const express = require('express')
const { Op, } = require('sequelize');
const { setTokenCookie, requireAuth, } = require('../../utils/auth');
const { Attendees, Event, Group, Member, User, Sequelize, } = require('../../db/models');
const router = express.Router();
const { check, } = require('express-validator');
const { handleValidationErrors, } = require('../../utils/validation');
const { route, } = require('./session');

router.delete(
    '/:memberId',
    requireAuth,
    async (req, res) => {
        const { memberId, } = req.params
        const { id: userId, } = req.user
    }
)

module.exports = router