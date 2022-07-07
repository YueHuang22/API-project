const express = require('express');
const { setTokenCookie, restoreUser, requireAuth, } = require('../../utils/auth');
const { User, } = require('../../db/models');
const { check, } = require('express-validator');
const { handleValidationErrors, } = require('../../utils/validation');
const validateLogin = [
    check('email')
        .exists({ checkFalsy: true, })
        .notEmpty()
        .withMessage('Email is required.'),
    check('password')
        .exists({ checkFalsy: true, })
        .withMessage('Password is required'),
    handleValidationErrors
];

const router = express.Router();

// Log in
router.post(
    '/',
    validateLogin,
    async (req, res, next) => {
        const { email, password, } = req.body;

        const user = await User.login({ email, password, });

        if (!user) {
            const err = new Error('Login failed');
            err.status = 401;
            err.message = 'Invalid credentials';
            return next(err);
        }

        await setTokenCookie(res, user);

        return res.json({
            user,
        });
    }
);

// Log out
router.delete(
    '/',
    (_req, res) => {
        res.clearCookie('token');
        return res.json({ message: 'success', });
    }
);

// Restore session user
router.get(
    '/',
    requireAuth,
    (req, res) => {
        const { user, } = req;
        return res.json({
            user: user.toSafeObject(),
        });
    }
);

module.exports = router;
