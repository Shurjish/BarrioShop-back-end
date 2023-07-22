const User = require('../api/models/user.model');

const validatePassword = (pass) => {
    const regex = /^[A-Za-z0-9\s]+$/g;
    return regex.test(pass);
};

const validateEmail = (email) => {
    const regex =
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    return regex.test(email);
};

const usedEmail = async (email) => {
    const users = await User.find({ email: email });
    return users.length;
};

module.exports = { validatePassword, validateEmail, usedEmail };
