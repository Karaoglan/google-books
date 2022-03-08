const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { configs } = require('../config');

verifyToken = (req, res, next) => {
  let token = req.session.token;

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    });
  }

  jwt.verify(token, configs.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!',
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = async (req, res, next) => {
  try {
    //const user = await User.findByPk(req.userId);
    const roles = ['user']; //await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === 'admin') {
        return next();
      }
    }

    return res.status(403).send({
      message: 'Require Admin Role!',
    });
  } catch (error) {
    return res.status(500).send({
      message: 'Unable to validate User role!',
    });
  }
};

isUser = async (req, res, next) => {
  try {
    //const user = await User.findByPk(req.userId);
    const roles = ['user']; //await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === 'user') {
        return next();
      }
    }

    return res.status(403).send({
      message: 'Require User Role!',
    });
  } catch (error) {
    return res.status(500).send({
      message: 'Unable to validate User role!',
    });
  }
};

signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!",
    });
  } catch (err) {
    this.next(err);
  }
};

const authJwt = {
  signout,
  verifyToken,
  isAdmin,
  isUser,
};
module.exports = authJwt;
