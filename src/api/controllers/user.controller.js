const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const {
    validatePassword,
    validateEmail,
    usedEmail,
} = require('../../utils/validators');

const { generateSign } = require('../../utils/jwt');
const nodeMailer = require('nodemailer');

const login = async (req, res) => {
    try {
        const userInfo = await User.findOne({ email: req.body.email });
        if (!userInfo) {
            return res.status(400).json({ message: 'El email es invalido' });
        }
        if (!bcrypt.compareSync(req.body.password, userInfo.password)) {
            return res
                .status(400)
                .json({ message: 'La contraseña es incorrecta' });
        }
        const token = generateSign(userInfo.id, userInfo.email);
        console.log(token);
        return res
            .status(200)
            .json({ token, userInfo, message: 'ha iniciado sesion' });
    } catch (error) {
        res.status(400).json(error);
    }
};
const register = async (req, res) => {
    try {
        console.log(req.body);

        const newUser = new User(req.body);

        if (!validatePassword(newUser.password)) {
            return res.status(400).json({ message: 'contraseña incorrecta' });
        }
        if (!validateEmail(newUser.email)) {
            return res.status(400).json({ message: 'email es incorrecto' });
        }
        if ((await usedEmail(newUser.email)) > 0) {
            return res
                .status(400)
                .json({ message: 'el email ya esta registrado' });
        }
        newUser.password = bcrypt.hashSync(newUser.password, 10);
        const createdUser = await newUser.save();
        return res.status(200).json(createdUser);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const checkSession = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        return res.status(500).json(error);
    }
};
const appPost = async (req, res) => {
    let transporter = nodeMailer.createTransport({
        service: 'yahoo',
        auth: {
            user: 'finalProyectUp@yahoo.com',
            pass: 'UpgradeHub',
        },
    });
    let userMail = req.query.email;

    let mailOptions = {
        from: 'finalProyectUp@yahoo.com',
        to: userMail,
        subject: 'Recuperacion de contraseña',
        text: 'Para recuperar la contraseña',
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send('Error al enviar el mail');
        } else {
            console.log('Correo enviado: ' + info.response);
            res.send('Mail enviado correctamente');
        }
    });
};

const getUsers = async (req, res) => {
    try {
      const allUsers = await User.find();
      return res.status(200).json(allUsers);
    } catch (error) {
      return res.status(500).json(error);
    }
  };


const getUserById = async (req, res) => {
    try {
        const userId = req.params.userId;
        const userProfile = await User.findById(userId);
        if (!userProfile) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        return res.status(200).json(userProfile);
    } catch (error) {
        return res.status(500).json(error);
    }
};

module.exports = { login, register, checkSession, appPost, getUsers, getUserById };
