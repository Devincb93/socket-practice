const express = require('express')
const app = express()
const http = require("http")
const { Server } = require("socket.io")
const cors = require("cors")
const { Socket } = require('dgram')

app.use(cors())
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    }
})

io.on("connection", (socket)=> {
    console.log(`User Connected: ${socket.id}`)

    socket.on("send_message", (data)=> {
        socket.broadcast.emit("receive_message", data)
    })
})

server.listen(5051, ()=> {
    console.log("server is running")
})