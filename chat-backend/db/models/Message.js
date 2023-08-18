const {DataTypes, Sequelize} = require('sequelize')
const db = require('../database')
const User = require('./User')
const Chat = require('./Chat')

const Message = db.define('Message', {
    chat_id: {
        type: DataTypes.INTEGER, 
        references: {
            model: Chat, 
            key: "id",
        },
    },
    sender_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    }, 
    read_status: {
        type: DataTypes.ENUM('Read', 'Unread'),
        defaultValue: 'Unread',
    },
}, {
    timestamps: true,
})

module.exports = Message