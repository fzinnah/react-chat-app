const express = require('express')
const path = require('path')
const cors = require('cors')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT 

const app = express()

const http = require('http').createServer(app)
const io = require('socket.io')(http, {
    cors: {
      origin: "http://localhost:5173",  // your frontend server's origin
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  })

app.use(cors())

const volleyball = require('volleyball')


// Serving static files from the Vite's default build directory 'dist'
const frontendBuildPath = path.join(__dirname, "..", 'chat-frontend', 'dist')
app.use(express.static(frontendBuildPath))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

// app.use('/api', require('./api'))

// Send the built index.html file for all other routes
app.use('*', (req, res, next)=>{
    const htmlFile = path.join(frontendBuildPath, 'index.html')
    res.status(200).sendFile(htmlFile)
})

app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error');
});

//Socket.io setup
io.on('connection', (socket)=>{
    console.log('a user connected');

    socket.on('new message', (data)=> {
        // here you would ideally save the message to your database first.
        // after that, broadcast it to other users.
        console.log("recieved on the server", data)
        io.emit('new message', data)
    })

    socket.on('disconnect', ()=>{
        console.log('user disconnected')
    })
})

http.listen(PORT, ()=> {
    console.log(`Server started on port http://localhost/${PORT}`)
})
