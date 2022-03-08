const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { configs } = require('../config');

const login = async (req, res) => {
  try {
    const user = {
      id: 1,
      name: 'mk',
      username: 'bmkk',
      email: 'mk@mk.com',
      ROLES: ['admin'],
      password: bcrypt.hashSync(req.body.password, 8),
    }; /*await User.findOne({
          where: {
              username: req.body.username,
          },
      });*/
    console.log(user);
    if (!user) {
      return res.status(404).send({ message: 'User Not found.' });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: 'Invalid Password!',
      });
    }

    const token = jwt.sign({ id: user.id }, configs.secret, {
      expiresIn: 86400, // 24 hours
    });

    let authorities = [];
    const roles = [{ name: 'admin' }]; //await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      authorities.push('ROLE_' + roles[i].name.toUpperCase());
    }

    req.session.token = token;
    console.log(token);

    return res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: authorities,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = { login };
