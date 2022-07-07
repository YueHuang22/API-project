const express = require('express')
const { Op, } = require('sequelize');
const { setTokenCookie, requireAuth, } = require('../../utils/auth');
const { Event, Group, Member, User, Sequelize, } = require('../../db/models');
const router = express.Router();
const { check, } = require('express-validator');
const { handleValidationErrors, } = require('../../utils/validation');
const { route, } = require('./session');

router.get(
    '/',
    async (_req, res) => {
        const events = await Event.findAll()
        res.json({ Events: events, })
    }
)

module.exports = router