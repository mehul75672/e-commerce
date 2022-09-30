'use strict'
const Users = require('../model/User');
var validator = require("email-validator");
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const adduser = async (req, res) => {
    try {

        let { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Email or password missing."
            })
        }
        const emailValid = await validator.validate(email);
        if (!emailValid) {

            return res.status(400).send({
                message: "Email is not valid."
            })
        }
        let passwordcheck = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
        if (!password.match(passwordcheck)) {
            return res.status(400).json({
                message: "7 to 15 characters which contain at least one numeric digit and a special character"
            })
        }
        const email_find = await Users.findOne({ email: req.body.email });
        if (email_find) {
            return res.status(400).json({
                message: "Email is allrediy exit."
            })
        }
        const hash = bcrypt.hashSync(req.body.password, 10);
        let add = new Users({
            firstname: req.body.firstname,
            lastnamae: req.body.lastnamae,
            fullname: `${req.body.firstname + ' ' + req.body.lastnamae}`,
            email: req.body.email,
            password: hash
        });

        const ad = await add.save();
        return res.status(201).json("user registr succass fully");

    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const loginuser = async (req, res) => {
    try {
        let { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email or password missing."
            })
        }
        const emailValid = await validator.validate(email);
        if (!emailValid) {

            return res.status(400).json({
                message: "Email is not valid."

            })
        }
        let passwordcheck = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
        if (!password.match(passwordcheck)) {
            return res.status(400).json({
                message: "7 to 15 characters which contain at least one numeric digit and a special character"
            })
        }
        const login = await Users.findOne({ email: email })
        if (login) {

            const valid_password = bcrypt.compareSync(password, login.password);

            if (valid_password) {
                const token = await jwt.sign({ id: login.id }, process.env.SECRETKEY);
                res.status(200).json({ status: true, result: token });
            }
            else {
                res.status(400).json({ error: "Invalid Email And Password" });
            }
        }
        else {
            res.status(400).json({ error: "User does not exist" });
        }
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const all_user = async (req, res) => {
    try {
        let all = await Users.find();
        res.status(200).json({ status: true, result: all });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
module.exports = { adduser, loginuser, all_user }