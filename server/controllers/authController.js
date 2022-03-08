const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { configs } = require("../config");
const db = require("../models");

const User = db.users;

const login = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.body.username,
            },
        });
        console.log(user);
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        const passwordIsValid = bcrypt.compareSync(
            req.body.password.toString(),
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                message: "Invalid Credentials!",
            });
        }

        const token = jwt.sign({ id: user.id }, configs.secret, {
            expiresIn: 900, // 24 hours
        });

        let authorities = [];
        const roles = user.roles.split(",");
        for (let i = 0; i < roles.length; i++) {
            authorities.push(roles[i]);
        }
        req.session.token = token;

        return res.status(200).send({
            username: user.username,
            email: user.email,
            roles: authorities,
        });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

const signOut = async (req, res) => {
    try {
        req.session = null;
        return res.status(200).send({
            message: "You've been signed out!",
        });
    } catch (err) {
        this.next(err);
    }
};

module.exports = { login, signOut };
