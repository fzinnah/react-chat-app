const router = require('express').Router()

const cors = require('cors')

router.use(cors())

// routes to specific pages
router.use('/messages', require('./routes/messagesRoutes'))
router.use('/users', require('./routes/usersRoutes'))
router.use('/chats', require('./routes/chatsRoutes'))

// 404 default error handler
router.use((req, res, next)=>{
    const err = new Error('API ROUTE NOT FOUND')
    err.status = 404
    next(err)
})

module.exports = router