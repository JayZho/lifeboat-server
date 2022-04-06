const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");

app.use(cors({
    origin: "*"
})
);

const server = http.createServer(app);

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', socket => {
    io.emit('message', "server's greetings!");
});

server.listen(3001, () => {
    console.log("Server running")
})