const { DataTypes } = require('sequelize');
const db = require('../database');
const User = require('./User');

const Chat = db.define(
  'Chat',
  {
    user1_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    user2_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    last_message_timestamp: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Chat;
