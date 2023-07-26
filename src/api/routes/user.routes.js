const express = require('express');

const {
    register,
    login,
    checkSession,
    appPost,
    getUserById,
} = require('../controllers/user.controller');

const { isAuth } = require('../../middlewares/auth');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/checkSession', [isAuth], checkSession);
router.get('/post', appPost);
router.get('/user/:userId', getUserById);

module.exports = router;
