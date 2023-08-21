const router = require('express').Router()
const { Message } = require('../../db/index')

// create a new message 
router.post('/', async (req, res, next) =>{
    try {
        const {content, sender_id, chat_id} = req.body
        const message = await Message.create({
            content,
            sender_id,
            chat_id
        })
        res.status(201).json(message)
    } catch (error) {
        console.log('backend issue posting a message')
        next(error)
    }
})

//  retreieve all messages for a specific chat room 
router.get('/:chatId', async (req, res, next)=>{
    try {
        const messages = await Message.findAll({
            where: {
                chat_id: +req.params.chatId
            }
        })
        res.status(200).json(messages)
    } catch (error) {
        console.log('backend issue fetching all messages for chatroom')
        next(error)
    }
})

// updates a message
router.put('/:messageId', async (req, res, next)=>{
    try {
        const message = await Message.findByPk(+req.params.messageId)
        if (!message) {
            return res.status(404).send('Message not found')
        }
        await message.update(req.body)
        res.json(message)
    } catch (error) {
        console.log('backend issue updating message')
        next(error)
    }
})

// deletes a message 
router.delete('/:messageId', async(req, res, next)=>{
    try {
        const result = await Message.destroy({
            where: {
                id: req.params.messageId
            }
        })
        if (result === 0) {
            return res.status(404).send('Message not found')
        }
        res.status(204).send()
    } catch (error) {
        console.log('backend issue deleting a message')
        next(error)
    }
})

// get all unread messages for a specific user 
router.get('/unread/:userId', async (req, res, next)=>{
    try {
        const unreadMessages = await Message.findAll({
            where: {
                sender_id: req.params.userId,
                read_status: 'Unread'
            }
        })
        res.json(unreadMessages)
    } catch (error) {
        console.log('backend issue fetching all unread messages for user')
        next(error)
    }
})

module.exports = router