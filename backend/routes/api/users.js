const express = require('express')
const { setTokenCookie, requireAuth, } = require('../../utils/auth');
const { User, } = require('../../db/models');
const router = express.Router();
const { check, } = require('express-validator');
const { handleValidationErrors, } = require('../../utils/validation');

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true, })
        .isEmail()
        .withMessage('Invalid email'),
    check('firstName')
        .exists({ checkFalsy: true, })
        .withMessage('First Name is required'),
    check('lastName')
        .exists({ checkFalsy: true, })
        .withMessage('Last Name is required'),
    check('password')
        .exists({ checkFalsy: true, })
        .isLength({ min: 6, })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res) => {
        const { email, password, username, firstName, lastName, } = req.body;
        const user = await User.signup({ email, username, password, firstName, lastName, });

        await setTokenCookie(res, user);

        return res.json({
            user,
        });
    }
);

module.exports = router;