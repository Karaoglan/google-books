const jwt = require("jsonwebtoken");
const { configs } = require("../config");
const db = require("../models");

const User = db.users;

const verifyToken = (req, res, next) => {
    const token = req.session.token;

    if (!token) {
        return res.status(403).send({
            message: "No token provided!",
        });
    }

    jwt.verify(token, configs.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!",
            });
        }
        req.userId = decoded.id;
        next();
    });
};

const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId);
        const roles = user.roles.split(",");

        for (let i = 0; i < roles.length; i++) {
            if (roles[i] === "admin") {
                return next();
            }
        }

        return res.status(403).send({
            message: "Require Admin Role!",
        });
    } catch (error) {
        return res.status(500).send({
            message: "Unable to validate Admin role!",
        });
    }
};

const isUser = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId);
        const roles = user.roles.split(",");

        for (let i = 0; i < roles.length; i++) {
            if (roles[i] === "user") {
                return next();
            }
        }

        return res.status(403).send({
            message: "Require User Role!",
        });
    } catch (error) {
        return res.status(500).send({
            message: "Unable to validate User role!",
        });
    }
};

const authJwt = {
    verifyToken,
    isAdmin,
    isUser,
};

module.exports = authJwt;
