const router = require('express').Router()
const { Chat } = require('../../db/index')

// Create a new chat
router.post('/', async (req, res, next)=>{
    try {
        const {user1_id, user2_id} = req.body 
        const newChat = await Chat.create({ user1_id, user2_id })
        res.status(201).send(newChat)
    } catch (error) {
        console.log('backend issue creating a new chat')
        next(error)
    }
})

// fetch all chats for specific user
router.get('/user/:userId', async (req, res, next)=>{
    try {
        const userId = req.params.userId
        const chats = await Chat.findAll({
            where: {
                [Op.or]: [{ user1_id: userId}, {user2_id: userId}]
            }
        })
        res.status(200).send(chats)
    } catch (error) {
        console.log('backend issue fetching user"s chats')
        next(error)
    }
})