const { User, validateUser, validateLogin } = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {

    login: async (req, res) => {
        const { error } = validateLogin(req.body)
        if (error) return res.status(400).send({ status: false, message: error.details[0].message })
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.send({ status: false, message: 're-enter your data' });
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) return res.send({ status: false, message: 're-enter your data' })
        jwt.sign({ user }, 'secretkey', (err, token) => {
            res.json({ status: true, id: user.id, token: token, role: user.role });
        });
    },

    register: async (req, res) => {
        const { error } = validateUser(req.body)
        if (error) return res.send({ status: false, message: error.details[0].message })
        const emailExist = await User.findOne({ email: req.body.email });
        if (emailExist) return res.send({ status: false, message: 'Email user before' });
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const user = new User({
            nom: req.body.nom,
            prenom: req.body.prenom,
            email: req.body.email,
            password: hashPassword,
        })
        user.save().then(() => res.json('added')).catch(err => res.status(400).json('Error: ' + err));
    },
    //** RECUPERATION D'UN UTILISATEUR A PARTIR DE SON ID**/
    getbyid: (req, res) => {
        User.findOne({ _id: req.params.id }, (err, list) => {
            if (err) {
                res.json({ state: 'no', msg: 'error' + err })
            } else {
                res.json(list)
            }
        })
    },
    afficheUser: async (req, res) => {
        User.find()
            .then(users => res.json(users))
            .catch(err => res.status(400).json('Error: ' + err));
    },
    UpdateUser: function (req, res) {
        User.updateOne(
            {
                _id: req.params.id
            }, {
            $set: req.body
        },
            {
                nom: req.body.nom,
                prenom: req.body.prenom,
                email: req.body.email,
                password: req.body.password,




            },
            function (err, list) {
                if (err) {
                    res.json({ state: 'no', msg: 'error' + err })
                } else {
                    res.json({ state: 'ok', msg: 'done' })
                }
            }
        )
    },


    //** SUPPRESSION D'UN UTILISATEUR A PARTIR DE SON ID**/
    suprimerUser: (req, res) => {
        User.findOneAndRemove({ _id: req.params.id }, (err, list) => {
            if (err) {
                res.json({ state: 'no', msg: 'error' + err })
            } else {
                res.json("Delete suceeded")
            }
        })
    },


}