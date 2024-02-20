const { WebSocketServer } = require("ws")
const dotenv = require("dotenv")

dotenv.config()

const wss = new WebSocketServer({ port: process.env.PORT || 8080 })

wss.on("connection", (ws) => {
    ws.on("error", console.error)

    ws.send("MENSAGEM ENVIADA PELO SERVIDOR")
    // Send the current state of all other users to this user when they connect
    ws.on("message",  (data) => {
        wss.clients.forEach((client) => client.send(data.toString()))
    })

    console.log("client connected")
})