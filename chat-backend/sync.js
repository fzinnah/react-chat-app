const {db, User, Message, Chat} = require('./db/index')

const syncDatabase = async () => {
    try {
        await db.sync({force:true})
        console.log('syncing the db')
        db.close()
    } catch (error) {
        console.log('error syncing the db',error)
        db.close()
    }
}

syncDatabase()
