'use strict'
const Users = require('../model/User');
var validator = require("email-validator");
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const adduser = async (req, res) => {
    try {

        let { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email or password missing." })
        }
        const emailValid = await validator.validate(email);
        if (!emailValid) {
            return res.status(400).send({ message: "Email is not valid." })
        }
        let passwordcheck = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
        if (!password.match(passwordcheck)) {
            return res.status(400).json({ message: "7 to 15 characters which contain at least one numeric digit and a special character" })
        }
        const email_find = await Users.findOne({ email: req.body.email });
        if (email_find) {
            return res.status(400).json({ message: "Email is allrediy exit." })
        }
        const hash = bcrypt.hashSync(password, 10);
        let add = new Users({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            fullname: `${req.body.firstname + ' ' + req.body.lastname}`,
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
            return res.status(400).json({ message: "Email or password missing." })
        }
        const emailValid = await validator.validate(email);
        if (!emailValid) {
            return res.status(400).json({ message: "Email is not valid." })
        }
        let passwordcheck = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
        if (!password.match(passwordcheck)) {
            return res.status(400).json({ message: "7 to 15 characters which contain at least one numeric digit and a special character" })
        }
        const login = await Users.findOne({ email: email })
        if (!login) {
            res.status(400).json({ error: "User does not exist" });
        }
        const valid_password = bcrypt.compareSync(password, login.password);
        if (!valid_password) {
            return res.status(400).json({ error: "Invalid Email And Password" });
        }
        const token = await jwt.sign({ id: login.id }, process.env.SECRETKEY,{expiresIn:"1m"});
        return res.status(200).json({ status: true, result: token });
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

const changePassword = async (req, res) => {
    let id = req.send.id;
    try {
        const get = await Users.findById(id);
        if (get) {
            let old_password = req.body.old_password
            let password = req.body.password
            let confirm_password = req.body.confirm_password
            const valid_password = bcrypt.compare(old_password, get.password);
            if (!valid_password) { return res.status(400).json({ error: "not match old password" }); }
            let passwordcheck = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
            if (!password.match(passwordcheck)) { return res.status(400).json({ message: "7 to 15 characters which contain at least one numeric digit and a special character" }) }
            if (!(password === confirm_password)) { return res.status(400).json({ error: "not match Password and confirm_password" }); }
            const hash = bcrypt.hashSync(password, 10);
            get.password = hash;
            get.save();
            return res.status(200).json({ status: true, result: get });
        } else {
            return res.status(400).json({ error: "User does not login" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const pagination = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skipIndex = (page - 1) * limit;
    try {
        let results = await Users.find()
            .limit(limit)
            .skip(skipIndex);
        return res.status(200).json({
            status: true,
            results: results
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports = { adduser, loginuser, all_user, changePassword, pagination }