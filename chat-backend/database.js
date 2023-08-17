const {Pool} = require('pg')

const pool = new Pool({
    user: 'forhad',
    host: 'localhost',
    database: 'react-chat-app',
    password: "",
    port: 5432,
})

pool.connect((err)=>{
    if (err) throw new Error(err)
    console.log("Connected to the database")
})