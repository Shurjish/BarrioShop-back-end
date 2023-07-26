const express = require('express');

const {
    register,
    login,
    checkSession,
    appPost,
    getUsers,
    getIdAndEmails,
    getUserById,
    deleteUser,
    modUser,
} = require('../controllers/user.controller');

const { isAuth } = require('../../middlewares/auth');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/checkSession', [isAuth], checkSession);
router.get('/post', appPost);
router.get('/users', getUsers);
router.get('/idEmail', getIdAndEmails);
router.get('/:userId', getUserById);
router.delete('/:id', deleteUser);
router.put('/:id', modUser);

module.exports = router;
