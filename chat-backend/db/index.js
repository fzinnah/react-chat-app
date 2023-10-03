const User = require('./models/User');
const Chat = require('./models/Chat');
const Message = require('./models/Message');
const db = require('./database');

User.hasMany(Message, { foreignKey: 'sender_id' });
Message.belongsTo(User, { foreignKey: 'sender_id' });

Chat.belongsToMany(User, { through: 'UserChats' });
User.belongsToMany(Chat, { through: 'UserChats' });

Chat.hasMany(Message, { foreignKey: 'chat_id' });
Message.belongsTo(Chat, { foreignKey: 'chat_id' });

module.exports = {
  db,
  User,
  Chat,
  Message,
};
