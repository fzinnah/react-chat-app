const Sequelize = require('sequelize');
const db = require('../database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const SECRET = process.env.JWT;
const SALT_ROUNDS = 10;

const User = db.define(
  'User',
  {
    userName: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true,
        notNull: true,
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

// encrypts user password
User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
});

// throws error if password is < 8 chars
User.beforeValidate((user) => {
  const MIN_PASSWORD_LENGTH = 8;

  const pw = user.password;
  if (pw.length < MIN_PASSWORD_LENGTH) {
    const err = new Error();
    err.message = `Minimum password requirement not met (${MIN_PASSWORD_LENGTH} characters)`;
    throw err;
  }
});

User.authenticate = async ({ email, password }) => {
  try {
    const user = await User.findOne({
      where: { email },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      return jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        SECRET
      );
    }
    const error = new Error('bad credentials');
    error.status = 401;
    throw error;
  } catch (err) {
    console.log('authentication error:', err);
  }
};

User.verifyByToken = async (token) => {
  try {
    const { id } = jwt.verify(token, SECRET);
    const user = await User.findByPk(id, {
      attributes: {
        exclude: ['password'],
      },
    });
    if (user) {
      return user;
    } else {
      const error = new Error('bad credentials / bad token');
      error.status = 401;
      throw error;
    }
  } catch (err) {
    console.log('verification error:', err);
  }
};

module.exports = User;
