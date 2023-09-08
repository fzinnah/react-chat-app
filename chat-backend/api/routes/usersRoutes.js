const router = require('express').Router()
const { User } = require('../../db/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// register a new user
router.post('/register', async (req, res, next) => {
    try {
        const {username, password, email} = req.body

        const existingUser = await User.findOne({where: {username}})
        if (existingUser) {
            return res.status(400).json({message: "username already exists"})
        }
        
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({username, password: hashedPassword, email})
        const token = jwt.sign({userId: newUser.id}, 'my-secret-key', {
            expiresIn: '1h',
        })
        res.status(201).json({message: "User registered successfully"})
    } catch (error) {
        console.log('backend issue creating new user')
        next(error)
    }
})

// login 
router.post('/login', async (req, res, next)=>{
    try {
        const {username, password} = req.body

        const user = await User.findOne({where: {username}})
        if (!user) {
            return res.status(401).json({message: "Authentication failed"})
        }
        // compare prev password
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({message: "Authentication failed"})
        }

        const token = jwt.sign({userId: user.id}, 'my-secret-key', {
            expiresIn: '1h'
        })
        res.status(200).json({message: "Authentication success!"})
    } catch (error) {
        console.error('Backend issue with login', error)
        next(error)
    }
})

// get all users
router.get('/', async (req, res, next) => { 
    try {
        const users = await User.findAll()
        res.status(200).send(users)
    } catch (error) {
        console.log('Backend issue fetching all users')
        next(error)
    }
})
// get a single user by ID
router.get('/:userId', async (req, res, next) => {
    try {
        const user = await User.findByPk(+req.params.userId)
        if (!user) return res.status(404).send("User not found")
        res.status(200).send(user)
    } catch (error) {
        console.log('Backend issue fetching user')
        next(error)
    }
})

// update a user by ID
router.put('/:userId', async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.userId)
        if (!user) {
            res.status(404).send('User not found')
        }
        await user.update(req.body)
        res.status(200).send(user)
    } catch (error) {
        console.log('Backend issue updating user')
        next(error)
    }
})

// delete a user by ID
router.delete('/:userId', async (req, res, next) => {
    try {
        const rowsDeleted = await User.destroy({
            where: {
                id: req.params.userId
            }
        })
        if (rowsDeleted > 0 ) {
            res.status(204).send()
        } else {
            res.status(404).send('User not found')
        }
    } catch (error) {
        console.log('backend issue deleting user')
        next(error)       
    }
})

module.exports = router