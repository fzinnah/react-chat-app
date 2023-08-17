const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const PORT = process.env.PORT 

app.get('/', (req, res)=>{
    res.send("Chat App Server Running")
})

app.listen(PORT, ()=> {
    console.log(`Server started on port ${PORT}`)
})