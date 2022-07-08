const express = require('express')
const { Op, } = require('sequelize');
const { setTokenCookie, requireAuth, } = require('../../utils/auth');
const { Image, Event, Group, Member, User, Sequelize, } = require('../../db/models');
const router = express.Router();
const { check, } = require('express-validator');
const { handleValidationErrors, } = require('../../utils/validation');
const { route, } = require('./session');

router.delete(
    '/:imageId',
    requireAuth,
    async (req, res) => {
        const { imageId, } = req.params
        const { id: userId, } = req.user

        const image = await Image.findByPk(imageId)
        if (!image) {
            const err = new Error('Not Found');
            err.message = 'Image couldn\'t be found';
            err.status = 404;
            throw err;
        }
        if (image.ownerId != userId) {
            const err = new Error('Forbidden');
            err.message = 'Forbidden';
            err.status = 403;
            throw err;
        }
        await image.destroy()
        res.json({
            message: 'Successfully deleted',
            statusCode: 200,
        })
    })
module.exports = router