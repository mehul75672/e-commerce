'use strict'

const Users = require('../model/User');
var validator = require("email-validator");
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const otpGenerator = require('otp-generator');
const { default: mongoose } = require('mongoose');


const adduser = async (req, res) => {
    try {
        let { email, password, confirm_password, firstname, lastname } = req.body;
        if (!email || !password || !confirm_password || !firstname || !lastname) {
            return res.status(400).json({ status: false, message: "all fild requiard !" });
        }
        if (!(password === confirm_password)) {
            return res.status(400).json({ status: false, message: "password and confimpassword not match !" });
        }
        const emailValid = await validator.validate(email);
        if (!emailValid) {
            return res.status(400).send({ status: false, message: "Email is not valid !" })
        }
        let passwordcheck = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
        if (!password.match(passwordcheck)) {
            return res.status(400).json({ status: false, message: "7 to 15 characters which contain at least one numeric digit and a special character" })
        }
        const email_find = await Users.findOne({ email: req.body.email });
        if (email_find) {
            return res.status(400).json({ status: false, message: "Email is allrediy exist !" })
        }
        const hash = bcrypt.hashSync(password, 10);
        let add = new Users({
            firstname,
            lastname,
            fullname: `${firstname + ' ' + lastname}`,
            email,
            password: hash
        });
        const ad = await add.save();
        return res.status(201).json({ status: true, result: ad, message: "user register success fully" });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const loginuser = async (req, res) => {
    try {
        let { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ status: false, message: "Email or password missing." })
        }
        const emailValid = await validator.validate(email);
        if (!emailValid) {
            return res.status(400).json({ status: false, message: "Email is not valid." })
        }
        const login = await Users.findOne({ email: email })
        if (!login) {
            return res.status(400).json({ status: false, message: "User does not exist " });
        }
        const valid_password = bcrypt.compareSync(password, login.password);
        if (!valid_password) {
            return res.status(400).json({ status: false, message: "Invalid Email And Password" });
        }
        const token = await jwt.sign({ id: login.id }, process.env.SECRETKEY, { expiresIn: "8h" });
        return res.status(200).json({ status: true, token, result: login });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const all_user = async (req, res) => {
    try {
        let all = await Users.find();
        res.status(200).json({ status: true, result: all });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const changePassword = async (req, res) => {
    let id = req.send.id;
    try {
        const get = await Users.findById(id);
        if (get) {
            let { old_password, password, confirm_password } = req.body
            const valid_password = bcrypt.compare(old_password, get.password);
            if (!valid_password) { return res.status(400).json({ status: false, error: "not match old password" }); }
            let passwordcheck = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
            if (!password.match(passwordcheck)) { return res.status(400).json({ status: false, message: "7 to 15 characters which contain at least one numeric digit and a special character" }) }
            if (!(password === confirm_password)) { return res.status(400).json({ status: false, error: "not match Password and confirm_password" }); }
            const hash = bcrypt.hashSync(password, 10);
            get.password = hash;
            get.save();
            return res.status(200).json({ status: true, result: get });
        } else {
            return res.status(400).json({ status: false, error: "User does not login !" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
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
        return res.status(500).json({ status: false, error: error.message });
    }
}

const forgotpasstoken = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await Users.findOne({ email });
        if (!user) { return res.status(400).send({ status: false, message: 'Sorry Email does not Exist!' }); }
        const token = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
        await Users.findByIdAndUpdate(user.id, { token: token, tokenExpires: Date.now() + 3600000 });
        const transporter = await nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.ADMIN_EMAIL,
                pass: process.env.ADMIN_PASSWORD,
            }
        });
        const mailOptions = {
            from: process.env.ADMIN_EMAIL,
            to: email,
            subject: 'forgot your Password',
            text: `Please click on the following link, and forgot password http://localhost:3000/forgot/${token}`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) throw error;
            return res.send({ status: true, data: info, message: 'Email Send SuccessFully' });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false, message: err });
    }
};

const forgotpassword = async (req, res) => {
    try {
        const confirm_password = req.body.confirm_password
        const password = req.body.password
        const token = req.params.token
        const user = await Users.findOne({ token });
        let passwordcheck = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
        if (!password.match(passwordcheck)) {
            return res.status(400).json({ status: false, message: "7 to 15 characters which contain at least one numeric digit and a special character" })
        }
        if (!(password === confirm_password)) { return res.status(400).json({ status: false, error: "not match Password and confirm_password" }); }
        if (user.tokenExpires <= Date.now()) {
            return res.status(400).json({ status: false, message: "token is expire" });
        }
        const hash = bcrypt.hashSync(password, 10);
        await user.update({ password: hash })
        return res.status(200).json({ status: true, message: "password forgot success fully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error });
    }
}

const follow = async (req, res) => {
    let id = req.params.id
    let find = await Users.findById(id);
    let user = req.send;
    var a = await find.followers.includes(user.id);
    if (a) {
        await Users.findByIdAndUpdate(id, { $pull: { followers: user.id } });
        await Users.findByIdAndUpdate(user.id, { $pull: { following: id } });
        return res.status(200).json({ messages: "unfollow" });
    }
    else {
        await Users.findByIdAndUpdate(id, { $push: { followers: user.id } });
        await Users.findByIdAndUpdate(user.id, { $push: { following: id } });
        return res.status(200).json({ messages: "follow" });
    }
}

const totalfollowers = async (req, res) => {
    try {
        const a = await Users.aggregate([
            {
                $match: { _id: mongoose.Types.ObjectId(req.send.id) }
            },
            {
                $addFields: {
                    following: { $size: "$following" },
                    followers: { $size: "$followers" }
                }
            }
        ]);
        return res.status(200).json({status:true,result:a});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.messages })
    }
}


module.exports = { adduser, loginuser, all_user, changePassword, pagination, forgotpasstoken, forgotpassword, follow, totalfollowers }






