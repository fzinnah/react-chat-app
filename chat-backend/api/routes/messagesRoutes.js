const router = require('express').Router()
const {Message} = require('../../db/index')

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
                chat_id: req.params.chatId
            }
        })
        res.status(200).json(messages)
    } catch (error) {
        console.log('backend issue fetching all messages for chatroom')
        next(error)
    }
})

