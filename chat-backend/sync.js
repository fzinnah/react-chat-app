const {db, User, Message, Chat} = require('./db/index')
const users = require('../mock-data/userSeed')
const chats = require('../mock-data/chatSeed')
const messages = require('../mock-data/messagesSeed')

const syncDatabase = async () => {
    try {
        await db.sync({force:true})
        console.log('syncing the db')

        console.log('seeding users...')
        const seedUsers = await User.bulkCreate(users)
        console.log('seeded users! yay!')
        
        
        console.log('seeding chats...')
        const seedChats = await Chat.bulkCreate(chats)
        console.log('seeded chats! yay!')

        console.log('seeding messages...')
        const seedMessages = await Message.bulkCreate(messages)
        console.log('seeded messages! yay!')


        db.close()
    } catch (error) {
        console.log('error syncing the db',error)
        db.close()
    }
}

syncDatabase()
