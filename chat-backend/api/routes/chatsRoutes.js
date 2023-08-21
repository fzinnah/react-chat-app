const router = require('express').Router()
const { Chat } = require('../../db/index')
const {Op} = require('sequelize')

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

// fetch a specific chat by chat ID
router.get('/:chatId', async (req, res, next)=>{
    try {
        const chat = await Chat.findByPk(req.params.chatId)
        if (!chat) {
            res.status(404).send("Chat not found")
        }
        res.status(200).send(chat)
    } catch (error) {
        console.log('backend issue fetching chat')
        next(error)
    }
})

// delete a chat
router.delete('/:chatId', async (req, res, next)=>{
    try {
        const chatToDelete = await Chat.destroy({
            where: {
                id: req.params.chatId
            }
        })
        if (chatToDelete > 0) {
            res.status(204).send()
        } else {
            res.status(404).send('Chat not found')
        }
    } catch (error) {
        console.log('Backend issue deleting chat')
        next(error)
    }
})

module.exports = router